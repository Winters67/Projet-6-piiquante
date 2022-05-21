# Frontend

pour installer le frontend :

Il faudra avoir la partie front clonable sur https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

cibler le repertoire frontend dans votre éditeur de code et taper à l'invite de la console  : npm install ou npm i

Aprés l'installation lancer le front avec la commande : npm run start

http://localhost:4200/login



# Backend

## Installation

Installation de package avec npm install ou npm i

Dépendances :

```bash
  npm i express
  npm i --save mongoose
  npm i --save mongoose-unique-validator
  npm i --save dotenv
  npm i --save bcrypt
  npm i --save jsonwebtoken
  npm i --save multer

```

Dépendances Dév:

```bash
  npm i --save-dev nodemon
```

Résumé :

- express
- mongoose
- mongoose-unique-validator
- dotenv
- nodemon
- bcrypt
- jsonwebtoken
- multer


# Variable d'environnement

Dans mon projet j'ai utilsé les variables d'environnements.

Pour ce projet , le fichier .env est fournie

```


DB_USERNAME = 'Utilisateur sur MangoDB'
DB_PASSWORD = 'Password associé à l'utilisateur'


```

# Routes

Fonctionneront lorsque le serveur sera lancé avec node server ou nodemon server

Pour s'inscrire (route POST):
http://localhost:3000/api/auth/signup

Pour se connecter (route POST):
http://localhost:3000/api/auth/login

Pour retrouver les sauces (route GET):
http://localhost:3000/api/sauces

Pour retrouver une sauce en particulier, le modifier ou le supprimer (routes GET, PUT et DELETE) :
http://localhost:3000/api/sauces:id
