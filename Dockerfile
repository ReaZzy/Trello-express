FROM node:14.7-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm","start"]
