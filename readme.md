# Mutants
### _The technology for the next human evolution to win_
---
Allows to validate a DNA to distinguish if it is a mutant or not, allowing manegto to get candidates for his army and to face the X-men.

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install
npm run dev
```
For production environments...

```sh
npm install
npm run tsc
npm run start:prod
```

## Features

- Detects a mutant sequence in DNA
- Indicates statistics for mutants and non-mutants

## Use
The REST API to the example app is described below.

### Mutants
For consulting the statistics for mutants 
### _Request_
`POST /api/mutant`
```json
    {
        "dna":["ATGCGA","CGGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
    }
```
### _Response_
200-OK
```
    Es un mutante
```
403-Forbidden
```
    No es un mutante
```
400-Bad-Request
```
    Debe proporsionar un ADN
```
400-Bad-Request
```
    La secuencia de adn no es correcta
```
### Stats
For consulting the statistics for mutants 
### _Request_
`GET /api/stats`
### _Response_
HTTP/1.1 200 OK
 ```json
    {
        "count_human_dna":8094,
        "count_mutant_dna":7413,
        "ratio":0.9158636026686434
    }
```
## Demo

### API
- For Stast http://3.14.5.171/api/stats
- For Mutant http://3.14.5.171/api/mutant