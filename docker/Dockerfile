FROM node:16.17.0

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install glob rimraf

RUN npm install -g webpack webpack-cli \
&& npm install 

COPY . /usr/src/app

RUN npm run build

EXPOSE 3000