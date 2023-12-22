FROM node:20.10.0

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY src src
COPY tsconfig.json ./

RUN yarn install


CMD ["yarn", "start"]