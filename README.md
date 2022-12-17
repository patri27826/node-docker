#Execute Instruction

Build : docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

Build 2 node-app  : docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2

down : docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

update node-app : docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app

