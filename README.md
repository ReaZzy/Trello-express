<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Compare express and fastify
⠀            |Meaning                           | Express       | Fastify
------------ |--------------------------------- | ------------- | -------------
Requests     | [total, rate, throughput]        | 100, 100, 100 | 100, 100, 100
Duration     | [total, attack, wait]            | 100, 100, 100 | 100, 100, 100
Latencies    | [min, mean, 50, 90, 95, 99, max] | 100, 100, 100 | 100, 100, 100
Success      | [ratio]                          | 100, 100, 100 | 100, 100, 100
Status Codes | [code:count]                     | 100, 100, 100 | 100, 100, 100

## Installation

```bash
$ npm install
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

## Running the app with docker

```bash
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test

# auth tests
$ npm run test:auth
```
