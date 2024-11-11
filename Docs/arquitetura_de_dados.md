# Arquitetura de Dados

### Considerações de Governança - Segurança



#### Pontos Identificados no que tange a segurança na aquitetura:


---

Os pontos identificados oferecem uma estrutura robusta para garantir a segurança dos dados e dos componentes na arquitetura que está sendo desenvolvida em grupo. Assim, destacam-se alguns pontos adicionais que podem ser úteis para fortalecer ainda mais a governança e segurança:

### Considerações Adicionais:

1. **Segurança no RabbitMQ:**
   - Configurar autenticação e autorização rigorosa para o RabbitMQ, garantindo que apenas serviços autorizados possam publicar e consumir mensagens. É necessário considerar a criptografia de mensagens sensíveis e a **integridade dos dados ao transitar entre frontend e backend por meio do RabbitMQ (fila)**, para evitar a perda de informações.

2. **Backup e Recuperação:**
   - Estabelecer uma estratégia de backup regular e testar os processos de recuperação de dados, especialmente para os dados críticos armazenados em S3 e Redshift. Isso garante que, em caso de incidentes, os dados possam ser restaurados rapidamente.

3. **Treinamento e Conscientização de Segurança:**
   - Fornecer treinamentos regulares para a equipe  e operação sobre melhores práticas de segurança, como gerenciamento de credenciais, resposta a incidentes, e atualizações de segurança.

4. **Automação de Segurança:**
   - Considerar o uso de ferramentas de automação para aplicar patches de segurança e realizar auditorias de conformidade regularmente, minimizando o risco de vulnerabilidades conhecidas.

5. **Gestão de Incidentes:**
   - Desenvolver e implementar um plano de resposta a incidentes que inclua identificação, contenção e recuperação. Esse plano precisa ser testado periodicamente através de simulações.

6. **Segurança na Rede:**
   - Utilizar grupos de segurança e Network ACLs para controlar o tráfego de rede entre diferentes componentes da arquitetura. Implementar a segmentação da rede para isolar componentes críticos, como o backend e as bases de dados.

7. **Segurança Transacional:**
   - Garantir que todas as transações sejam seguras, utilizando criptografia e medidas de verificação de integridade para evitar alterações ou perdas durante o processo transacional.

8. **Logs e Monitoramento:**
   - Implementar **logs gerais de monitoramento do sistema** e utilizar ferramentas como **Datadog, Elastic Source ou Wazuh** para interpretar os logs da AWS, garantindo uma análise precisa e detecção de atividades suspeitas.

9. **Telegram:**
   - O **Telegram** deve incluir autenticação e **registros de tentativas e sucessos de login**. Quando o vendedor entrar, ele deve usar um código ou senha de acesso. **Registrar eventos de interação com o bot** para auditoria e análise de comportamento.

10. **Streamlit:**
    - Implementar **registros de login do gerente** no Streamlit, assegurando que todas as atividades sejam monitoradas e auditadas para maior segurança.

### Revisão de Planos de Ação:

1. **Reforço na Criptografia:**
   - Além de SSL/TLS e AWS KMS, considere o uso de criptografia específica em camadas de aplicação para proteger dados sensíveis antes mesmo de serem transmitidos ou armazenados.

2. **Políticas de IAM Baseadas em Função:**
   - Para evitar permissões excessivas, agrupe usuários e serviços em funções com políticas de IAM baseadas em função. Isso facilita a administração e garante uma abordagem mais granular.

3. **Auditoria de Segurança Contínua:**
   - Estabelecer uma auditoria contínua de segurança para revisar periodicamente as configurações de segurança e garantir a conformidade com as melhores práticas.

4. **Proteção Adicional para o Chatbot:**
   - Além dos tokens de autenticação, faz-se necessário a implementação de técnicas como rate limiting para evitar abusos e ataques de força bruta no acesso ao chatbot.

Nesse sentido, portanto, destacamos como plano de ação que estão sendo cumpridos, a proteção para o chatbot e auditoria de segurança, além disso, mais políticas de segurança serão implementadas.

### Conclusão:
A implementação desses elementos ajudará a garantir uma abordagem abrangente e resiliente à segurança na arquitetura. Isso não apenas protegerá os dados e os componentes, mas também fortalecerá a postura de segurança geral da solução, alinhando-a com as melhores práticas do mercado e com os requisitos de conformidade regulatória.

### Wireframe agnóstico de Dashboard
No link abaixo é possivel encontrar o wireframe agnóstico bem como a explicação de como se relaciona com a arquitetura.

[Wireframe Agnóstico](https://www.figma.com/design/sQhsczuH3FX3qS8334OLAp/bgc-mod-11_c?node-id=0-1&t=V9px934v50pXbjAE-1)


## Dashboard

Para rodar o front end é necessario
### Dashboard visão do gestor

Para rodar o front
- Entrar na pasta application/frontend
- rodar python -m venv venv
- rodar venv/scripts/activate
- rodar pip install -r requirements.txt
- rodar streamlit run app.py 

### Telegram

Rodar o backend da aplicação e depois acessar o bot pelo telegram, esse é o nome do bot: @InsightCo_bot

### Plano de Tarefas

### Tarefa 1: Análise de Desempenho de Vendas
Suponha que você é o gerente da loja e deseje analisar o desempenho de vendas da sua loja no último mês, use a dashboard para visualizar o total de vendas e o preço médio dos tickets.

### Tarefa 2: Avaliação de Desempenho do Vendedor
Suponha que você é o gerente da loja e queira avaliar o desempenho dos seus vendedores, use a dashboard para acessar e comparar as vendas e metas alcançadas por cada vendedor.

### Tarefa 3: Identificação de Produto Mais Vendido
Suponha que você é gerente da loja e precise identificar os produtos mais vendidos para planejar estoques futuros, use a dashboard para consultar a tabela de produtos mais vendidos.

### Tarefa 4: Comparação entre Lojas
Suponha que você é o gerente da loja e queira comparar o desempenho de diferentes lojas na sua região, use a dashboard para visualizar e comparar o desempenho de cada loja em relação às metas estabelecidas.

### Tarefa 5: Verificação do Progresso de Metas
Suponha que você é o gerente da loja e precise verificar o progresso das metas de vendas da sua loja, use a dashboard para visualizar o gráfico de cumprimento de metas.

### Tarefa 6: Monitorar Cumprimento de Metas
Suponha que você é um vendedor e é fim de mês e você quer verificar o quanto conseguiu atingir das metas estabelecidas. Use o bot do Telegram para verificar o quanto conseguiu atingir das metas estabelecidas.

### Tarefa 7: Verificar Bônus
Suponha que você é um vendedor e quer verificar quanto de bônus um determinado produto te gera. Use o bot do Telegram para calcular o bônus associado à venda desse produto.

### Tarefa 8: Substituição de Produto
Suponha que você é um vendedor e você quer oferecer para o cliente a melhor substituição para um determinado produto que está fora de estoque. Use o bot do Telegram para identificar e recomendar substituições adequadas.

### Tarefa 9 Sugestão de Cross-Sell
Suponha que você é um vendedor e você quer oferecer para o cliente o melhor produto para ele comprar em conjunto com seu pedido atual. Use o bot do Telegram para identificar produtos complementares que podem ser sugeridos juntamente com a compra principal.

No [google sheets ](https://docs.google.com/spreadsheets/d/1EQq2ueKEaeUBY5GlibheMUu2flxBdXyvKBMEIuGAiM0/edit?gid=0#gid=0)
você visualiza o plano de teste com mais detalhes e no template sugerido, pronto para fazer os testes.

### Conexões do Dashboard e telegram com o Plano de Teste

#### Tarefa 1: Análise de Desempenho de Vendas
**Tarefa:** 
- **Seção Relevante:** `Store Perform View`
  - **Dados Relevantes:** `Sales` e `Average ticket price`
- **Descrição:** Esta seção fornece informações sobre o total de vendas e o preço médio dos tickets. Usando esses dados, o gerente pode analisar rapidamente o desempenho de vendas da loja para o mês atual.

#### Tarefa 2: Avaliar Desempenho do Vendedor
- **Seção Relevante:** `Top Sellers`
- **Descrição:** Esta seção lista os vendedores com suas vendas e a porcentagem alcançada das metas. O gerente pode usar essas informações para comparar o desempenho entre os vendedores, permitindo uma gestão focada em melhorias ou recompensas.

#### Tarefa 3: Identificar Produto Mais Vendido
- **Seção Relevante:** `Top Products`
- **Descrição:** Aqui são exibidos os produtos mais vendidos, com dados sobre quantidades vendidas. Essa tabela é crucial para que o gerente planeje os estoques futuros, garantindo disponibilidade dos produtos mais procurados pelos clientes.

#### Tarefa 4: Comparar Lojas
- **Seção Relevante:** `Top Stores`
- **Descrição:** Esta seção mostra uma comparação entre as lojas da região, com informações sobre o desempenho relativo às metas estabelecidas. O gerente pode usar esses dados para avaliar como sua loja está performando em comparação com outras na mesma região.

#### Tarefa 5: Progresso de Metas
- **Seção Relevante:** `Store Perform Chart`
- **Descrição:** O gráfico mostra a progressão diária das vendas ao longo do mês, o que pode ser interpretado como um indicativo do cumprimento das metas de vendas. O gerente pode visualizar se há dias específicos com desempenho acima ou abaixo do esperado, o que ajuda na tomada de decisões estratégicas para os dias restantes do mês.

### Tarefa 6: Monitorar Cumprimento de Metas
- **Opção do Telegram:** "Quanto falta para minha meta?"
- **Descrição:** Esta opção permite ao vendedor verificar rapidamente o quanto já conseguiu atingir de suas metas de vendas estabelecidas para o mês. É útil para o acompanhamento constante do progresso e para planejar esforços adicionais se necessário.

### Tarefa 7: Verificar Bônus
- **Opção do Telegram:** "Quanto de bônus esse produto me gera?"
- **Descrição:** Utilizando esta funcionalidade, o vendedor pode calcular o bônus potencial que pode ganhar com a venda de determinados produtos. Isso ajuda a focar esforços em produtos mais lucrativos.

### Tarefa 8: Substituição de Produto
- **Opção do Telegram:** "Qual produto posso oferecer para o cliente..."
- **Descrição:** Ao selecionar esta opção, o vendedor pode obter sugestões de produtos alternativos ou substitutos para recomendar ao cliente, caso o produto desejado esteja fora de estoque. Essa funcionalidade ajuda a manter a satisfação do cliente e potencializa a realização de vendas mesmo em caso de falta de algum item.

### Tarefa 9: Sugestão de Cross-Sell
- **Opção do Telegram:** "Cross-selling"
- **Descrição:** Esta opção fornece ao vendedor sugestões de produtos complementares que podem ser oferecidos ao cliente juntamente com a compra principal. Esta estratégia aumenta o valor do pedido e melhora a experiência de compra do cliente, oferecendo produtos adicionais que agregam valor.

----
