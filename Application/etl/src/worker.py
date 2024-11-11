from subprocess import call
import schedule
import time

# Função para executar o processo de ingestão e processamento
def run_process():
    print("Running process...", flush=True)
    # Chamar o script process_parquet.py usando spark-submit.sh
    call(["/bin/bash", "/app/spark-submit.sh"])

# Agendar para rodar o processo uma vez por dia
# schedule.every().day.at("00:00").do(run_process)
schedule.every(5).seconds.do(run_process)

while True:
    schedule.run_pending()
    time.sleep(1)
