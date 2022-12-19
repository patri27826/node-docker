# Docker筆記
### Local Test Intructions
```
// Up
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build 

// Up 2 node-app
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2 

// Down everything
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down 

// Update node-app
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app 

// Force recreate node-app
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate --no-deps node-app 
```
### Docker WorkFlow with AWS,Github
![Workflow](/resource/1.png?raw=true "Workflow")
1. #### Create image on localhost

2. #### Push image to Dockerhub, Push code change to Github

3. #### Cloud get data from Dockerhub and GitHub


#### Local :
```
//build the image
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build   
// specified build the node-app image
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build node-app 

// push all image to Dockerhub
docker-compose -f docker-compose.yml -f docker-compose.prod.yml push 
// push the specific node-app image to Dockerhub
docker-compose -f docker-compose.yml -f docker-compose.prod.yml push node-app 
         
//git push         
git add, commit, push to Github
```
#### Server : 
```
// pull the image from Dockerhub
docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull 
// pull the specific node-app image from Dockerhub
docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull 

// run the docker container
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d  
// only rebuild the node-app image
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app  
```

#### Docker automation with Watchtower:
will automatically detect new image on DockerHub of specific container 
```
// app_node-app_1 is container name
// WATCHTOWER_POLL_INTERVAL is time to check if image is update
docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_DEBUG=true -e WATCHTOWER_POLL_INTERVAL=50 -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower app-node-app-1 

// specified build the node-app image
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build node-app

// push the specific node-app image to Dockerhub
docker-compose -f docker-compose.yml -f docker-compose.prod.yml push node-app 
```

#### Docker Swarm:
```
// Build the Swarm
docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml myapp

$ docker stack ls
NAME      SERVICES   ORCHESTRATOR
myapp     4          Swarm

$ docker stack services myapp
ID             NAME             MODE         REPLICAS   IMAGE                        PORTS
np80yt9509tx   myapp_mongo      replicated   1/1        mongo:latest                 
wey6gk4ih1an   myapp_nginx      replicated   1/1        nginx:stable-alpine          *:80->80/tcp, *:3000->80/tcp
pdtx1rjrvuz7   myapp_node-app   replicated   8/8        patri27826/node-app:latest   
ymgz8fpr0xwr   myapp_redis      replicated   1/1        redis:latest 

$ docker stack ps myapp
ID             NAME                IMAGE                        NODE               DESIRED STATE   CURRENT STATE           ERROR                       PORTS
3tr3eou2x12u   myapp_mongo.1       mongo:latest                 ip-172-31-38-211   Running         Running 3 minutes ago                               
89ofszf63fds   myapp_nginx.1       nginx:stable-alpine          ip-172-31-38-211   Running         Running 2 minutes ago                               
7m9tplfx5n2s    \_ myapp_nginx.1   nginx:stable-alpine          ip-172-31-38-211   Shutdown        Failed 3 minutes ago    "task: non-zero exit (1)"   
ramqx6s07l4j   myapp_node-app.1    patri27826/node-app:latest   ip-172-31-38-211   Running         Running 2 minutes ago                               
g4aj9g46ayn5   myapp_node-app.2    patri27826/node-app:latest   ip-172-31-38-211   Running         Running 2 minutes ago                               
v0sjv4xqj02m   myapp_node-app.3    patri27826/node-app:latest   ip-172-31-38-211   Running         Running 2 minutes ago                               
uyy0ets9k17l   myapp_node-app.4    patri27826/node-app:latest   ip-172-31-38-211   Running         Running 2 minutes ago                               
9bc8jwb0if71   myapp_node-app.5    patri27826/node-app:latest   ip-172-31-38-211   Running         Running 2 minutes ago                               
7qu2x1s1gjba   myapp_node-app.6    patri27826/node-app:latest   ip-172-31-38-211   Running         Running 2 minutes ago                               
pg8mkskwq1nl   myapp_node-app.7    patri27826/node-app:latest   ip-172-31-38-211   Running         Running 2 minutes ago                               
yaw699sqm460   myapp_node-app.8    patri27826/node-app:latest   ip-172-31-38-211   Running         Running 2 minutes ago                               
94qy28f9hqo4   myapp_redis.1       redis:latest                 ip-172-31-38-211   Running         Running 2 minutes ago

// step to update
// 1. build the image 
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

// 2. push the image to DockerHub
docker-compose -f docker-compose.yml -f docker-compose.prod.yml push 

//3. Execute the update on Server
docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml myapp
```
