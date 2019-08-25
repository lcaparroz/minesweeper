FROM node:10

ADD ./package.json ./yarn.lock /tmp/
RUN cd /tmp && yarn
RUN mkdir -p /usr/src/app && cd /usr/src/app && ln -s /tmp/node_modules

COPY . /usr/src/app

WORKDIR /usr/src/app
