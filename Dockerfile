FROM node:20

WORKDIR /usr/app

COPY package.json .
RUN pnpm
COPY . .

EXPOSE 5000
CMD ["pnpm", "start"]