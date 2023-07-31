# PM2-CI-CD

Bem-vindo ao repositório do projeto PM2-CI-CD. Este projeto permite a criação de uma integração contínua e a implementação do pipeline entre o Github Webhooks e seu servidor linux. Este projeto foi projetado para ser simples, flexível e fácil de configurar.

---

## Configurações no GitHub

### 1. Acesse o repositório no GitHub

Acesse o repositório que você deseja configurar o webhook.

### 2. Navegue até as configurações do repositório

Clique na aba 'Settings' (Configurações) no menu superior.

### 3. Selecione a opção 'Webhooks'

No menu lateral esquerdo, clique em 'Webhooks'.

### 4. Clique em 'Add webhook' (Adicionar webhook)

No canto superior direito da página de webhooks, você encontrará a opção 'Add webhook'. Clique nela.

### 5. Insira a URL do seu servidor

No campo 'Payload URL', você deve inserir a URL do seu servidor que receberá as solicitações POST.
Aqui deverá ter uma URL pública (nginx) apontando para esta API na rota /webhook.

### 6. Content Type

Escolha application/json

### 7. Secret

Cria uma chave secreta que você irá colocar no seu arquivo .env.

### 8. Selecione o tipo de evento

Você pode escolher receber eventos de 'Just the push event'.

### 9. Clique em 'Add webhook' (Adicionar webhook)

Por fim, clique no botão 'Add webhook' na parte inferior da página.
Pronto! Você configurou com sucesso um webhook no GitHub.

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
pm2 start npm --name pm2-ci-cd -- run api
```
