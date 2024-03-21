FROM node:20.11.0

WORKDIR /app/frontend

COPY package*.json yarn*.lock ./ 

RUN yarn install

COPY . .

EXPOSE 8081

CMD ["npx", "expo", "start"]
