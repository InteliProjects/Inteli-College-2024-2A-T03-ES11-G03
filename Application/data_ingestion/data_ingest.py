import os
import boto3
import pandas as pd
from io import StringIO, BytesIO

def process_and_upload_csv(file_path, bucket_name, s3_folder):
    # Carrega o arquivo CSV
    data = pd.read_csv(file_path)

    # Converte DataFrame para Parquet
    parquet_buffer = BytesIO()
    data.to_parquet(parquet_buffer, index=False)

    # Define o nome do arquivo no S3
    base_name = os.path.splitext(os.path.basename(file_path))[0] + '.parquet'
    s3_file_path = f"{s3_folder}/{base_name}"

    # Faz o upload para o S3
    s3_client = boto3.client('s3')
    s3_client.put_object(Bucket=bucket_name, Key=s3_file_path, Body=parquet_buffer.getvalue())
    print(f"Arquivo {base_name} carregado com sucesso para {s3_file_path}")

def upload_all_csvs(directory, bucket_name, s3_folder):
    # Lista todos os arquivos na pasta
    for filename in os.listdir(directory):
        if filename.endswith(".csv"):
            file_path = os.path.join(directory, filename)
            process_and_upload_csv(file_path, bucket_name, s3_folder)
        else:
            print(f"Arquivo ignorado: {filename}")

# Configurações
diretorio_csv = './csv_files'  # Caminho da pasta local
nome_bucket = 'upload-csv-mod11'  # Nome do seu bucket no S3
pasta_s3 = 'dados'  # Pasta no bucket onde os arquivos serão armazenados

upload_all_csvs(diretorio_csv, nome_bucket, pasta_s3)

