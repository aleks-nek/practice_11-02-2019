# practice_11.02.2019

# контейнер postgres
docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=db -e POSTGRES_PASSWORD=123456 -p 5432:5432 --restart=always -d postgres:9.6

