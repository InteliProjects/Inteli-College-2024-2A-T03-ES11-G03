# Arquitetura de Negócio

### Governança de Dados 

##### 1. Estrutura de Governança de Dados

##### Políticas de Qualidade dos Dados:

- Realidade da CosmeticCo: Devido ao grande número de lojas e colaboradores, pode haver inconsistências na coleta e registro de dados, como informações duplicadas ou incompletas.
- Adaptação: Implementar um sistema de validação automática que verifica a integridade dos dados na origem, antes de serem inseridos no sistema central. Isso inclui a verificação de duplicatas no cadastro de produtos (SKUs) e colaboradores, além de alertas para dados faltantes, como metas de vendas que não foram registradas.

#####  Segurança e Privacidade dos Dados:
- Realidade da CosmeticCo: Com dados sensíveis, como informações de vendas e remuneração dos colaboradores, a segurança é uma prioridade. Também é importante cumprir as exigências da LGPD (Lei Geral de Proteção de Dados).

- Adaptação: Implementar controles de acesso baseados em função, onde apenas gerentes podem acessar dados detalhados dos vendedores, enquanto os vendedores têm acesso apenas aos seus próprios dados. A encriptação de dados sensíveis, como informações de remuneração, garantirá que mesmo em caso de violação de segurança, as informações estejam protegidas. Auditorias trimestrais serão realizadas para assegurar conformidade com as políticas de segurança.

##### Gestão de Metadados:
- Realidade da CosmeticCo: A empresa trabalha com diversas bases de dados, e a falta de documentação pode dificultar a manutenção e o uso adequado dos dados.
- Adaptação: Estabelecer um catálogo de metadados que documente detalhadamente cada base de dados utilizada, incluindo a origem, as transformações aplicadas e a finalidade dos dados. Essa documentação será acessível para todos os usuários autorizados, garantindo transparência e facilitando a manutenção.

##### 2. Fluxo de Dados no Pipeline de Processamento

##### Inserção:
- Realidade da CosmeticCo: A coleta de dados ocorre em diferentes pontos, como lojas, sistemas de estoque, e transações de vendas.
- Adaptação: Implementar um pipeline automatizado que coleta dados de forma contínua e em tempo real, garantindo que as informações estejam sempre atualizadas. Por exemplo, a integração dos sistemas de vendas das lojas com o banco de dados central permitirá a ingestão automática de transações e estoque.

#####  Transformação:
- Realidade da CosmeticCo: Com dados provenientes de diferentes fontes, a padronização é crucial para garantir a consistência nas análises.
- Adaptação: Utilizar ferramentas ETL para padronizar os dados de diferentes fontes. Isso incluirá a limpeza dos dados, a remoção de outliers, e a agregação de informações relevantes, como unificar as categorias de produtos de diferentes lojas em uma estrutura comum.

#####  Armazenamento:
- Realidade da CosmeticCo: O armazenamento eficiente dos dados é essencial para suportar consultas rápidas e análises detalhadas.
- Adaptação: Estruturar os dados em camadas, como uma camada de dados brutos, uma de dados transformados e outra de dados prontos para visualização. Isso permitirá uma consulta eficiente, respeitando as necessidades de segurança e governança.

#####  Visualização:
- Realidade da CosmeticCo: A empresa precisa que as informações sejam apresentadas de forma clara e personalizada para diferentes níveis de usuários.
- Adaptação: Criar visualizações customizadas para cada grupo de usuários, utilizando ferramentas de análise de dados e bibliotecas para geração de gráficos. Por exemplo, dashboards personalizados para gerentes de loja, que possam comparar as performances de diferentes vendedores, e visualizações simples e objetivas para os vendedores.

#### 3. Avaliação e Melhorias Contínuas

#####  Monitoramento e Auditoria:
- Realidade da CosmeticCo: É necessário garantir que as políticas de governança sejam seguidas consistentemente.
- Adaptação: Implementar um sistema de monitoramento contínuo que identifique problemas de qualidade ou segurança em tempo real, além de realizar auditorias periódicas para verificar a conformidade com as políticas estabelecidas.

#####  Treinamento e Capacitação:
- Realidade da CosmeticCo: Com um grande número de vendedores e gerentes, é importante que todos compreendam como usar o DataApp corretamente.
- Adaptação: Desenvolver um programa de treinamento contínuo, incluindo workshops e materiais educativos, para capacitar os usuários finais no uso adequado do DataApp. Isso garantirá que eles possam interpretar os insights corretamente e utilizá-los para melhorar sua performance.

#####  Considerações 

- Ao adaptar as boas práticas de governança de dados para a realidade da CosmeticCo, estamos criando como grupo um ambiente onde os dados são geridos de forma segura, eficiente e transparente. Isso não só melhora a qualidade das informações disponíveis, mas também aumenta a confiança dos usuários nos dados e nas decisões baseadas neles. Através dessas adaptações, a CosmeticCo poderá maximizar o valor dos seus dados e alcançar os objetivos estratégicos propostos.

### Política de dados

As políticas de uso de dados do nosso grupo estabelecem que é **proibido subir qualquer dado no GitHub** ou em outras plataformas públicas. Para garantir a segurança, todos os dados devem ser armazenados em locais que ofereçam uma camada de autenticação. Isso pode incluir o uso de arquivos encriptados, onde a chave de desencriptação fica exclusivamente nos computadores dos integrantes do grupo, ou a proteção dos arquivos com senha. A ideia é que o acesso aos dados seja restrito e seguro, utilizando métodos eficazes para evitar qualquer exposição indevida.

Para garantir a segurança durante o processo de subida e manipulação dos dados em pipelines, utilizaremos ferramentas BaaS, como o Firebase. Essas plataformas oferecem autenticação de usuários integrada, o que adiciona uma camada extra de proteção e dificulta tentativas de acesso não autorizado. Ao utilizar essas ferramentas, asseguramos que somente membros autenticados do grupo possam interagir com os dados, minimizando o risco de exploits e protegendo a integridade dos dados ao longo de todo o processo de desenvolvimento do projeto.

Com essas políticas iniciais definidas, propusemos uma gestão colaborativa dos dados no grupo. A cada Sprint, realizaremos reuniões para avaliar se as políticas estão sendo efetivamente aplicadas e identificar possíveis gargalos que possam comprometer a segurança dos dados, inclusive no que diz respeito a potenciais riscos de vazamento. Também revisaremos continuamente as práticas para garantir que permanecem em conformidade com a LGPD, mesmo considerando que os dados são mascarados.

Além disso, vamos documentar todo o processo relacionado ao manuseio e gestão dos dados em registros internos do grupo. Essa documentação será essencial para fornecer um histórico detalhado de como lidamos com os dados, especialmente se a solução for implementada no futuro. Essa prática não apenas mantém a transparência, mas também assegura que o grupo continue a tratar a integridade e a confiabilidade dos dados com a devida importância, evitando qualquer descuido que possa comprometer a autenticidade dos resultados ou a confiança no projeto.

### Medição da Qualidade dos Dados

**Objetivo:** Garantir que os dados utilizados no projeto sejam de alta qualidade, suportando decisões estratégicas precisas e confiáveis. A qualidade dos dados será medida e monitorada através de processos  e métricas específicas, alinhadas com as  práticas de governança de dados estabelecidas.

#### **1. Dimensões da Qualidade dos Dados**
Para uma avaliação abrangente, consideraremos as seguintes dimensões da qualidade dos dados:

- **Completude:** Verificação de que todos os campos obrigatórios estão preenchidos.
- **Acurácia:** Avaliação da precisão dos dados em relação à realidade.
- **Consistência:** Verificação de que os dados são uniformes em todas as fontes e sistemas.
- **Atualidade:** Garantia de que os dados são atualizados em tempo hábil.
- **Validade:** Confirmação de que os dados cumprem os formatos e regras definidos.
- **Integridade:** Avaliação de que não há dados corrompidos ou ausentes, como relações entre tabelas corretamente definidas.

#### **2. Processos de Medição da Qualidade dos Dados**

**2.1. Definição de Métricas Específicas**
Para cada dimensão da qualidade, serão definidas métricas específicas que permitem uma medição objetiva. Exemplos incluem:

- **Taxa de Completeness:** Percentual de registros que possuem todos os campos obrigatórios preenchidos.
- **Índice de Acurácia:** Percentual de registros que correspondem à realidade após auditorias.
- **Consistência entre Tabelas:** Percentual de dados que são uniformes entre as diferentes fontes foernecidas pelo parceiro.
- **Tempo de Atualização:** Tempo médio entre a coleta de dados e sua atualização no sistema a ser desenvolvido.
- **Conformidade com a Validade:** Percentual de registros que cumprem os formatos e regras predefinidos.
- **Índice de Integridade:** Percentual de registros sem problemas de integridade referencial.

**2.2. Implementação de Ferramentas de Qualidade de Dados**
Serão utilizadas ferramentas automatizadas de qualidade de dados para monitorar e corrigir problemas em tempo real. Exemplos incluem:

- **Data Quality Monitoring:** Ferramentas que monitoram a qualidade dos dados, identificando e corrigindo automaticamente inconsistências, duplicidades, e dados ausentes.
- **ETL Tools (Extract, Transform, Load):** Ferramentas que garantem a padronização e validação dos dados durante o processo de transformação.

**2.3. Relatórios Periódicos de Qualidade**
Relatórios  detalhados serão gerados para documentar a qualidade dos dados, incluindo:

- **Relatórios de Acurácia e Completude:** Demonstrando a evolução dos dados ao longo do tempo.
- **Dashboards de Qualidade de Dados:** Visualizações que permitem acompanhar os KPIs de qualidade em tempo real.

#### **3. Processos de Melhoria Contínua**

**3.1. Análise de Causa Raiz**
Ao identificar problemas de qualidade, será realizada uma análise de causa raiz para entender e corrigir as origens dos problemas, garantindo que eles não se repitam.

**3.2. Feedback Contínuo**
Os usuários finais e parceiro, como gerentes e vendedores, serão incentivados a fornecer feedback contínuo sobre a qualidade, permitindo ajustes ágeis e precisos.


#### **4. Avaliação da Efetividade**

**4.1. Métricas de Melhoria**
A cada ciclo de encontros com parceiro, será avaliado o impacto das ações de melhoria, observando métricas como a redução de inconsistências e o aumento da completude dos dados.

**4.2. Governança Adaptativa**
As políticas de governança de dados serão revisadas e ajustadas com base nos resultados  e no feedback recebido, garantindo uma adaptação contínua às necessidades da aplicação e desenvolvimento no projeto.


