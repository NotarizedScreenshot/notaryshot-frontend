# notaryshot-frontend

The amazing Notarized Screenshot UI is here. Generate a certified copy of what you can see on your screen

## Before run

Add .env file and define storage gateway (ipfs for default):

```
REACT_APP_STORAGE_GATEWAY=https://ipfs.io/ipfs/
```

## Dev Run

Run the external adapter locally on port 9000
* edit [docker-compose.yml](docker/docker-compose.yml), put your Twitter details in
```yaml
    environment:
      - TWITTER_USERNAME=@XXXXXX_FIXME #put your actual Twitter username here
      - TWITTER_PASSWORD=XXXXXXXXXXXXX_FIXME
      - TWITTER_EMAIL=XXXXXXXXXX@MY_MAIL_DOMAIN_FIXME 
```
* then run it
```shell
docker compose version 
: Docker Compose version 2.20.2

cd docker
docker compose pull
docker compose up
:
:[+] Running 4/4
: ✔ Network notaryshot-frontend_default                 Created                                                                          0.0s 
: ✔ Container notaryshot-frontend-redis-1               Created                                                                          0.1s 
: ✔ Container notaryshot-frontend-chrome-1              Created                                                                          0.1s 
: ✔ Container notaryshot-frontend-notaryshot-adapter-1  Created 
: ...
:notaryshot-frontend-chrome-1              | Happy coding!
:notaryshot-frontend-chrome-1              | 
:notaryshot-frontend-chrome-1              | 
:notaryshot-frontend-notaryshot-adapter-1  | server started on port 9000
```
or edit the proxy desination in package.json:

```json
  "yup": "^1.0.0"},

  "proxy": "http://localhost:9000",

  "scripts": {
```

* then run the frontend:

```shell
nvm use 16
yarn install
yarn start
```
port 3000 is by now taken by `browserless/chrome`, so it will be different


## Build

```shell
nvm use 16
yarn install
yarn build
```

## Extension dev run

```shell
nvm use 16
yarn install
yarn ext:dev
```

## Extension build

```shell
nvm use 16
yarn install
yarn ext:dev
```
find the extension build result in ./build-ext
