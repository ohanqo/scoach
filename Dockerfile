FROM node:13.7.0-alpine3.11

WORKDIR /usr/src/app
RUN apk add --no-cache bash
RUN mkdir -p api front
COPY ./api ./api
COPY ./front ./front

RUN yarn global add @nestjs/cli
