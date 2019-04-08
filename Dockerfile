FROM node:8

RUN npm install --global \
    chai \
    chai-immutable \
    immutable \
    mocha \
    random-js

ENV NODE_PATH=/usr/local/lib/node_modules/

COPY . /app

WORKDIR /app
