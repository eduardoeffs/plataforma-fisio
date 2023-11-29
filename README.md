# Objetivo do Projeto

Desenvolver um sistema de acompanhamento de pacientes em fisioterapia, que permita aos fisioterapeutas cadastrar e monitorar o progresso dos pacientes, e ao paciente em preencher formulários e acompanhar o seu progresso, proporcionando uma experiência de acompanhamento eficiente e eficaz entre o paciente e o fisioterapeuta.

# Escopo:
1. Cadastro de usuários;
    * Fisioterapeutas podem criar contas para os pacientes com informações de login seguras.
2. Painel do Fisioterapeuta:
    * Fisioterapeutas podem:
        * Visualizar uma lista de pacientes associados à sua conta.
        * Adicionar e remover pacientes.
        * Visualizar o progresso de cada paciente através dos formulários preenchidos por cada paciente.
        * Editar ou remover um relatório que foi preenchido incorretamente.
3. Painel do Paciente:
    * Pacientes podem:
        * Preencher o formulário sobre o seu progresso.
        * Visualizar o histórico dos formulários preenchidos.
        * Editar ou remover um relatório que foi preenchido incorretamente.
4. Segurança e Privacidade:
    * Implementação de medidas de criptografia segura para garantir a segurança dos dados dos pacientes.
5. Testes e Validação:
    * Realização de testes unitários e de integração no sistema para assegurar seu funcionamento adequado.

[Diagrama de Classe.](https://github.com/eduardoeffs/plataforma-fisio/blob/master/docs/diagrama-de-classe/diagrama-de-classe.jpg)
</br>

[Fluxo.](https://github.com/eduardoeffs/plataforma-fisio/blob/master/docs/diagrama-de-fluxo/fluxo.jpg)


# Tecnologias utilizadas
## Frontend
* React: Biblioteca JavaScript para construção de interfaces de usuário.
* React Router: Para lidar com a navegação entre páginas.
* Axios: Biblioteca para realizar requisições HTTP para o servidor.
* HTML e CSS: Linguagens para estruturar e estilizar as páginas.
* Bulma: Framework de CSS.

## Backend
* Node.js: Plataforma JavaScript para construção de aplicações do lado do servidor.
* Express.js: Framework para construir aplicativos web com Node.js.
* MongoDB: Sistema de gerenciamento de banco de dados não relacional.
* Atlas: Biblioteca para conexão e interação com o SQL Server.
* Bcrypt: Método de criptografia do tipo hash para senhas.
* Postman: Testes da APIs.

## Teste e qualidade
* React Testing Library: É um conjunto de utilitários que facilitam as consultas à DOM exatamente como um usuário faria
* Jest: Framework de Testes em JavaScript com um foco na simplicidade.
* Supertest: É utilizado para testes de chamadas HTTP REST, possibilitando testar requisições do tipo GET, POST, PUT, DELETE e PATCH.
* SonarCloud: Análise de qualidade do código fonte, cobertura dos testes.

# Requisitos do projeto
## Requisitos funcionais:
1. Cadastro de Usuários:
    * RF1: Fisioterapeutas podem criar contas para os pacientes com informações de login seguras.
2. Painel do Fisioterapeuta:
    * RF2: Fisioterapeutas podem visualizar uma lista de pacientes associados à sua conta.
    * RF3: Fisioterapeutas podem adicionar, editar e remover pacientes.
    * RF4: Fisioterapeutas podem visualizar o progresso de cada paciente através dos formulários preenchidos por cada paciente.
    * RF5: Fisioterapeutas podem editar ou remover um relatório que foi preenchido incorretamente.
3. Painel do Paciente:
    * RF6: Pacientes podem preencher o formulário sobre o seu progresso.
    * RF7: Pacientes podem visualizar o histórico dos formulários preenchidos.
    * RF8: Pacientes podem editar ou remover um relatório que foi preenchido incorretamente.
## Requisitos Não Funcionais:
1. Segurança e Privacidade:
    * RNF1: Implementação de medidas de criptografia para garantir a segurança dos dados dos pacientes.
    * RNF2: Autenticação segura para acesso ao sistema.
2. Desempenho:
    * RNF3: O sistema deve responder de forma rápida e eficiente, mesmo com um grande número de usuários e registros.
3. Usabilidade:
    * RNF4: A interface do usuário deve ser intuitiva e de fácil navegação para fisioterapeutas e pacientes.
4. Manutenibilidade:
    * RNF5: O código deve ser bem organizado e documentado para facilitar futuras atualizações e manutenções.
5. Testes e Validação:
    * RNF6: Realização de testes unitários e de integração no sistema para assegurar seu funcionamento adequado.


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
* Documentação do projeto.

### Pacote 2: Interação do Paciente
* Criação de formulários para os pacientes preencherem.
* Visualização dos formulários preenchidos pelos pacientes.

### Pacote 3: Gerenciamento de Pacientes
* Cadastro de pacientes.
* Listagem de pacientes.
* Visualização dos formulários preenchidos pelos pacientes.
* Edição e remoção dos fomrulários preenchidos pelos pacientes.


### Pacote 4: Autenticação, Segurança e Qualidade
* Sistema de autenticação seguro.
* Implementação de testes unitários e de integração.
* Monitoramento de qualidade de código.
* Integração contínua (CI) e integração contínua/desdobramento contínuo (CI/CD).


Para acessar mais informações e detalhes sobre o projeto e cobertura de testes, clique nos links abaixo: </br>
[Board](https://trello.com/b/kfTzpUDS/tcc) </br>
[SonarCloud](https://sonarcloud.io/summary/overall?id=eduardoeffs_plataforma-fisio) </br>
[Monitoramento](https://github.com/eduardoeffs/plataforma-fisio/blob/master/docs/monitoramento/monitoramento.jpg)

## Infaestrutura
* Frontend: Vercel
* Backend: Azure
* Banco de Dados: Atlas
* CI/CD: Github Actions

# Acesso da aplicação em produção
https://plataforma-fisio.vercel.app/

* Login do Fisioterapeuta:
     * Username: eduardofisio
     * Senha: fisio123
* Login do Paciente:
     * Email: eduardoeffs@gmail.com
     * Senha: dudu123
# Para contribuir com o projeto
Se você deseja contribuir para o projeto Sistema de Acompanhamento Fisioterapêutico, seja para implementar novas funcionalidades, corrigir bugs ou para estudos acadêmicos, siga os passos abaixo. Não esqueça de abrir um Pull Request para que possamos revisar e discutir suas mudanças.

## Configuração Inicial

1. Faça o clone do repositório:
   * git clone https://github.com/seu-usuario/sistema-acompanhamento-fisio.git
2. Instale as dependências do projeto utilizando `npm`:
   * npm install
## Executando o Projeto
1. Para iniciar o servidor do back-end, execute:
   * node server/start.js
   * Certifique-se de ter o MongoDB rodando localmente ou configurado corretamente se estiver utilizando um serviço na nuvem.
2. Para iniciar o cliente React, utilize:
   * npm run start-react
   * O cliente ficará disponível em `http://localhost:3000`.
  
## Testes

Para executar os testes do back-end e do front-end:
   * npm run test

Para verificar a cobertura dos testes:
   * npm run test:coverage

## Banco de Dados

Este projeto utiliza o MongoDB. Para configurar o banco de dados:

1. Instale o MongoDB localmente ou crie uma instância em um serviço de hospedagem de bancos de dados.
2. Configure a string de conexão no arquivo `start.js` ou em suas variáveis de ambiente.

## Pull Requests

1. Crie uma nova branch a partir da `master` para suas alterações.
2. Faça commit das suas mudanças com mensagens claras e descritivas.
3. Suba a branch para o repositório e abra um Pull Request detalhando as mudanças realizadas.
