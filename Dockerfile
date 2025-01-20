FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN npx prisma generate && npm run build

EXPOSE 5000

CMD ["node", "dist/src/index.js"]