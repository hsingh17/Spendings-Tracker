FROM node:16.3.0

WORKDIR /frontend

COPY ./ ./

RUN npm ci

EXPOSE 5173

CMD npm run "${MODE}" "--" "--host"
