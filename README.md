[![Build Status](https://travis-ci.com/mixaverros88/dockerized-angular-crud-app.svg?branch=master)](https://travis-ci.com/mixaverros88/dockerized-angular-crud-app)

# Very simple CRUD operations with Angular

![preview image](https://raw.githubusercontent.com/mixaverros88/angular-Rest-Crud/master/icons/docker_overview.jpg)

This example combines 2 containers inside a bridge network. The first container runs the angular app and the other container the json server.

We use the bridge network in order to reach the json server without the IP address but with the container name.

You can use the run.sh file in order to spin up the containers or you can execute the following commands
```
echo "Step 1: run docker json server"
docker run  -d -p 3000:3000 --name fake_server williamyeh/json-server --watch products.json
echo "Step 2: replace the routes.json in to the running container"
docker cp routes.json fake_server:/usr/local/lib/node_modules/json-server/routes.json
docker cp products.json fake_server:/data/products.json
docker cp routes.json fake_server:/data/routes.json
echo "Step 3: run the image "
docker run -d -p 8080:80 --name angular_simple_crud_app mixaverross88/angular-rest-crud
echo "Step 4: create a network"
docker network create --driver bridge isolated_network 
echo "Step 5: Assing the fake_server container into the network"
docker network connect isolated_network fake_server
echo "Step 6: Assing the angular_simple_crud_app container into the network"
docker network connect isolated_network angular_simple_crud_app
```

![preview image](https://raw.githubusercontent.com/mixaverros88/angular-Rest-Crud/master/previewImage.jpg)

# The main purpose of the following instructions is if you don't want to run the project in docker.

Please change the value of URL_PRODUCT_PATH in ProductComponent in localhost:555

## json-server instructions

1. Install server: npm install -g json-server
2. Navigate to the path where json server is installed (json-server-master folder).
3. Replace the file routes.json and add the file products.json (these files are stored in root folder of the project).
4. Run server (in the server folder): json-server --port 555 --routes routes.json --watch products.json 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.


