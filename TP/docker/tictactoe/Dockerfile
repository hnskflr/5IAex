FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 9000
CMD ["node", "server_single.js"]
