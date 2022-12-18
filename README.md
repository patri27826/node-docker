# Local Test Intructions

Build : docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

Build 2 node-app  : docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2

down : docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

update node-app : docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app

force recreate node-app : docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate --no-deps node-app

# WorkFLow
# Create image on localhost -> push image to Dockerhub, push data to Github -> Cloud get data from Dockerhub and GitHub

Local : docker-compose -f docker-compose.yml -f docker-compose.prod.yml build   //build the image
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml build node-app // specified build the node-app image
        
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml push node-app // push the node-app image to Dockerhub
