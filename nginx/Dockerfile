FROM alpine:3.17

RUN	apk update && apk upgrade && apk add --no-cache nginx openssl

RUN mkdir -p /etc/nginx/ssl
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/transcendence.42.fr.key -out /etc/nginx/ssl/transcendence.42.fr.crt -subj "/CN=transcendence.42.fr"

# Copy custom NGINX configuration file
COPY ./conf/nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
