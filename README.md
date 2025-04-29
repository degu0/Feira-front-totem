Instruções para Rodar o Projeto

1. Instale o Node.js
Baixe e instale o Node.js no seu computador:
https://nodejs.org/


2. Verifique se o Node foi instalado corretamente
Abra o terminal (CMD, PowerShell ou Terminal do VS Code) e digite:

node --version

Se aparecer a versão do Node, continue.
Se não aparecer, tente reinstalar o Node.js.


3. Clone o repositório
No terminal, digite:

git clone url-do-repositorio

(Substitua url-do-repositorio pela URL real do seu repositório.)


4. Abra o projeto no VS Code
Abra a pasta clonada no VS Code.
Depois, abra o terminal integrado (Ctrl + `) e digite:

npm install

ou

npm i


5. Instale o JSON Server
Ainda no terminal, digite:

npm i json-server


6. Inicie o projeto
Em um terminal, execute:

npm run dev

Abra um novo terminal e rode o servidor JSON:

json-server --watch DB.json --port 3000
