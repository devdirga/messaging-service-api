# Message-Service-Api

> ExpressJs

> BodyParser

> Pg

## Installation process

1. #### clone the repo using this command
   ```bash
   git clone https://github.com/devdirga/messaging-service-api.git
   ```
2. #### install npm packages
   1. install depedencies
   ```bash
   cd messaging-service-api
   npm install
   ```
3. Setup Database (Postgree).

   ```bash
   cd messaging-service-api
   sudo nano queries.js
   ```

   (ctrl+x to save & nano follow instruction there)

   ```queries.js
   user:YOUR_SQL_USER
   host:YOUR_SQL_HOST
   database:YOUR_SQL_DB
   password:YOUR_SQL_PASSWORD
   port:YOUR_SQL_PORT
   ```

4. CREATE TABLE USERS and MESSAGE

   ```bash

   ```

CREATE TABLE users(
id integer PRIMARY KEY,
name character,
email character
)

CREATE TABLE message(
id integer PRIMARY KEY,
body character varying,
parentid integer,
senderid integer,
receiverid integer,
isread boolean,
createddate time without time zone
)

```

5. Import 'thunder-collection_WhatsappApi.json' to postman or vscode

6. Raise a star to support me
```
