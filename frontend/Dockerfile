# pull the Node.js Docker image
FROM node:alpine
MAINTAINER s1113260@student.hsleiden.nl
WORKDIR /usr/src/app

COPY . .
COPY package*.json ./

RUN npm install

EXPOSE 5000

ENTRYPOINT npm start
#CMD ["node", "app.js"]
