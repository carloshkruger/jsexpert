sudo docker run \
  --name postgres \
  -e POSTGRES_USER=carlos \
  -e POSTGRES_PASSWORD="123" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

sudo docker exec -it postgres psql --username carlos --dbname heroes
CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);


docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=carlos \
  -e MONGO_INITDB_ROOT_PASSWORD=123 \
  -p 27017:27017 \
  -d \
  mongo:4
