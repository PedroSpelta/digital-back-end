# Digital Republic Back End Challenge

This project is a challenge made by digital republic to a selection process.
Technologies used:
- Node.js (Runtime)
- TypeScrypt (Programming language)
- Express.js (API frame work)
- Mocha (Tester)
- JWT (Authenticate)
- Sinon (Mock in test)

The objetive was to build an API REST that could:
- Open an account with only a CPF and the person name;
- Transfer to another account;
- Do not accept negative value on accounts;
- Deposit transaction should not be greater than R$2.000,00;
- Transactions between accounts should be limitless and free of charge;

## Preview

Preview the example live on [Heroku](https://spotify.spelta.dev/):

## Instalation and Setup Instructions

Clone down this repository. You will need node, node-ts, npm and mongoDB installed globally on your machine.

### Installation:

```
git clone git@github.com:PedroSpelta/digital-back-end.git
```
```
cd digital-back-end
```
```
npm install
```

### Setup:

Create a .env on the project:

```
touch .env.local
```

You will need it on the app with the following variables:
- PORT, might be any port you want to run
- MONGO_DB_STRING, need to be a string to connect to the mongoDB
- MONGO_DB_NAME, need to a string with the name of you database on mongo


## Running:
```
npm run dev
```
Make requests to the local with the port you specified
```
http://localhost:PORT/user/login
```

## Testing:
```
npm run test
```
