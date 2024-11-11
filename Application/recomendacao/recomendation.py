import pandas as pd

# Função para recomendar produtos com base na sub categoria informada
def recomend_products(produto_input, regras, num_recomendacoes=2):
    regras_produto = regras[regras['antecedents'].apply(lambda x: produto_input in x)]

    regras_produto = regras_produto.sort_values(by='lift', ascending=False)

    if not regras_produto.empty:
        recomendacoes = []
        for _, row in regras_produto.iterrows():
            consequentes = row['consequents']
            for produto in consequentes:
                if produto not in recomendacoes and produto != produto_input:
                    recomendacoes.append(produto)

            if len(recomendacoes) >= num_recomendacoes:
                break

        return recomendacoes
    else:
        return "Nenhuma recomendação disponível para o produto."

# Função para encontrar os produtos mais vendidos em uma subcategoria
def get_top_sellers(transactions, subcategoria):
    transactions['nome_abrev'] = transactions['nome_abrev'].str.strip()
    top_sellers = transactions[transactions['sub_categoria'] == subcategoria]
    top_sellers = top_sellers.groupby(['cod_prod', 'nome_abrev']).agg({'quantidade': 'sum'}).reset_index()
    top_sellers = top_sellers.sort_values(by='quantidade', ascending=False)
    top_sellers_list = top_sellers['nome_abrev'].head(10).drop_duplicates().tolist()
    return top_sellers_list
