echo "Step 1: assign the docker machine ip to variable"
docker_machine_ip=$(docker-machine ip);
echo "Step 2: create a json file with the ip of the fake server in order to inject into the angular project"
echo '[{ "url":"'$docker_machine_ip:3000'"}]' > fake_server_ip.json
echo "Step 3: download the project"
git clone https://github.com/mixaverros88/angular-Rest-Crud
echo "Step 4: get in to project folder"
cd angular-Rest-Crud
echo "Step 5: download the dependecies"
npm install
echo "Step 6: move json file to assets"
mv ../fake_server_ip.json ./src/assets
echo "Step 7: build the project"
ng build
echo "Step 8: build the docker image" 
docker build -t angular_simple_crud .
echo "Step 9: run docker json server"
docker run  -d -p 3000:3000 --name fake_server williamyeh/json-server --watch products.json
echo "Step 10: replace the routes.json in to the running container"
docker cp routes.json fake_server:/usr/local/lib/node_modules/json-server/routes.json
docker cp products.json fake_server:/data/products.json
docker cp routes.json fake_server:/data/routes.json
echo "Step 11: run the image "
docker run -d -p 8080:80 --name angular_simple_crud_app angular_simple_crud
echo "Step 12: create a network"
docker network create --driver bridge isolated 
echo "Assing the fake_server container into the network"
docker network connect isolated fake_server
echo "Assing the angular_simple_crud_app container into the network"
docker network connect isolated angular_simple_crud_app
