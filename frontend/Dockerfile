# Disposable image only to build the Angular application
FROM node:18-alpine AS image-build

# Copy the code excluding file and folders in .dockerignore (node_modules, dist)
COPY . /usr/src

WORKDIR /usr/src/app

# Install npm packages
RUN npm install

# Build the application
RUN npm run build-prod


# Image to serve the application
FROM nginx:1.19 AS image-serve

# Cleans up nginx default setup
RUN rm -rf /usr/share/nginx/html
RUN rm -f /etc/nginx/conf.d/default.conf

# Configures a small nginx to serve the Angular application
COPY ./conf/internal-nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular application
COPY --from=image-build /usr/src/app/dist/app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
