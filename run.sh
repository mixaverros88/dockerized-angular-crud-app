#!/usr/bin/env bash
echo "Step 1: run docker json server"
docker run  -d -p 3000:3000 --name fake_server williamyeh/json-server --watch products.json
echo "Step 2: replace the routes.json in to the running container"
docker cp routes.json fake_server:/usr/local/lib/node_modules/json-server/routes.json
docker cp products.json fake_server:/data/products.json
docker cp routes.json fake_server:/data/routes.json
echo "Step 3: run the image "
docker run -d -p 8080:80 --name angular_simple_crud_app mixaverross88/angular-rest-crud:1.3
echo "Step 4: create a network"
docker network create --driver bridge isolated_network 
echo "Step 5: Assing the fake_server container into the network"
docker network connect isolated_network fake_server
echo "Step 6: Assing the angular_simple_crud_app container into the network"
docker network connect isolated_network angular_simple_crud_app
