from flask import Flask, request, jsonify
from recomendation import get_top_sellers, recomend_products
import pickle
import os
import json
import redis
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

r = redis.StrictRedis(host=os.getenv('REDIS_HOST'), port=int(os.getenv('REDIS_PORT')), db=0)

@app.route('/cross_selling', methods=['POST'])
def cross_selling():
    data = request.json
    product = data.get('sub_categoria')

    if not product:
        return jsonify({'error': 'Subcategoria não fornecida.'}), 400
    
    
    cache_data = r.get(product)
    if cache_data:
        print(f"Cache hit para subcategoria {product}")
        cached_result = json.loads(cache_data)
        return jsonify({
            'suggested_subcategory': cached_result['suggested_subcategory'],
            'recommended_products': cached_result['recommended_products']
        })
    
    try:
        with open(os.getcwd() + '\\data\\cross_selling_model.pkl', 'rb') as model_file:
            rules = pickle.load(model_file)
        print("Modelo carregado com sucesso!")
    except Exception as e:
        print(f"Erro ao carregar o modelo: {e}")
        return jsonify({'error': 'Erro ao carregar o modelo de cross-selling.'}), 500

    try:
        transactions = pd.read_parquet(os.getcwd() + '\\data\\transactions.parquet')
        print("Transações carregadas com sucesso!")
    except Exception as e:
        print(f"Erro ao carregar o dados das transações: {e}")
        return jsonify({'error': 'Erro ao carregar os dados de transações.'}), 500

    try:
        subcat = recomend_products(product, rules)
        produtos = get_top_sellers(transactions, subcat[0])
    except Exception as e:
        print(f"Erro ao gerar recomendações: {e}")
        return jsonify({'error': 'Erro ao gerar recomendações.'}), 500
    
    cache_value = {
        'suggested_subcategory': subcat,
        'recommended_products': produtos
    }
    r.set(product, json.dumps(cache_value))

    return jsonify({
        'suggested_subcategory': subcat,
        'recommended_products': produtos
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
