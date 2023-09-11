# Objetivo do Projeto

Desenvolver um sistema de acompanhamento de pacientes em fisioterapia, que permita aos fisioterapeutas cadastrar e monitorar o progresso dos pacientes, e ao paciente em preencher formulários e acompanhar o seu progresso, proporcionando uma experiência de acompanhamento eficiente e eficaz entre o paciente e o fisioterapeuta.

# Escopo:
1. Cadastro de usuários;
    * Fisioterapeutas podem criar contas com informações de login seguras.
    * Fisioterapeutas podem adicionar, editar e remover pacientes associados à sua conta.
2. Painel do Fisioterapeuta:
    * Fisioterapeutas podem:
        * Visualizar uma lista de pacientes associados à sua conta.
        * Adicionar, editar e remover pacientes.
        * Visualizar o progresso de cada paciente através dos formulários preenchidos por cada paciente.
        * Visualizar o histórico de formulários de cada paciente.
3. Painel do Paciente:
    * Pacientes podem:
        * Preencher o formulário sobre o seu progresso.
        * Visualizar o histórico dos formulários preenchidos.
4. Segurança e Privacidade:
    * Implementação de medidas de criptografia e autenticação segura para garantir a segurança dos dados dos pacientes.
    *Garantia de conformidade com regulamentações de privacidade de dados, como a Lei Geral de Proteção de Dados (LGPD).
5. Testes e Validação:
    * Realização de testes unitários e de integração no sistema para assegurar seu funcionamento adequado.
In the project directory, you can run:

# Tecnologias utilizadas
## Frontend
* React: Biblioteca JavaScript para construção de interfaces de usuário.
* React Router: Para lidar com a navegação entre páginas.
* Axios: Biblioteca para realizar requisições HTTP para o servidor.
* HTML e CSS: Linguagens para estruturar e estilizar as páginas.

## Backend
* Node.js: Plataforma JavaScript para construção de aplicações do lado do servidor.
* Express.js: Framework para construir aplicativos web com Node.js.
* MSSQL: Biblioteca para conexão e interação com o SQL Server.
* JWT (JSON Web Tokens): Para autenticação e autorização de usuários.

## Teste e qualidade
* Cypress: Framework de teste de ponta a ponta para testar a interface do usuário.
* SonarQube: Análise estática de código e detecção de problemas de qualidade.


# Metodologia de Organização de Tarefas
Neste projeto, adotaremos a abordagem do FDD (Feature Driven Development) para gerenciar o desenvolvimento de software. O FDD é uma metodologia ágil que se concentra na entrega incremental e iterativa de funcionalidades específicas. Isso nos permite atender de forma eficaz às necessidades do cliente e manter o controle do progresso do projeto.

O FDD divide o desenvolvimento em etapas bem definidas, com ênfase na criação de funcionalidades utilizáveis. Cada funcionalidade é tratada como uma "feature" e passa por um ciclo de vida que inclui o design, desenvolvimento e teste.

A utilização do FDD proporcionará os seguintes benefícios para o projeto:

* Entrega contínua de funcionalidades específicas, garantindo uma abordagem focada nas necessidades do usuário.
* Melhor rastreamento e gerenciamento do progresso do desenvolvimento.
* Maior visibilidade das atividades realizadas.

## Pacotes de entrega
### Pacote 1: Configuração e Infraestrutura
* Configuração do ambiente de desenvolvimento.
* Estruturação do projeto (organização de pastas e arquivos).
* Comunicação entre o backend e frontend.
* Documentação do código.

### Pacote 2: Interação do Paciente
* Criação de formulários para os pacientes preencherem.
* Visualização dos formulários preenchidos pelos pacientes.

### Pacote 3: Gerenciamento de Pacientes
* Cadastro de pacientes.
* Listagem de pacientes.
* Visualização dos formulários preenchidos pelos pacientes.
* Visualização do histórico de cada paciente.


### Pacote 4: Autenticação, Segurança e Qualidade
* Sistema de autenticação seguro.
* Segurança e proteção de dados (cumprimento de regulamentações como LGPD).
* Implementação de testes unitários e de integração.
* Monitoramento de qualidade de código.
* Integração contínua (CI) e integração contínua/desdobramento contínuo (CI/CD).

Para acessar mais informações e detalhes sobre o projeto, como progresso das histórias de usuários, clique no [Board.](https://trello.com/b/kfTzpUDS/tcc)