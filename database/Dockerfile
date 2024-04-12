FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}

COPY ./init_scripts/* /docker-entrypoint-initdb.d/