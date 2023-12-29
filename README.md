# Desafio Software Engineer - Backend - Node

## Pré-requisitos

1. Tenha o docker e o docker compose instalados na sua máquina.

## Começando

1. Para rodar localmente, crie um arquivo .env na raiz da pasta seguindo o exemplo do arquivo `.env.example`.
2. Crie um arquivo documents.txt na raiz da aplicação seguindo o exemplo do arquivo `documents.example.txt`, passando todos os CPFs que deseja inserir inicialmente na fila separados por uma quebra de linha cada um (coloque alguns repetidos).

## Rodando a aplicação

Para rodar a aplicação, execute o seguinte comando:

```bash
docker compose up -d
```

A primeira vez que o container da API for criado, o serviço subirá os CPFs do arquivo documents.txt para o RabbitMQ.
Outro container chamado consumer também subirá para consumir as mensagens e as indexará no Elasticsearch, verificando se a mesma já existe no Redis.

## Principais pastas

### `queue/`

Pasta que contém os arquivos de sender e consumer da fila.

-   O arquivo `send-initial-documents.ts` contém a lógica que sobe os CPFs iniciais do arquivo documents.txt.
-   O arquivo `consume-document-messages.ts` contém a lógica do consumidor da fila, na qual é um container separado responsável somente por consumir as mensagems do RabbitMQ, colocar a mensagem no Redis e indexa-lá no Elasticsearch.

### `public/`

Pasta responsável por conter o arquivo estático `index.html` na qual fica a simples interface WEB para se inserir um CPF.

### `src/`

Pasta principal do backend do projeto. Nela está localizada toda o sistema necessário para a construção da API e serviços da fila.

#### `src/application`

Subpasta na qual estão localizadas as factories e a lógica dos casos de uso da aplicação.

#### `src/domain`

Subpasta na qual ficam as interfaces de entidades e interfaces de casos de uso da aplicação.

#### `src/infrastructure`

Subpasta na qual ficam as lógicas de implementação das entidades da aplicação.

#### `src/presentation`

Subpasta na qual ficam as rotas e controllers da aplicação.

#### `src/utils`

Subpasta na qual ficam as funcionalidades comuns à toda aplicação.

#### `src/validations`

Subpasta na qual ficam as validações da aplicação.

## Endpoints

-   Obtém os dados de um CPF - GET `/scraping?document={cpf}`
-   Expõem uma interface WEB para consultar o CPF (chama o endpoint de obter dados de um CPF) - GET `/get-data`

O endpoint de consulta de CPF trabalha somente com CPFs reconhecidos pela API fornecida. Todavia vale ressaltar que o sistema funciona normal para CPFs não reconhecidos (manda para a fila, é consumida pela mesma e verifica seus dados na API externa), porém o mesmo não dá um feedback na interface WEB pois o processamento é feito separadamente no container do consumer e não foi feito um sistema de Websocket por exemplo para informar erro quando não há dados do CPF na API externa. A mensagem é somente enviada para a fila e consumida.

Dito isto, para testar o fluxo de indexar o CPF no Elasticsearch fora do processamento inicial, é recomendado inserir um CPF válido do sistema externo e que não foi colocado no arquivo `documents.txt`.

## Notas

O log do container do consumer informa em tempo real quando uma mensagem é processada pelo serviço. Para sua visualização rode o comando:

```bash
docker logs -f consumer
```
