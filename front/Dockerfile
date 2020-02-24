FROM node:13-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update && \
    apk upgrade && \
    npm install -g npm @vue/cli

COPY . .

EXPOSE 8080
CMD ["npm", "run", "serve"]
