FROM node:20.10.0

WORKDIR /app

COPY package.json yarn.lock ./
COPY tsconfig.json .

RUN yarn install

COPY . .

ARG PORT=3000
EXPOSE ${PORT}

RUN chmod +x ./docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
