# EZRun API

### Requirements

* **PHP** >= 5.6.4
* **Composer** >= 1.4
* **Memcached**

---
### Running the API

The API based on Lumen Framework (Laravel little brother).

First, you must have a MySQL database running somewhere _(maybe 127.0.0.1, port 3306 ?)_.
To specify this database, and set up the API, you must rename the `.env.example` file to `.env`, at the root of the API folder.

Then, you must fill these fields inside the file: 
 ```javascript
 DB_HOST=
 DB_PORT=
 DB_DATABASE=
 DB_USERNAME=
 DB_PASSWORD=
 ```

After that, you can launch the API with the script _(you need **PHP** and **Composer** to run the API - assuming you're located at the root of the API folder)_:
 
 ```bash
  $ > ./scripts/run.sh
  ```
 The api will be listening on `http://localhost:8080/` by default, unless you pass one argument to the script corresponding to the port number.
 
 ### Documentation
 
 The documentation is available here : [API Doc](./docs/api.md)


---

Developped by Adrian PALUMBO