💻 Gestão de Produtos - Front-End (Angular)

Este repositório contém a interface de usuário (Front-End) do sistema de Gestão de Produtos, desenvolvida durante o Bootcamp. Esta aplicação consome uma API RESTful desenvolvida em .NET (disponível em outro repositório) para realizar operações de gerenciamento de dados.

🚀 Tecnologias Utilizadas

Angular 18+: Framework principal em modo standalone (sem ngModules).

TypeScript: Linguagem base para a tipagem e lógica de componentes.

RxJS / HttpClient: Para chamadas assíncronas e consumo da API.

HTML5 & CSS3: Interface responsiva construída com estilização moderna em Dark Mode.

⚙️ Funcionalidades e Integrações

A interface está totalmente integrada com a API Back-End, realizando as operações do CRUD:

Listagem (GET): Carregamento automático da tabela ao abrir a página, utilizando ChangeDetectorRef para atualização em tempo real.

Busca por ID (GET): Pesquisa de produtos individuais validada diretamente na tela.

Criação (POST): Formulário interativo para adição de novos produtos.

Edição (PUT): Sistema de edição inline que envia o objeto atualizado (incluindo o ID) para a base de dados de forma assíncrona.

Remoção (DELETE): Exclusão de itens com reflexo instantâneo na tabela.

🔗 Dependência do Back-End

Para que este projeto funcione perfeitamente, é necessário que a API em .NET esteja rodando simultaneamente na sua máquina local.

Repositório da API: MinhaPrimeiraApi

A API deve estar respondendo no endereço: http://localhost:5294

🛠️ Como executar este projeto localmente

Pré-requisitos:

Node.js instalado.

Angular CLI instalado globalmente (npm install -g @angular/cli).

Passo a passo:

Clone este repositório:

git clone https://github.com/RenataAires/NOME_DO_SEU_REPOSITORIO.git


Acesse a pasta do projeto:

cd produtos-front


Instale as dependências:

npm install


Execute o servidor de desenvolvimento:

ng serve


Abra o seu navegador e acesse: http://localhost:4200