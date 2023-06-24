FROM node:18-alpine

# Copy the code excluding file and folders in .dockerignore (node_modules, dist)
COPY . /usr/src

WORKDIR /usr/src/app

# Install npm packages
RUN npm install

# Build the application
RUN npm run build

# run server
EXPOSE 3000

# CMD export PORT=3000 && node main
CMD export PORT=3000 && npm run start:prod