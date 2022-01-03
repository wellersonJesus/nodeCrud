**CRUD NODE.JS**
-

_[CRUD com Node.JS, Express, TypeORM e PostgreSQL](https://www.youtube.com/watch?v=9AO2hZJsHrs). Teste e validações node.js_


***dATAbASES***
|database|user|loginPostgres
---|---|---|
node_crud|postgres|admin123


- _iNSTALAÇÃO NODE.JS_
    
        node -v
        curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
        sudo apt-get install -y nodejs

- _rEMOÇÃO NODE.JS_
    
        sudo apt-get remove nodejs
        sudo apt-get remove npm   

Em seguida, vá para [/etc/apt/sources.list.de]() remova qualquer lista de nós, se tiver. Então faça um

        sudo apt update
        which node |mostra caminho node
        which npm |

- ***yARN***

        sudo apt install yarn |instalar 
        yarn -v |1.22.17 |mostrar versão
        
        yarn init -y |criar arquivo projeto
        yarn add express |adiciona dependencias
        yarn add typescript ts-node-dev @types/express -D |adiciona dependencias 

        yarn tsc --init |inicia aplicação

        yarn add typeorm reflect-metadata pg
        yarn typeorm

        yarn add uuid | instala bibliotecas uuid
        yarn add @types/uuid -D | Instala as tipagens

        yarn add nodemon -D |loop servidor 
        yarn start | startar

        yarn typeorm migration:run | roda migrations  
        yarn typeorm migration:revert | desfaz a ultima migrations  

        yarn dev |start servidor

- ***mIGRATIOSN***

        rm -rf node_modules
        Yarn cache clean
        yarn typeorm migration:create -n CreateCategories

        yarn typeorm migration:run

- ***eNTIDADES***

        yarn add uuid |adiciona biblioteca uuid
        yarn add @types/uuid -D |adiciona tipagens
       
- ***kILLpROCESSOS***   
     
        sudo netstat -lpn |grep :'3000'
        kill -9 1192

- ***[nODEMON](https://medium.com/@jccamargo15/iniciando-com-nodejs-aula-1-instala%C3%A7%C3%A3o-yarn-e-nodemon-4818d923e9be)*** 

_Esse trecho indica ao yarn que criamos um novo script chamado “start” e quando chamado ele deve executar o nodemon a partir do arquivo principal a aplicação que neste caso é “[index.js]()”._

- ***pOSTGRES***

        sudo apt update | atualiza sistema
        sudo apt install postgresql postgresql-contrib |install pg

        sudo apt --purge remove postgresql | remove pg postgresql-client postgresql-client-common | remove common
        sudo apt autoremove | remove resquicios

