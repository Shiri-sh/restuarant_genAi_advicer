FROM node:22-slim

WORKDIR /usr/src/app

# התקנת ffmpeg וכלים בסיסיים
RUN apt-get update && \
    apt-get install -y ffmpeg wget ca-certificates bash && \
    rm -rf /var/lib/apt/lists/*

# התקנת npm בלי אימות SSL
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Copy package metadata and install dependencies
COPY package*.json ./
RUN npm set strict-ssl false
RUN npm install --legacy-peer-deps

# Copy all app files
COPY . .

ENV NODE_ENV=development
EXPOSE 5000

CMD ["npx", "nodemon", "server.js", "--watch", ".", "--ext", "js,env", "--legacy-watch"]
