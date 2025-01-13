FROM node:4
ADD ./package.json /taiyijs/package.json
WORKDIR /taiyijs
RUN npm install
ADD . /taiyijs
RUN npm test
