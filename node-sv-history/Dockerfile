FROM node:12.2.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${SV_HISTORY_PORT_INT}
EXPOSE ${SV_HISTORY_PORT_EXT}
CMD [ "npm", "start" ]
