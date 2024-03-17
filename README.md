# # Teste de Backend com Node.js, Express, e Typescript

## Introdução

Este documento tem como objetivo fornecer uma visão geral do projeto de backend desenvolvido como parte de um teste técnico. A aplicação é uma API RESTful construída com Node.js, Express e TypeScript e permite o registro de usuários e criação de posts por usuários autenticados.


## Arquitetura do Projeto

Este projeto adota uma arquitetura orientada a recursos, o que significa que cada recurso do sistema (como `usuários` e `posts`) é organizado em um módulo separado que encapsula todas as funcionalidades relacionadas. Essa estrutura facilita a adição de novos recursos e a manutenção do código existente. A seguir, detalhamos os componentes de cada recurso:

- `Entidades`: São as classes que modelam o domínio do negócio e correspondem a tabelas no banco de dados.
- `UseCases`: Contêm a lógica de negócio específica para cada recurso, promovendo a reutilização de código e facilitando testes.
- `Repositórios`: Abstraem toda a lógica de acesso ao banco de dados, permitindo que os use cases interajam com a base de dados de maneira indireta.
- `Controladores`: São responsáveis por receber as requisições HTTP, delegar a execução dos casos de uso e retornar as respostas ao cliente.
- `Rotas`: Definem os endpoints da API vinculados aos métodos dos controladores, organizados de acordo com o recurso que representam.

Cada recurso possui seu próprio diretório dentro do projeto, e dentro dele, estão organizados subdiretórios para entidades, casos de uso, repositórios, controladores e rotas. Esta abordagem garante uma organização clara e uma separação de responsabilidades, otimizando o desenvolvimento e facilitando a escala da aplicação.

Para exemplificar:

- `src/resources/user/`
  - `entities/`: Modelo de dados do usuário.
  - `useCases/`: Lógica para criação, autenticação e outras operações relacionadas ao usuário.
  - `repositories/`: Abstração do acesso aos dados do usuário.
  - `controllers/`: Pontos de entrada para as requisições relacionadas a usuários.
  - `routes/`: Definições de rotas HTTP para operações do usuário.
- `src/resources/post/`
  - `entities/`: Modelo de dados do post.
  - `useCases/`: Lógica para criação e gerenciamento de posts.
  - `repositories/`: Abstração do acesso aos dados do post.
  - `controllers/`: Pontos de entrada para as requisições relacionadas a posts.
  - `routes/`: Definições de rotas HTTP para operações do post.

Esta arquitetura foi escolhida por promover a modularidade e a agilidade no desenvolvimento, já que adicionar um novo recurso ou modificar um existente se torna uma tarefa de gerenciamento de um módulo específico, sem efeitos colaterais no resto da aplicação.


## Configuração e Execução

### Pré-requisitos

- Docker
- Docker Compose
- MongoDB

### Instruções

Para configurar e executar o projeto localmente, siga os passos abaixo:

1. Clone o repositório Git para o seu ambiente local.
2. Navegue até a raiz do projeto e adicione as variáveis de ambiente em um arquivo .env, siga como exemplo o arquivo .env.example 
3. Execute o comando `docker compose up`.

## Cadastro de Usuários

O endpoint para cadastro de novos usuários é `POST /users/`. Os usuários devem fornecer um `nome`, `email` e `senha`.

## Autenticação

O endpoint para autenticação de usuários é `POST /users/login`. Um token JWT é gerado e retornado para o usuário.

## Criação de Posts

Usuários autenticados podem criar posts enviando uma requisição `POST /posts` com um `title` e `content` de texto.

## Testes Unitários

Os testes unitários são implementados com Jest. Para executá-los, utilize o comando `npm test`.

## Pontos a melhorar:
    
2.  **Validação de Entradas**: Adicionar mais verificações nos controllers
    
3.  **Gerenciamento de Erros**: Modularizar o gerenciamento de erros criando classes de Erros e suas derivadas.
    
4.  **Documentação da API**: Melhorar a documentação SWAGGER
    
5.  **Monitoramento e Logging**: Adicionar libs de logging e healthcheck    
6.  **Testes**: Aumentar a cobertura de testes, incluindo testes de integração e testes de carga além de aumentar a cobertura de testes.
    
7.  **Performance**: Realizar uma análise de desempenho para identificar gargalos e otimizar o código para operações mais rápidas, especialmente se estiver trabalhando com grandes conjuntos de dados.
    
8.  **Automação do CI/CD**: Configurar uma pipeline de integração contínua e entrega contínua (CI/CD) para automatizar testes e deployment.
9. 
10.  **Caching**: Implementar caching onde apropriado para melhorar a velocidade de resposta da API.
    
11.  **Internacionalização e Localização (i18n e l10n)**
   