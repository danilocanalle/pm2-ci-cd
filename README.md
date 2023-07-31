PM2-CI-DI
Bem-vindo ao repositório do projeto PM2-CI-DI. Este projeto permite a criação de uma integração contínua e a implementação do pipeline. Este projeto foi projetado para ser simples, flexível e fácil de configurar.

Configuração
Primeiro, clone o repositório para a sua máquina local:

bash
Copy code
git clone https://github.com/danilocanalle/pm2-ci-di.git
cd pm2-ci-di
Instale as dependências necessárias:

bash
Copy code
npm install
Crie um arquivo .env na raiz do projeto:

bash
Copy code
touch .env
No arquivo .env, defina as seguintes variáveis:

env
Copy code
PORT=porta_para_o_servidor
WEBHOOK_SECRET=segredo_para_o_webhook
Adicione a lista de repositórios no arquivo repositories.json na seguinte forma:

json
Copy code
[
{
"name": "nome_do_repositório",
"allowedPushers": ["email1", "email2"],
"commands": ["comando1", "comando2", "comando3"]
}
]
Iniciando a Aplicação
Para iniciar a aplicação, execute o seguinte comando:

bash
Copy code
npm run api
Log.txt
Um arquivo log.txt será gerado na raiz da aplicação que registra todos os logs de sucesso e erro das builds. Este arquivo de log pode ser útil para solução de problemas e verificação do progresso das builds.

Contribuição
Sinta-se à vontade para contribuir com este projeto, seja através de pull requests ou relatórios de problemas.

Licença
Este projeto está licenciado sob a licença MIT.
