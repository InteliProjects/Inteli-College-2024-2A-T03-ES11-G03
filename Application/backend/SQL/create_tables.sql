CREATE TABLE IF NOT EXISTS targets_salesperson_final (
    id UUID DEFAULT generateUUIDv4(),
    id_employee int,
    sales_target float,
    month String
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS target_store_final_v6 (
    id UUID DEFAULT generateUUIDv4(),
    month String,
    story_id String,
    sales_target float
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS targets_salesperson_final_v6 (
    id UUID DEFAULT generateUUIDv4(),
    id_employee int,
    sales_target float,
    ano_mes int
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS store_final (
    id UUID DEFAULT generateUUIDv4(),
    nome_loja String,
    regiao String, 
    diretoria String,
    data_inauguracao Date
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS sku_status_dataset (
    id UUID DEFAULT generateUUIDv4(),
	cod_produto int,
	data_inicio Date,
	data_fim Nullable(Date)
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS sku_price (
    id UUID DEFAULT generateUUIDv4(),
	cod_produto int,
	data_inicio Date,
	data_fim Nullable(Date),
	preco float
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS sku_dataset (
    id UUID DEFAULT generateUUIDv4(),
    cod_prod int,
	nome_abrev String,
	nome_completo String,
	descrecao String,
	categoria String,
	sub_categoria String,
	marca String,
	conteudo_valor float,
	conteudo_medida String
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS sku_cost (
    id UUID DEFAULT generateUUIDv4(),
    cod_prod int,
	data_inicio Date,
	data_fim Nullable(Date),
	custo float
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS employee_final (
    id UUID DEFAULT generateUUIDv4(),
	id_employee int,
	name String,
	surname String,
	cpf String,
	status String,
	role_employee String,
	initial_date String,
	end_date String,
	store_id String
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS transaction_fact_v6_2018 (
    id UUID DEFAULT generateUUIDv4(),
	transaction_data date,
	cod_vendedor int,
	cod_loja String,
	cod_prod int,
	cod_transacao String,
	quantidade int,
	preco float
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS transaction_fact_v6_2019 (
    id UUID DEFAULT generateUUIDv4(),
	transaction_data date,
	cod_vendedor int,
	cod_loja String,
	cod_prod int,
	cod_transacao String,
	quantidade int,
	preco float
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS transaction_fact_v6_2020 (
    id UUID DEFAULT generateUUIDv4(),
	transaction_data date,
	cod_vendedor int,
	cod_loja String,
	cod_prod int,
	cod_transacao String,
	quantidade int,
	preco float
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS transaction_fact_v6_2021 (
    id UUID DEFAULT generateUUIDv4(),
	transaction_data date,
	cod_vendedor int,
	cod_loja String,
	cod_prod int,
	cod_transacao String,
	quantidade int,
	preco float
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS transaction_fact_v6_2022 (
    id UUID DEFAULT generateUUIDv4(),
	transaction_data date,
	cod_vendedor int,
	cod_loja String,
	cod_prod int,
	cod_transacao String,
	quantidade int,
	preco float
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS transaction_fact_v6_2023 (
    id UUID DEFAULT generateUUIDv4(),
	transaction_data date,
	cod_vendedor int,
	cod_loja String,
	cod_prod int,
	cod_transacao String,
	quantidade int,
	preco float
) 
ENGINE = MergeTree()
ORDER BY id;

CREATE TABLE IF NOT EXISTS transaction_fact_v6_2024 (
    id UUID DEFAULT generateUUIDv4(),
	transaction_data date,
	cod_vendedor int,
	cod_loja String,
	cod_prod int,
	cod_transacao String,
	quantidade int,
	preco float
) 
ENGINE = MergeTree()
ORDER BY id;