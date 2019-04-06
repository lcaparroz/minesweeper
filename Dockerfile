FROM node:8

RUN ["npm", "install", "immutable", "mocha"]

COPY . /app

WORKDIR /app
