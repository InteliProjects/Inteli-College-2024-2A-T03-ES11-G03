## **Documentação e Arquitetura Versão Incrementada - Projeto de Assistente de Vendas Hiper Personalizado da CosmeticCo**



## **1. Introdução**

### **1.1. Propósito**
Este documento tem como objetivo fornecer uma visão abrangente da arquitetura do sistema para o projeto de assistente de vendas hiper personalizado, desenvolvido para a empresa CosmeticCo. A documentação foi elaborada com base nos padrões de engenharia de software TOGAF e IEEE, e cobre tanto os aspectos técnicos quanto não técnicos do sistema, incluindo governança, segurança e escalabilidade. E busca também aprimorar as versões anteriores com base nos feedbacks recebidos. 

### **1.2. Escopo**
O escopo deste documento inclui a descrição detalhada da arquitetura do sistema, os componentes principais, fluxos de dados e os módulos de software utilizados. Também é destacado os aspectos de governança, segurança e escalabilidade que foram integrados à solução.

### **1.3. Referências**
### Referências de arquitetura
- **TOGAF (The Open Group Architecture Framework)**

[Acesso ao TOGAF](https://www.leanix.net/en/wiki/ea/togaf?utm_term=togaf%20architecture&utm_source=adwords&utm_medium=ppc&utm_campaign=LATIN-AMERICA-BRAZIL_TOGAF_AO_Search_ENG&hsa_ver=3&hsa_cam=21076153865&hsa_grp=164825689812&hsa_acc=2468165327&hsa_kw=togaf%20architecture&hsa_mt=e&hsa_net=adwords&hsa_src=g&hsa_tgt=kwd-10090642913&hsa_ad=692760508724&gad_source=1&gclid=CjwKCAjwxY-3BhAuEiwAu7Y6s0Wpk8ssMpRZ2gYzACAl8rNa48qkUNZ9L42J0kNbzfmK__ves8SSjRoCQWsQAvD_BwE)
- **IEEE Standard 1471-2000: Recommended Practice for Architectural Description of Software-Intensive Systems**

[Acesso ao IEEE Standard 1471-2000](https://standards.ieee.org/ieee/1471/2187/)

---

## **2. Arquitetura do Sistema**

### **2.1. Visão Geral**
A arquitetura do sistema foi projetada para suportar a ingestão, processamento, armazenamento e visualização de dados de forma escalável, eficiente e segura. A solução integra diversas tecnologias para garantir uma performance otimizada, segurança dos dados e comunicação em tempo real com os usuários finais.

#### **2.1.1. Componentes Principais**
- **Ingestão de Dados:** Dados em formato CSV são carregados no Amazon S3, que atua como o ponto de entrada.
- **Processamento de Dados:** Um listener detecta novos arquivos no S3, que são processados e normalizados utilizando Apache Spark.
- **Armazenamento Normalizado:** Os dados processados são armazenados na camada de dados normalizados e gerenciados com ClickHouse.
- **Orquestração de Pipeline:** O Apache Airflow gerencia e orquestra os processos de pipeline, garantindo a execução e transferência dos dados entre camadas.
- **View Cache:** Dados que alimentam as visualizações são armazenados em uma camada de cache, também utilizando o ClickHouse.
- **Serviços Backend:** As instâncias do Amazon EC2 hospedam os serviços de backend que interagem com o banco de dados ClickHouse e são responsáveis por lidar com as requisições dos usuários.
- **Interação com Usuários:** A interface com o usuário é feita através de um bot no Telegram, assim como por uma interface web desenvolvida com Streamlit. A comunicação é intermediada por uma fila de mensagens (RabbitMQ).

---

### **2.2. Diagrama de Arquitetura**
O diagrama abaixo ilustra a arquitetura atualizada do sistema, destacando as camadas de ingestão, processamento, armazenamento e visualização de dados, bem como os serviços de backend e interações com os usuários por meio de bots e interface web.

![Arquitetura do Sistema](./Assets/Copy%20of%20arquitetura_solucao_m11_v2.drawio%20(1).png)
---

### **2.3. Fluxos de Dados**
- **Ingestão:** Dados em formato CSV são carregados no Amazon S3. O listener monitora a chegada dos dados e os envia para processamento.
- **Processamento:** O Apache Spark normaliza os dados, que são armazenados na camada de dados normalizados.
- **Pipeline:** O Apache Airflow gerencia o fluxo de dados para o ClickHouse, onde os dados são armazenados na View Cache.
- **Interação com Usuários:** O backend, hospedado em EC2, processa as requisições enviadas pelo bot do Telegram ou pela interface Streamlit, utilizando o RabbitMQ para comunicação assíncrona entre as diferentes camadas do sistema.

---

## **3. Requisitos**

### **3.1. Requisitos Funcionais**
- **RF01:** O sistema deve permitir a ingestão de dados em formato CSV no S3.
- **RF02:** O sistema deve processar os dados utilizando Apache Spark para normalização.
- **RF03:** O sistema deve armazenar os dados normalizados no ClickHouse.
- **RF04:** O sistema deve permitir a interação dos usuários via bot do Telegram e interface web (Streamlit).


### **3.2. Requisitos Não Funcionais**
- **RNF01:** O sistema deve ser escalável para suportar o aumento do volume de dados.
- **RNF02:** O sistema deve garantir a segurança dos dados em trânsito e em repouso.
- **RNF03:** O sistema deve suportar governança de dados, permitindo controle de acesso e auditoria.

### **3.3. User Stories**
- **US01:** Como gerente de uma loja da CosmeticCo, eu desejo receber relatórios diários que mostrem o progresso das metas de vendas de cada vendedor, para acompanhar o desempenho da equipe em tempo real e ajustar as estratégias de vendas conforme necessário.
- **US02:** Como gerente de uma loja da CosmeticCo, eu desejo receber previsões de estoque com base nas vendas anteriores e nas tendências de demanda, para evitar rupturas de estoque e garantir que os produtos mais vendidos estejam sempre disponíveis.
- **US03:** Como gerente de uma loja da CosmeticCo, eu quero comparar o desempenho da minha loja com outras lojas da rede em termos de vendas e satisfação do cliente, para identificar áreas de melhoria e aplicar as melhores práticas.
- **US04:** Como gerente de uma loja da CosmeticCo, eu quero receber recomendações de alocação de vendedores durante os horários de pico de vendas, para otimizar a cobertura da equipe e maximizar as vendas durante os períodos de maior movimento.
- **US05:** Como vendedor da CosmeticCo, eu quero receber feedback em tempo real sobre minhas vendas diárias e progresso em relação às metas, para ajustar minha abordagem e melhorar meu desempenho.
- **US06:** Como vendedor da CosmeticCo, eu quero receber sugestões automáticas de produtos complementares para oferecer aos clientes, aumentando as vendas cruzadas e melhorando a satisfação do cliente.
- **US07:** Como vendedor da CosmeticCo, eu quero visualizar minha comissão acumulada em tempo real com base nas vendas realizadas, para ter clareza sobre meus ganhos e motivação para atingir minhas metas.
- **US08:** Como vendedor da CosmeticCo, eu quero ter acesso a uma lista com os produtos de maior margem percentual, com o objetivo de aumentar minhas vendas desses produtos e maximizar minha bonificação.

---

## **4. Governança, Segurança e Escalabilidade**

### **4.1. Governança**
- **Política de Acesso:** Implementação de controle de acesso baseado em funções (RBAC) para restringir o acesso aos dados sensíveis.
- **Fluxos de Aprovação:** Definição de processos de aprovação para alterações críticas na infraestrutura de dados.
- **Auditoria:** Log de atividades para auditoria completa do sistema, garantindo rastreabilidade das ações dos usuários.

### **4.2. Segurança**
- **Criptografia:** Utilização de criptografia em repouso para dados armazenados no S3 e criptografia em trânsito para comunicação entre serviços.
- **Autenticação:** Implementação de autenticação multifator (MFA) para acessar o backend e interfaces de administração.
- **Mitigação de Riscos:** Monitoramento contínuo para detecção e resposta a incidentes de segurança.

### **4.3. Escalabilidade**
- **Escalabilidade Horizontal:** Capacidade de adicionar novas instâncias de EC2 para suportar aumento de carga de trabalho sem impactar a performance.
- **Balanceamento de Carga:** Uso de balanceadores de carga para distribuir as requisições de usuários entre diferentes instâncias.
- **Elasticidade:** Capacidade do sistema de ajustar dinamicamente os recursos computacionais com base na demanda.

---

### **Conclusão**
Esta versão da documentação incorpora as mudanças na arquitetura do sistema, e assim, proporciona  uma visão completa das melhorias e da estrutura técnica que compõem o Assistente de Vendas Hiper Personalizado da CosmeticCo.

