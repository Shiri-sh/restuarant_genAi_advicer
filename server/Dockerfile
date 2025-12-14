FROM node:22-alpine

WORKDIR /usr/src/app

# Copy package metadata
COPY package*.json ./

# Tell npm to ignore SSL issues
RUN npm set strict-ssl false
RUN npm install --legacy-peer-deps
# Copy all app files
COPY . .

ENV NODE_ENV=development
EXPOSE 5000

# Use nodemon to watch the app for changes
CMD ["npx", "nodemon", "server.js", "--watch", ".", "--ext", "js,env", "--legacy-watch"]
