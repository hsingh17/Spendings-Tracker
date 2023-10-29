FROM node:16.3.0

ARG MODE
# Save MODE into an env variable, otherwise it's going to be an empty string when CMD runs (because CMD runs on container start)
ENV MODE=${MODE}

WORKDIR /frontend

COPY ./ ./

RUN npm ci

EXPOSE 5173

CMD npm run "${MODE}" "--" "--host"
