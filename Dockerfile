FROM nginx:1.14.0-alpine
COPY build/ /usr/share/nginx/html
