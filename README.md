docker run --name postgres-db \
  -e POSTGRES_USER=andre \
  -e POSTGRES_PASSWORD=poa26lab* \
  -e POSTGRES_DB=edustocks \
  -p 5432:5432 \
  -d postgres