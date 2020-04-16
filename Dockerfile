FROM node:lts-alpine as develop-stage

WORKDIR /app

COPY ./package.json .

RUN npm install