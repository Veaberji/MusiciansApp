FROM node:18-alpine AS builder
ARG CONFIG=production
WORKDIR /frontend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --configuration=$CONFIG

FROM nginx:1.25.2-alpine AS frontend
RUN chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /usr/share/nginx/html \
    && touch /var/run/nginx.pid && chown -R nginx:nginx /var/run/nginx.pid
USER nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder --chown=nginx:nginx /frontend/dist/client ./
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
