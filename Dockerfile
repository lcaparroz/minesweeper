FROM node:8

RUN ["npm", "install", "immutable"]

COPY . /app

WORKDIR /app
