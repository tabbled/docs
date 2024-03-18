FROM node:18-alpine as build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run docs:build

FROM nginx:1.16.0-alpine
COPY --from=build /app/.vitepress/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

WORKDIR /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]


