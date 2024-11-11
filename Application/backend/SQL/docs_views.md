NÃO SUBIR NO PR, ESSA DOC É NOSSA, PARA CONSULTAS

1. VIEW PARA MARGEM DE LUCRO MENSAL:
   
```
    SELECT *
    FROM default.vw_margem_lucro_produtos_mensal
    WHERE ano_mes = '2024-08';
```

A query calcula a margem de lucro mensal para cada produto, considerando o preço de venda e o custo, agrupando os dados por produto e mês. Ela retorna informações sobre cada produto (categoria, subcategoria, marca, e exibe a  margem de lucro como uma porcentagem). O resultado é ordenado por mês e código do produto.

2. VIEW PARA PERFOMANCE MENSAL DO VENDEDOR:

```
    SELECT *
    FROM default.vw_perfomance_mensal_vendedor
    WHERE month = '01/2024'
    AND id_employee = 1

```

A query calcula a performance mensal para cada vendedor, considerando o mês, a meta de vendas e o total vendido no mês, agrupando por id do vendedor, mês e meta de vendas.