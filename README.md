# Inteli - Instituto de Tecnologia e Liderança 



<img src="./Docs/Assets/logo-inteli.png" width="100" height="50">
<img src="./Docs/Assets/logo_bcg.png" width="60" height="30">

</br>
# Sumário

- [Inteli - Instituto de Tecnologia e Liderança](#inteli---instituto-de-tecnologia-e-liderança)
- [Nome do Grupo](#nome-do-grupo)
- [Integrantes](#integrantes)
- [Descrição](#descrição)
- [Estrutura de Pastas](#estrutura-de-pastas)
  - [Backend](#backend)
  - [Data Ingestion](#data-ingestion)
  - [ETL](#etl)
  - [Metrics](#metrics)
  - [Worker](#worker)
  - [Docs](#docs)
- [Instalação](#instalação)
- [Exemplo de Uso](#exemplo-de-uso)
- [Configuração para Desenvolvimento](#configuração-para-desenvolvimento)
- [Histórico de Lançamentos](#histórico-de-lançamentos)
- [Licença](#licença)
- [Referências](#referências)
# InsightsCo

## Nome do grupo

## Integrantes: 
- <a href="https://www.linkedin.com/in/alexandrefonseca00">Alexandre Fonseca de Souza
</a>

- <a href="https://www.linkedin.com/in/carolina-favaro-fricks-1a0423231/">Carolina Favaro Fricks</a>

- <a href="https://www.linkedin.com/in/emanuel-de-oliveira-costa-45b637185/">Emanuel Costa</a>

- <a href="https://www.linkedin.com/in/felipesilberberg/">Felipe Silberberg</a>

- <a href="https://www.linkedin.com/in/jo%C3%A3o-lucas-gonzalez/">João Lucas Delistoianov Gonzalez</a>

- <a href="https://www.linkedin.com/in/pedro-gattai-096678227/">Pedro Gattai</a>

- <a href="https://www.linkedin.com/in/yveslevi/">Yves Levi Paixão Lapa</a>

## Descrição

 O projeto visa resolver um dos principais desafios       enfrentados pela CosmeticCo: a falta de comunicação eficaz  entre o setor corporativo e as lojas, especialmente no que se refere aos complexos modelos de remuneração variável. Essa falta de clareza tem levado a um elevado índice de turnover, baixo engajamento dos vendedores e desempenho aquém do esperado..
<p align="center">
  
<br><br>

## 🛠 Estrutura de pastas
    Application
    │   ├── backend
    │   │   ├── config
    │   │   │   ├── db.js
    │   │   │   ├── S3Config.js
    │   │   │   └── swagger.js
    │   │   ├── controllers
    │   │   │   ├── dashboard.controller.js
    │   │   │   └── upload.controller.js
    │   │   ├── node_modules
    │   │   ├── rabbitmq
    │   │   │   ├── connection.js
    │   │   │   ├── consumer.js
    │   │   │   └── producer.js
    │   │   ├── routes
    │   │   │   ├── dashboardRoutes.js
    │   │   │   └── uploadRoutes.js
    │   │   ├── services
    │   │   │   ├── dashboard.service.js
    │   │   │   └── upload.service.js
    │   │   ├── SQL
    │   │   │   ├── create_tables.sql
    │   │   │   ├── create_views.sql
    │   │   │   └── docs_views.md
    │   │   ├── .env
    │   │   ├── .gitignorne
    │   │   ├── docker-compose.yml
    │   │   ├── index.js
    │   │   ├── package-lock.json
    │   │   └── package.json
    │   │
    │   ├── data_ingestion
    │   │     ├── csv_file
    │   │     └── data_ingest.py
    │   ├── etl
    │   │     ├── data
    │   │     ├── grafana
    │   │     ├── src
    │   │     │    └── spark-sumit.sh 
    │   │     ├── docker-compose.yml
    │   │     ├── Dockerfile
    │   │     └── spark-sumit.sh  
    │   ├── metrics
    │   │     └── clickhouse-metrics
    │   │    
    │   └── worker
    │          ├── .gitignore
    │          ├── requirements.txt
    │          └── scheduler.py
    │
    ├── Docs
    │   ├── Assets
    │   ├── análise_exploratória.nb.html
    │   ├── análise_exploratória.Rmd
    │   ├── arquitetura_de_dados.md
    │   ├── arquitetura_de_negocio.md
    │   ├── arquitetura_implementação.md
    │   ├── Template_Arquitetura.md
    └── README.md
### Estrutura do Projeto

A pasta raiz contém um arquivo principal:
- **README.md**: Guia geral sobre o projeto.

### Subpastas e seus Conteúdos

#### backend
Esta pasta contém todos os arquivos necessários para o funcionamento do servidor backend da aplicação:
- **config**: Configurações do banco de dados (`db.js`), Amazon S3 (`S3Config.js`), e Swagger (`swagger.js`).
- **controllers**: Scripts que controlam as respostas a pedidos, como `dashboard.controller.js` e `upload.controller.js`.
- **node_modules**: Módulos de Node.js instalados.
- **rabbitmq**: Scripts relacionados ao RabbitMQ, incluindo `connection.js`, `consumer.js`, e `producer.js`.
- **routes**: Define as rotas HTTP da aplicação (`dashboardRoutes.js` e `uploadRoutes.js`).
- **services**: Camada de serviços onde a lógica de negócio é implementada (`dashboard.service.js` e `upload.service.js`).
- **SQL**: Scripts SQL para criação de tabelas e views (`create_tables.sql`, `create_views.sql`), e documentação (`docs_views.md`).
- Arquivos diversos como `.env`, `.gitignore`, `docker-compose.yml`, `index.js`, `package-lock.json`, e `package.json`.

### data_ingestion
Contém scripts para ingestão de dados (`data_ingest.py`) para os arquivos csv serem transformados em .parquet e um subdiretório para arquivos CSV.

### etl
Diretório destinado à transformação de dados, incluindo configurações de Docker, scripts do Apache Spark (`spark-submit.sh`) e outras definições relevantes.

### metrics
Armazena configurações e scripts para a geração de métricas, usando ClickHouse para análise.

### worker
Contém scripts que gerenciam tarefas agendadas (`scheduler.py`), além de arquivos de requisitos e de configuração de versionamento.

### Docs
Diretório de documentação que inclui:
- **Assets**: Recursos visuais e outros ativos.
- **análise_exploratória**: Análises exploratórias em R (`análise_exploratória.Rmd`) e sua versão compilada em HTML.
- **arquitetura_de_dados.md**, **arquitetura_de_negocio.md**, **arquitetura_implementação.md**: Documentos detalhando diferentes aspectos da arquitetura do projeto.
- **Template_Arquitetura.md**: Template para documentação de arquitetura.

## Principais Artefatos do Projeto

### [Template da Arquitetura](./Docs/Template_Arquitetura.md)
O "Template da Arquitetura" oferece uma estrutura que foi melhorada a partir das sprints para garantir a consistência e qualidade na documentação de arquitetura de software.

### [Arquitetura de Negócios](./Docs/arquitetura_de_negocio.md)
O documento "Arquitetura de Negócios" detalha como o projeto alinha-se com os objetivos estratégicos da empresa..

### [Análise Exploratória](./Docs/análise_exploratória.Rmd)
"Análise Exploratória" contém um relatório detalhado, que explora os dados enviados pelo parceiro, oferecendo insights preliminares e identificando possíveis áreas de interesse para análises mais profundas.

### [Arquitetura de Dados](./Docs/arquitetura_de_dados.md)
O documento descreve a estruturação dos dados dentro do projeto, incluindo esquemas de banco de dados, políticas de integridade e segurança, bem como o fluxo de dados entre os componentes do sistema.


## 🛠 Instalação


## 📈 Exemplo de uso
InsightsCo é uma ferramenta interativa destinada a gerentes e vendedores de lojas, oferecendo funcionalidades como projeção de vendas e remuneração, recomendações de cross-sell, e insights sobre produtos de alta margem. Utilizando essa ferramenta, os gerentes podem efetivamente ajustar estratégias de vendas e remuneração em tempo real, enquanto os vendedores são motivados por simulações de ganhos potenciais. Isso melhora o engajamento, aumenta o desempenho das vendas e fornece uma gestão mais eficiente dos recursos, alinhando estrategicamente as operações de loja com as metas corporativas.

***Exemplo de uso na prática:***

Imagine um vendedor da CosmeticCo começando seu dia. Ao acessar o bot no Telegram, ele conesgue automaticamente uma atualização sobre seu progresso em relação às metas de vendas do mês. O bot sugere produtos que ele poderia sugerir para clientes para aumentar suas vendas e comissões, baseado nas preferências dos clientes e em produtos que frequentemente são comprados juntos. Simultaneamente, o gerente da loja verifica o dashboard que fornece uma visão detalhada do desempenho da loja, incluindo rankings de vendedores e comparações com outras lojas da rede. Esse acesso instantâneo a informações críticas permite que ambos, vendedor e gerente, tomem decisões rápidas e informadas, maximizando a eficiência e aumentando as vendas.
  

## 💻 Configuração para desenvolvimento


## 🗃 Histórico de lançamentos
Esse histórico se da a partir da branch `homolog`

### 31 de Agosto de 2024
- **Merge pull request #63** - Integração de mudanças para monitoramento da arquitetura.
- **docs: add monitoring strategies documentation** - Documentação sobre estratégias de monitoramento.
- **Merge pull request #62** - Integração de funcionalidades para análise de cross sell.
- **fix commit** - Correções gerais em commits anteriores.
- **add docs from view** - Adição de documentação a partir de visualizações de dados.
- **Update arquitetura_de_dados.md** - Atualizações no documento de arquitetura de dados.

### 30 de Agosto de 2024
- **Merge pull request #61** - Fusão de alterações do branch de desenvolvimento.
- **Merge pull request #57** - Incorporação de novos diagramas ao projeto.
- **Merge pull request #59** - Criação de visualizações para o cumprimento de metas de vendas.
- **Merge pull request #60** - Fusão de melhorias no processo de dados.
- **feat: add etl pipeline** - Implementação de um pipeline ETL.

### 29 de Agosto de 2024
- **Adiciona documentação de diagramas cumprimento de metas** - Documentação detalhada dos diagramas usados.
- **Merge branch 'feat/create_views'** - Combinação de branches que criam visualizações de dados.
- **feat: creating view for monthly performance per seller** - Criação de visualizações para desempenho mensal por vendedor.
- **add cross sell view** - Adição de visualização para análise de vendas cruzadas.
- **Merge pull request #53** - Integração de atualizações documentais.

### 28 de Agosto de 2024
- **docs: documentação da modelagem** - Documentação sobre modelagem de dados.
- **feat: sales target view v1** - Primeira versão de uma visualização para metas de vendas.
- **chore: add architecture tools in documentation** - Adição de ferramentas de arquitetura na documentação.
- **Cria view de cumprimento sales** - Visualização para monitoramento das vendas.
- **chore: documentation of flux and architecture** - Documentação dos fluxos e arquitetura.
- **fix: add coluna cod produto** - Adição de uma coluna de código de produto.

### 27 de Agosto de 2024
- **Update arquitetura_de_dados.md** - Atualização no documento de arquitetura de dados.

### 26 de Agosto de 2024
- **Merge pull request #47** - Integração de funcionalidade para conversão de arquivos para parquet.
- **fix to change the file to .parquet** - Correção na conversão de arquivos para formato .parquet.
- **feat: criar views de lucro mensal** - Criação de visualizações para lucro mensal.
- **feat: convert file to parquet** - Conversão de arquivos para formato parquet.
- **feat: connection to rabbitmq** - Estabelecimento de conexão com RabbitMQ.

### 25 de Agosto de 2024
- **data ingestion** - Processos de ingestão de dados.
- **fix: add coluna cod_prod** - Adição de uma coluna de código de produto.
- **feat: create tables** - Criação de tabelas no sistema de banco de dados.

### 24 de Agosto de 2024
- **Merge pull request #43** - Integração de mudanças relacionadas a fluxos e arquitetura de processos.

### 22 de Agosto de 2024
- **chore: add flux and processes architecture image** - Adição de imagens para arquitetura de fluxos e processos.

### 20 de Agosto de 2024
- **Merge pull request #42** - Início de aplicação backend com integração de funcionalidades básicas.

### 19 de Agosto de 2024
- **feat: add bot /start interaction** - Implementação da interação inicial com bot.
- **feat: create telegram bot and first interaction** - Criação de um bot no Telegram e estabelecimento da primeira interação.

### 18 de Agosto de 2024
- **Merge pull request #21 from Inteli-College/docs** - Fusão de atualizações documentais.
- **Merge pull request #22 from Inteli-College/develop** - Fusão de funcionalidades desenvolvidas no branch de desenvolvimento.
- **Merge pull request #18 from Inteli-College/docs** - Integração de atualizações na documentação.
- **Merge pull request #19 from Inteli-College/chore/documentation-formality** - Integração de mudanças relacionadas à formalização da documentação.
- **fix: resolving merge conflicts** - Resolução de conflitos de merge.
- **docs: adding updated html file** - Adição de um arquivo HTML atualizado.
- **docs: documentation formality** - Formalização da documentação existente.
- **chore: add data policies** - Adição de políticas de dados ao projeto.
- **docs: visual design** - Atualização de elementos de design visual no projeto.

### 17 de Agosto de 2024
- **fix: caminho para arquitetura v1** - Ajuste nos caminhos referentes à arquitetura versão 1.
- **feat: diagrama da arquitetura v1** - Adição de um novo diagrama para a arquitetura versão 1.
- **fix: adicionando tópicos** - Adição de novos tópicos à documentação existente.

### 16 de Agosto de 2024
- **Update Template_Arquitetura.md** - Atualização do template de arquitetura.
- **Update Template_Arquitetura.md** - Continuação das atualizações no template de arquitetura.
- **Update Template_Arquitetura.md** - Finalização das atualizações no template de arquitetura.

### 15 de Agosto de 2024
- **Adiciona estruturação da governança de dados** - Estruturação detalhada das políticas de governança de dados.
- **Adiciona governança de dados** - Primeira inserção das práticas de governança de dados.

### 14 de Agosto de 2024
- **add v1 do template** - Criação da primeira versão de um template para o projeto.

### 12 de Agosto de 2024
- **feat: rmarkdown da análise exploratória** - Desenvolvimento de uma análise exploratória utilizando R Markdown.

### 2 de Agosto de 2024
- **Initial commit** - Configuração inicial do repositório, estabelecimento de estruturas básicas.

## 📋 Licença/License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Spidus/Teste_Final_1">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.yggbrasil.com.br/vr">INTELI, VICTOR BRUNO ALEXANDER ROSETTI DE QUIROZ</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>

## 🎓 Referências

Aqui estão as referências usadas no projeto.
