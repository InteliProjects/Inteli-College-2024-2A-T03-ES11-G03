-- calcular a margem de lucro de produtos em um determinado mês

-- A query calcula a margem de lucro mensal para cada produto, considerando o preço de venda e o custo, agrupando os dados por 
-- produto e mês. Ela retorna informações detalhadas sobre cada produto, incluindo categoria, subcategoria, marca, e exibe a 
-- margem de lucro como uma porcentagem. O resultado é ordenado por mês e código do produto.

CREATE VIEW IF NOT EXISTS default.vw_margem_lucro_produtos_mensal AS
SELECT
    d.cod_prod,
    d.nome_abrev,
    d.nome_completo,
    d.categoria,
    d.sub_categoria,
    d.marca,
    formatDateTime(parseDateTimeBestEffort(p.data_inicio), '%Y-%m') AS ano_mes,
    AVG((p.preco - c.custo) / NULLIF(p.preco, 0)) * 100 AS margem_lucro_mensal
FROM
    default.sku_price p
INNER JOIN
    default.sku_cost c ON p.cod_prod = c.cod_prod
INNER JOIN
    default.sku_dataset d ON c.cod_prod = d.cod_prod
WHERE
    (p.data_fim IS NULL OR p.data_fim >= c.data_inicio)
    AND (c.data_fim IS NULL OR c.data_fim >= p.data_inicio)
GROUP BY
    d.cod_prod, d.nome_abrev, d.nome_completo, d.categoria, d.sub_categoria, d.marca, ano_mes
ORDER BY
    ano_mes, d.cod_prod;


-- Exemplo de uso:

-- SELECT *
-- FROM default.vw_margem_lucro_produtos_mensal
-- WHERE ano_mes = '2024-08';

-- view para junção de todos os dados de transações por vendedor

CREATE VIEW IF NOT EXISTS default.vw_transaction_fact_v6_all AS
SELECT 
    *,
    (toYear(parseDateTimeBestEffort(data)) * 100) + toMonth(parseDateTimeBestEffort(data)) AS ano_mes
FROM 
    transaction_fact_v6_2018
UNION ALL
SELECT 
    *,
    (toYear(parseDateTimeBestEffort(data)) * 100) + toMonth(parseDateTimeBestEffort(data)) AS ano_mes
FROM 
    transaction_fact_v6_2023
UNION ALL
SELECT 
    *,
    (toYear(parseDateTimeBestEffort(data)) * 100) + toMonth(parseDateTimeBestEffort(data)) AS ano_mes
FROM 
    transaction_fact_v6_2024;


-- view para margem unitária

CREATE VIEW IF NOT EXISTS default.vw_margem_unitaria_produtos AS
SELECT
    p.cod_prod,
    (p.preco - c.custo) AS margem_unitaria
FROM
    default.vw_transaction_fact_v6_all p
INNER JOIN
    default.sku_cost c ON p.cod_prod = c.cod_prod;

-- view para margem por transaçao

CREATE VIEW IF NOT EXISTS default.vw_transacoes_com_margem AS
SELECT
    t.cod_vendedor,
    t.cod_prod,
    t.quantidade,
    t.preco,
    m.margem_unitaria,
    (t.quantidade * m.margem_unitaria) AS lucro_transacao
FROM
    default.vw_transaction_fact_v6_all t
LEFT JOIN
    default.vw_margem_unitaria_produtos m ON t.cod_prod = m.cod_prod;

-- calcular o desempenho de vendas por vendedor

-- A query calcula o desempenho de vendas por vendedor, considerando o preço de venda, custo, quantidade de itens vendidos, agrupando os dados por 
-- produto, mês e vendedor. O resultado é ordenado por mês e código do vendedor.

CREATE VIEW IF NOT EXISTS default.vw_desempenho_vendas_vendedor AS
SELECT
    cod_vendedor,
    SUM(lucro_transacao) AS lucro_total_vendedor
FROM
    default.vw_transacoes_com_margem
GROUP BY
    cod_vendedor
ORDER BY
    cod_vendedor;

-- analisar a performance do vendedor em relação às metas de vendas

-- A query calcula o cumprimento das metas de vendas mensais por vendedor, considerando a meta de vendas, total vendido, agrupando os dados por
-- mês e vendedor. O resultado é ordenado por mês e código do vendedor.

CREATE VIEW IF NOT EXISTS default.vw_cumprimento_metas_mensal_vendedor AS
SELECT 
    tsf.id_employee,
    tsf.ano_mes,
    tsf.sales_target,
    COALESCE(SUM(tf.preco), 0) AS total_vendido
FROM 
    targets_salesperson_final_v6 tsf
LEFT JOIN 
    default.vw_transaction_fact_v6_all tf 
ON 
    tsf.id_employee = tf.cod_vendedor 
    AND tsf.ano_mes = formatDateTime(parseDateTimeBestEffort(tf.data), '%Y%m')
GROUP BY 
    tsf.id_employee, tsf.ano_mes, tsf.sales_target;

----- view cross sell


CREATE VIEW IF NOT EXISTS cross_sell AS
SELECT 
    a.cod_prod AS product_a,
    b.cod_prod AS product_b,
    COUNT(*) AS times_bought_together
FROM 
    default.vw_transaction_fact_v6_all a
JOIN
    default.vw_transaction_fact_v6_all b
ON a.cod_transacao = b.cod_transacao
WHERE a.cod_prod < b.cod_prod
GROUP BY a.cod_prod, b.cod_prod
ORDER BY times_bought_together DESC;


-- views para buscar dados para dashboard

-- view para capturar o total de transações por loja

CREATE VIEW IF NOT EXISTS default.vw_total_transactions_per_store AS
SELECT 
    t.cod_loja,
    COUNT(t.cod_transacao) AS total_transacoes
FROM
    default.vw_transaction_fact_v6_all t
GROUP BY 
    t.cod_loja;

-- view para capturar o total de vendas por loja, considerando a data

CREATE VIEW IF NOT EXISTS default.vw_total_sales_per_store_per_date AS
SELECT 
    t.cod_loja,
    t.data,
    t.ano_mes,
    SUM(t.quantidade) AS total_quantidade,                
    SUM(t.preco * t.quantidade) AS receita,                                
    (SUM(t.preco * t.quantidade) / NULLIF(t.quantidade, 0)) AS ticket_medio
FROM
    default.vw_transaction_fact_v6_all t
GROUP BY 
    t.cod_loja, 
    t.data,
    t.ano_mes,
    t.quantidade
ORDER BY 
    t.cod_loja, 
    t.data;

-- view para capturar o ticket medio de cada loja

CREATE VIEW IF NOT EXISTS default.vw_average_ticket_per_store AS
SELECT 
    t.cod_loja,
    t.ano_mes,
    SUM(t.quantidade) AS total_quantidade,
    SUM(t.preco * t.quantidade) AS receita,
    (SUM(t.preco * t.quantidade) / NULLIF(SUM(t.quantidade), 0)) AS ticket_medio
FROM
    default.vw_transaction_fact_v6_all t
GROUP BY 
    t.cod_loja,
    t.ano_mes,
    t.quantidade
ORDER BY 
    ticket_medio;

-- view para capturar os top sellers de cada loja

CREATE VIEW IF NOT EXISTS default.vw_top_sellers AS
SELECT 
    e.id_employee AS cod_vendedor,
    e.name AS nome,
    t.cod_loja AS cod_loja,
    t.ano_mes as ano_mes,
    ts.sales_target AS meta_vendedor,
    SUM(t.quantidade * t.preco) AS vendas,
    (CASE 
        WHEN ts.sales_target = 0 THEN 0 
        ELSE (SUM(t.quantidade * t.preco) / ts.sales_target) * 100 
    END) AS percentual_venda
FROM 
    default.vw_transaction_fact_v6_all t
JOIN 
    employee_final e ON t.cod_vendedor = e.id_employee
LEFT JOIN 
    targets_salesperson_final_v6 ts ON CAST(e.id_employee AS Float32) = ts.id_employee
GROUP BY 
    e.id_employee, 
    e.name, 
    t.cod_loja, 
    ts.sales_target,
    t.ano_mes
ORDER BY 
    vendas DESC;

-- view top products per store

CREATE VIEW IF NOT EXISTS default.vw_top_products AS
SELECT 
    t.cod_loja,
    s.nome_completo,
    t.cod_prod,
    t.quantidade,
    s.marca,
    t.ano_mes AS ano_mes,
    s.categoria,
    COUNT(t.cod_transacao) AS total_vendas
FROM 
    default.vw_transaction_fact_v6_all t
LEFT JOIN 
    default.sku_dataset s
ON 
    s.cod_prod = t.cod_prod
GROUP BY 
    t.cod_loja, t.cod_prod, t.quantidade, s.marca, s.nome_completo, s.categoria, t.ano_mes
ORDER BY 
    t.quantidade DESC;

-- top regional stores
-- essa view irá verificar a competição entre lojas da mesma região e como a loja do manager está posicionada

CREATE VIEW IF NOT EXISTS default.vw_top_regional_stores AS
SELECT 
    t.nome_loja AS nome_loja,
    t.regiao AS regiao,
    ts.month AS mes_meta,
    ts.sales_target AS meta_loja,
    SUM(v.quantidade * v.preco) AS vendas,
    (SUM(v.quantidade * v.preco) / NULLIF(ts.sales_target, 0)) * 100 AS percentual_meta
FROM
    default.store_final t
JOIN
    default.target_store_final_v6 ts 
    ON t.nome_loja = ts.story_id
LEFT JOIN
    default.vw_transaction_fact_v6_all v 
    ON t.nome_loja = v.cod_loja 
    AND formatDateTime(v.data, '%Y-%m') = formatDateTime(parseDateTimeBestEffort(ts.month), '%Y-%m')
GROUP BY
    t.nome_loja, 
    t.regiao, 
    ts.month,
    ts.sales_target
ORDER BY 
    percentual_meta DESC;

-- select stores for recomendation 

CREATE VIEW IF NOT EXISTS default.vw_recommendation_helper AS
SELECT 
    t.cod_transacao,
    t.cod_loja,
    t.cod_prod,
    t.quantidade,
    p.nome_abrev,
    p.marca,
    p.categoria,
    p.sub_categoria
FROM 
    default.vw_transaction_fact_v6_all t
INNER JOIN
    default.sku_dataset p
    ON t.cod_prod = p.cod_prod;

CREATE VIEW IF NOT EXISTS default.vw_recommendation AS
SELECT *
FROM 
    default.vw_recommendation_helper t
WHERE
    t.sub_categoria IN (
        SELECT sub_categoria
        FROM default.vw_recommendation_helper
        GROUP BY sub_categoria
        HAVING COUNT(*) > 700000
    );