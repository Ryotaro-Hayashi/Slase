FROM node:13-alpine

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN apk update && \
    apk upgrade && \
    npm install -g npm && \
    npm install -g @vue/cli

COPY . .

EXPOSE 8080
CMD ["yarn", "serve", "--mode", "development"]
