FROM node:20.10.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY src src
COPY tsconfig.json .

ARG PORT=3000

CMD ["yarn", "start"]

EXPOSE ${PORT}