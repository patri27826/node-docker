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
### Docker WorkFlow with AWS, Github
![workflow](/resource/1.png?raw=true "Docker flow")
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