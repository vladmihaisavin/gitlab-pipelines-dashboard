FROM node:14.17.3-slim

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --ignore-scripts

ADD . .

EXPOSE 3000
EXPOSE 6606

CMD yarn local