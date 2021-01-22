# Spotify Test Backend
you can try a live demo in [Track Search](http://165.227.76.8:8000/search?q=What%20you%20know&limit=20&page=1)
or
[Track Info](http://165.227.76.8:8000/track/7ge0ABF3ud7cftHDnsID0Q)

## Installation

```bash
$ npm install
```

## Environment
Look at the .env example, then create .env file
```dotenv
PORT=your-port
SPOTIFY_TOKEN_API=https://accounts.spotify.com/api/token
CLIENT_ID=84588d7fe6c44a0886c5e5be3ba0e36b
CLIENT_SECRET=1a87f76d20a2475fb999f8e914f30364
SPOTIFY_REFRESH_TOKEN=AQDuEbL-uRuL5uCXivKI42FglOSw9BFgM3AYM4xJhN1ByQpMsmsR4Hd3n186Fzi5UKXZUnQNiRsv2p4qBdzfcDWDXSQKOzeK8ZnTljdLqNJB4odN_kEumciDqIFr_da8K74
SPOTIFY_ENDPOINT=https://api.spotify.com/v1
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
100% coverage test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Stay in touch

- Author - [Daniel Viloria](https://github.com/davp00)
- LinkedIn - [https://www.linkedin.com/in/daniel-viloria-perez-17434016b/](https://www.linkedin.com/in/daniel-viloria-perez-17434016b/)
