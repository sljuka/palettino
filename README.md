# Palettino

a hastily made color palette manager :)

# Instructions

Run Mongo instance (most convinient via docker)

```
mkdir ~/data
docker run -d -p 27017:27017 -v ~/data:/data/db mongo
```

Install dependencies

`yarn install`

Create database and collection

`yarn setupDB`

Start the server

`yarn start`

go to `localhost:3000` on browser
