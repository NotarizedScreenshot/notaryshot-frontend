# notaryshot-frontend

The amazing Notarized Screenshot UI is here. Generate a certified copy of what you can see on your screen

## Before run

Add .env file and define storage gateway (ipfs for default):

```
REACT_APP_STORAGE_GATEWAY=https://ipfs.io/ipfs/
```

## Dev Run

Firstly run external adapter localy on port 9000, or remove proxy from package.json:

```
  "yup": "^1.0.0"},

  "proxy": "http://localhost:9000",

  "scripts": {
```

Then run frontend (port 3000):

```
nvm use 16
yarn install
yarn start
```

## Build

```
nvm use 16
yarn install
yarn build
```

## Extension dev run

```
nvm use 16
yarn install
yarn ext:dev
```

## Extension build

```
nvm use 16
yarn install
yarn ext:dev
```

the extension is available in ./build-ext
