import os
import io
import firebase_admin
from firebase_admin import credentials, storage
from pyspark.sql import SparkSession
from pyspark.sql.functions import monotonically_increasing_id, lit
from pyspark.sql.types import StringType, IntegerType, LongType, DoubleType, FloatType, BooleanType, TimestampType, DateType
from clickhouse_driver import Client
import tempfile

# Inicializar Firebase
cred = credentials.Certificate('/app/insigthsco-firebase-adminsdk-ozfd4-aea7bbba12.json')  
firebase_admin.initialize_app(cred, {
    'storageBucket': 'insigthsco.appspot.com'  
})

bucket = storage.bucket()

# Função para mapear tipos do Spark para ClickHouse
def map_spark_to_clickhouse(dtype):
    if isinstance(dtype, StringType):
        return "String"
    elif isinstance(dtype, IntegerType):
        return "Int32"
    elif isinstance(dtype, LongType):
        return "Int64"
    elif isinstance(dtype, DoubleType):
        return "Float64"
    elif isinstance(dtype, FloatType):
        return "Float32"
    elif isinstance(dtype, BooleanType):
        return "UInt8"
    elif isinstance(dtype, TimestampType):
        return "DateTime"
    elif isinstance(dtype, DateType):
        return "Date"
    else:
        return "String"

# Função para listar e baixar arquivos do Firebase
def list_and_download_parquet_files():
    blobs = bucket.list_blobs()
    parquet_files = [blob.name for blob in blobs if blob.name.endswith('.parquet')]
    
    if not parquet_files:
        print("Nenhum arquivo .parquet encontrado no Firebase Storage")
        return []

    buffers = []
    
    for file_name in parquet_files:
        print(f"Baixando arquivo {file_name} do Firebase Storage")
        blob = bucket.blob(file_name)
        buffer = io.BytesIO()
        blob.download_to_file(buffer)
        buffer.seek(0)
        buffers.append((file_name, buffer))

    return buffers

# Função para salvar arquivo parquet temporariamente
def save_parquet_to_tempfile(file_name, buffer):
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.parquet')
    temp_file.write(buffer.read())
    temp_file.close()
    return temp_file.name

# Criar uma sessão do Spark
spark = SparkSession.builder.appName("ParquetToClickHouse").getOrCreate()

# Conectar ao ClickHouse
client = Client(host='clickhouse')

# Baixar arquivos parquet do Firebase
parquet_buffers = list_and_download_parquet_files()

if parquet_buffers:
    for file_name, buffer in parquet_buffers:
        # Salva o arquivo Parquet em um arquivo temporário
        temp_file_path = save_parquet_to_tempfile(file_name, buffer)
        
        # Ler o arquivo .parquet
        df = spark.read.parquet(temp_file_path)
        
        # Nome da tabela será o nome do arquivo sem extensão
        table_name = os.path.splitext(file_name)[0]
        
        # Obter o esquema do dataframe
        schema = df.schema
        
        # Gerar a query de criação da tabela com base no esquema do dataframe
        create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} ("
        for field in schema.fields:
            clickhouse_type = map_spark_to_clickhouse(field.dataType)
            create_table_query += f"{field.name} {clickhouse_type}, "
        create_table_query = create_table_query.rstrip(", ") + ", id UInt64) ENGINE = MergeTree() ORDER BY id;"
        
        # Executar a query de criação da tabela
        client.execute(create_table_query)
        
        # Adicionar uma coluna de ID incremental
        df_with_id = df.withColumn("id", monotonically_increasing_id())
        
        # Coletar os dados do dataframe como uma lista de tuplas, substituindo None por uma string vazia
        data = [tuple("" if value is None else value for value in row) for row in df_with_id.collect()]
        
        # Gerar a query de inserção
        columns = ','.join(df_with_id.columns)
        insert_query = f"INSERT INTO {table_name} ({columns}) VALUES"
        
        # Inserir os dados na tabela no ClickHouse
        client.execute(insert_query, data)
        print(f"Data inserted into {table_name} successfully", flush=True)

# Verificar se o arquivo cod_vendedor.parquet existe no Firebase
cod_vendedor_blob = bucket.blob("cod_vendedor.parquet")

if cod_vendedor_blob.exists():
    print("Arquivo cod_vendedor.parquet encontrado. Processando...")

    buffer = io.BytesIO()
    cod_vendedor_blob.download_to_file(buffer)
    buffer.seek(0)

    # Ler o arquivo cod_vendedor.parquet no Spark
    cod_vendedor = spark.read.parquet(save_parquet_to_tempfile("cod_vendedor.parquet", buffer))

    # Tabela de vendedores
    vendedor_table = "vendedores"
    create_vendedor_query = f"""
    CREATE TABLE IF NOT EXISTS {vendedor_table} (
        id UInt64,
        cod_vendedor String,
        password String
    ) ENGINE = MergeTree()
    ORDER BY id;
    """
    client.execute(create_vendedor_query)

    # Processar o dataframe cod_vendedor
    cod_vendedor_with_id = cod_vendedor.withColumn("cod_vendedor", cod_vendedor["cod_vendedor"].cast(StringType())) \
                                       .withColumn("id", monotonically_increasing_id()) \
                                       .withColumn("password", lit("").cast(StringType()))

    # Coletar os dados do dataframe de vendedores
    data_vendedor = [tuple(row) for row in cod_vendedor_with_id.collect()]

    # Gerar a query de inserção para os vendedores
    columns_vendedor = ','.join(cod_vendedor_with_id.columns)
    insert_vendedor_query = f"INSERT INTO {vendedor_table} ({columns_vendedor}) VALUES"

    # Inserir os dados na tabela vendedores
    try:    
        client.execute(insert_vendedor_query, data_vendedor)    
        print("Data inserted into vendedores successfully", flush=True)
    except Exception as e:    
        print(f"Error inserting data into vendedores: {e}", flush=True)
else:
    print("Arquivo cod_vendedor.parquet não encontrado. Pulando processamento.")

# Parar a sessão do Spark
spark.stop()
