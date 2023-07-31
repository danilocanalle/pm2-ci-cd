# PM2-CI-DI

Bem-vindo ao repositório do projeto PM2-CI-DI. Este projeto permite a criação de uma integração contínua e a implementação do pipeline entre o Github Webhooks e seu servidor linux. Este projeto foi projetado para ser simples, flexível e fácil de configurar.

---

## Arquivo .env

Crie um arquivo .env na raiz do projeto e preencha com os seguintes dados:

```env
PORT=
WEBHOOK_SECRET=
```

#### Onde:

- **PORT:** a porta na qual o servidor deve escutar.
- **WEBHOOK_SECRET:** sua chave secreta para a validação do webhook.

## Arquivo repositories.json

Você deve ter um arquivo repositories.json na raiz do seu projeto. Ele deve ser uma lista de repositórios com o seguinte formato:

```json
[
  {
    "name": "nome-do-repositorio",
    "allowedPushers": ["email@provedor.com"],
    "commands": ["comando1", "comando2", "comando3"],
    "skipFlag": "FLAG"
  }
]
```

#### Onde:

- **name:** é o nome do repositório que você deseja monitorar.
- **allowedPushers:** é uma lista dos endereços de e-mail das pessoas que poderão realizar o auto-deploy.
- **commands:** são os comandos que você deseja executar após cada push no repositório.
- **skipFlag:** é uma string que, se encontrada no início da mensagem de commit, irá fazer com que o deploy seja ignorado para esse push.

Por exemplo, a seguinte configuração monitorará o repositório danilocanalle, permitirá pushs apenas de danilo@mundialeditora.com, executará os comandos ls, mkdir teste, dirrr após cada push, e ignorará o deploy se a mensagem de commit contiver [CI Skip]:

```json
[
  {
    "name": "danilocanalle",
    "allowedPushers": ["danilo@bookplay.com.br"],
    "commands": ["ls", "mkdir test"],
    "skipFlag": "[CI Skip]"
  }
]
```

Isso permite uma maior flexibilidade no controle do processo de deploy, pois agora você pode decidir se deseja ou não fazer o deploy de cada push individualmente.

## Logs

Após cada operação, um arquivo log.txt será gerado na raiz da aplicação, contendo todos os logs de erros e sucessos. Ele pode ser usado para depuração e acompanhamento do estado dos eventos do webhook.

## Iniciando a Aplicação

Para iniciar a aplicação, execute o seguinte comando:

```bash
npm run api
```
