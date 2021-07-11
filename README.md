<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Compare express and fastify
⠀            |Meaning                           | Express                             | Fastify
------------ |--------------------------------- | ----------------------------------- | -------------
Requests     | [total, rate, throughput]        | 500, 100%                           | 500, 100%
Duration     | [total, attack, wait]            | 10s.                                | 10s.
Mean response| [sec]                            | 30.21s.                             | 23.64s.
Latencies    | [min, mean, max]                 | 9ms., 1674.5ms., 6295ms.            | 9ms., 1691.5ms., 6549ms.
Success      | [ratio]                          | 500                                 | 500
Status Codes | [code:count]                     | `200`: 300, `201`: 100, `204`: 100  | `200`: 300, `201`: 100, `204`: 100
                                                                        

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
