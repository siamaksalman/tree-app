
FROM node:12-alpine as build

RUN apk update && \
    apk add --no-cache util-linux 

RUN mkdir /app

# install dependencies
COPY package.json /app/
WORKDIR /app

# copythe project
COPY . /app/

RUN yarn install

ENV NODE_ENV=development
ARG REACT_APP_SERVER_ADDR

# copy and build the project
RUN yarn build

# next stage: prepare production environment
FROM bitnami/nginx:latest
ENV NODE_ENV=production

COPY --from=build /app/build /app
COPY --from=build /app/nginx.conf /opt/bitnami/nginx/conf/nginx.conf:ro
