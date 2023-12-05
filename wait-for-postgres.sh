#!/bin/sh
# wait-for-postgres.sh

set -e

cmd="$@"

echo "PGPASSWORD=${DB_PASSWORD} psql -h \"${DB_HOST}\" -p \"${DB_PORT}\" -U \"${DB_USER}\" -c '\q' ${DB_NAME}"

until PGPASSWORD=${DB_PASSWORD} psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -c '\q' ${DB_NAME}; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 5
done

>&2 echo "Postgres is up - executing command"
exec $cmd
