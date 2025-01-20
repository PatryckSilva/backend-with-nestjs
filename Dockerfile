FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/main.js"]