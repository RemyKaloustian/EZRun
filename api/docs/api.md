# API Documentation

## `POST` **/** 

Here you can send data to the api. 

#### Data expected `JSON`
* __walkTime__: walk time, in seconds.
* __startPosition__: where the run started, longitude and latitude comma-separated.
* __endPosition__: where the run ended, longitude and latitude comma-separated.
* __udid__: the Unique Device ID.

#### Data Example `JSON`
```json
INPUT:

{
  "walkTime": 30,
  "startPosition": "40.567452,41.4694850",
  "endPosition": "39.567452,42.784850"
  "udid": "1234567890"
}
```

```json
OUTPUT:

{
  "level": "Facile"
}
```
---

Developped by Adrian PALUMBO