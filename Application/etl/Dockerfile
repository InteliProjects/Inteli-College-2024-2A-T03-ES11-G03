FROM bitnami/spark:latest

WORKDIR /app

USER root

# Copy application code
COPY src/ /app/src/
COPY insigthsco-firebase-adminsdk-ozfd4-aea7bbba12.json /app/insigthsco-firebase-adminsdk-ozfd4-aea7bbba12.json
COPY spark-submit.sh /app/spark-submit.sh 

# Ensure spark-submit.sh has the correct permissions
RUN chmod +x /app/spark-submit.sh

# Install necessary packages
RUN apt-get update && apt-get install -y dos2unix python3 python3-pip

# Install Python dependencies (clickhouse-driver and firebase-admin)
RUN pip install clickhouse-driver firebase-admin

RUN dos2unix /app/spark-submit.sh && dos2unix /app/src/process_parquet.py

# Set the entrypoint to run spark-submit.sh
ENTRYPOINT ["/bin/bash", "/app/spark-submit.sh"]
