#!/bin/bash

# Executa o job do Spark
/opt/bitnami/spark/bin/spark-submit \
  --master local[*] \
  /app/src/process_parquet.py

# Mantém o container ativo após a execução do Spark job
tail -f /dev/null
