# API Documentation

## `POST` **/** 

Here you can send data to the api. 

Data expected to be in JSON format. JSON returned.

#### Data expected
* __walkTime__: walk time, in seconds.
* __startPosition__: where the run started, longitude and latitude comma-separated.
* __endPosition__: where the run ended, longitude and latitude comma-separated.

#### Data Example
```json
INPUT:

{
  "walkTime": 30,
  "startPosition": "40.567452,41.4694850",
  "endPosition": "39.567452,42.784850"
}
```

```json
OUTPUT:

{
  "walkTime": 30
}
```
---

Developped by Adrian PALUMBO