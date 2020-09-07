# OnlyCheese

An Instagram clone using VueJS, with an OnlyFan side: to follow some accounts you will need coins!

https://onlycheese.web.app/

## Installation

```shell
touch config.json
# needed content:
# const config = {
#     VUE_APP_FIREBASE_API_KEY             : '',
#     VUE_APP_FIREBASE_AUTH_DOMAIN         : '',
#     VUE_APP_FIREBASE_DB_URL              : '',
#     VUE_APP_FIREBASE_PROJECT_ID          : '',
#     VUE_APP_FIREBASE_STORAGE_BUCKET      : '',
#     VUE_APP_FIREBASE_MESSAGING_SENDER_ID : '',
#     BASE_URL                             : '/',
# };
# export default config;
```

```shell
npm i
npm i -g @vue/cli @vue/cli-service-global sass-loader sass
# run with
vue serve src/main.js
```

## Deployment

```shell
# build in dist/
vue build src/main.js
# deploy on firebase
firebase deploy
```