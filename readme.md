# CITi Reactplate

<a href="https://zenhub.com"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>

## Ambiente de Desenvolvimento

0. É necessário ter instalado o [npm](https://www.npmjs.com/get-npm) no seu computador;

1. Crie um diretório configurado com um ambiente virtual, em seguida `pip install Django==2.0.1`;

2. Dentro do ambiente virtual, execute `django-admin startproject your_project_name . --extension py,md --name Procfile --template=https://github.com/CITi-UFPE/citi-reactplate/archive/master.zip`;

3. Execute `pip install -r requirements/development.txt`;

4. Crie um arquivo de nome `.env` (exemplo de formatação [aqui](https://github.com/vitorfs/parsifal/blob/master/.env.example)) na pasta raiz do seu projeto (lembre-se de manter o arquivo fora do controle de versão), contendo as seguintes variáveis:
  * `SECRET_KEY` (obrigatória, você pode gerar uma chave neste [link](http://www.miniwebtool.com/django-secret-key-generator/), certifique-se de que a chave gerada não começa com o caractere !);

5. Execute `python manage.py makemigrations` e `python manage.py migrate`;

6. Feito isso, vá para a pasta `assets`, execute `npm install` e em seguida `npm start`;

7. Na raíz do projeto, execute `python manage.py runserver`. Acesse `http://localhost:8000` para ver o resultado no browser.

## Deployment no Heroku

0. Na pasta `assets` do seu projeto, execute `npm run build`. Em seguida, realize um push para o GitHub;

1. Crie uma nova aplicação através da Dashboard do Heroku;

2. Na aba `Resources` da página do projeto, adicione os seguintes add-ons ao seu projeto:
    * `Heroku Postgres`, para adicionar um banco de dados PostgreSQL;

3. Na aba `Settings` do projeto, clique no botão `Reveal Config Vars` para poder adicionar variáveis de ambiente ao projeto. Adicione as seguintes:
    * `DJANGO_SETTINGS_MODULE` (obrigatória, deve conter o valor `fs_primos.settings.production`);
    * `SECRET_KEY` (obrigatória, a mesma que você gerou em ambiente de desenvolvimento);

4. Na mesma aba, adicione o buildpack de `Python`;

5. Na aba `Deploy`, escolha o método de deployment através do GitHub, fornecendo o nome do repositório do seu projeto no GitHub;

6. Escolha uma branch para deployments automáticos em cada modificação no repositório do GitHub;

7. Clique em `Deploy Branch` para realizar seu primeiro deploy. Caso todos os passos tenham sido realizados corretamente, sua aplicação estará rodando na url indicada pelo Heroku.
