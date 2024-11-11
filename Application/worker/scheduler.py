import boto3
import os
import pandas as pd
import schedule
import time
import io
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, storage

load_dotenv()

cred = credentials.Certificate('./insigthsco-firebase-adminsdk-ozfd4-aea7bbba12.json') #você deve baixar o json do seu bucket no firebase, e coloca-lo no seu computador entre os parenteses referencie onde ele está
firebase_admin.initialize_app(cred, {
    'storageBucket': 'insigthsco.appspot.com' #Aqui você deve substituir 'insigthsco.appspot.com' com o link do seu bucket do firebase
})

BUCKET_NAME = os.getenv('BUCKET_NAME')
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_SESSION_TOKEN = os.getenv('AWS_SESSION_TOKEN')

s3 = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    aws_session_token=AWS_SESSION_TOKEN
)

def verificar_modificacoes():
    try:
        response = s3.list_objects_v2(Bucket=BUCKET_NAME)
        
        if 'Contents' in response:
            bucket = storage.bucket()
            for obj in response['Contents']:
                try:
                    file_key = obj['Key']
                    etag_s3 = obj['ETag'].strip('"')  
                    if file_key.endswith('.csv'):  
                        check_and_upload_to_firebase(file_key, etag_s3, bucket)
                except Exception as e:
                    print(f"Erro ao processar arquivo {file_key}: {e}")

    except Exception as e:
        print(f"Erro ao listar arquivos: {e}")

def check_and_upload_to_firebase(file_key, etag_s3, bucket):
    print(f"Processando arquivo: {file_key}")
    parquet_file_key = file_key.replace('.csv', '.parquet')
    blob = bucket.blob(parquet_file_key)
    
    if blob.exists():
        blob.reload()
        etag_firebase = blob.metadata.get('etag') if blob.metadata else None
        
        if etag_firebase == etag_s3:
            print(f"Nenhuma mudança detectada no arquivo {file_key}, pulando atualização.")
            return
    
    upload_file_to_firebase(file_key, etag_s3, blob, bucket)

def upload_file_to_firebase(file_key, etag_s3, blob, bucket):
    csv_content = s3.get_object(Bucket=BUCKET_NAME, Key=file_key)['Body'].read().decode('ISO-8859-1')
    df = pd.read_csv(io.StringIO(csv_content))
    buffer = io.BytesIO()
    df.to_parquet(buffer)
    buffer.seek(0)
    
    blob.metadata = {'etag': etag_s3}
    
    blob.upload_from_file(buffer, content_type='application/octet-stream')
    
    print(f"Arquivo {file_key.replace('.csv', '.parquet')} atualizado ou adicionado ao Firebase Storage com nova ETag.")
def run_minute():
    schedule.every().minute.do(verificar_modificacoes)

    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == "__main__":
    run_minute()
