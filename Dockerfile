FROM node:26.7.0-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/index.html /usr/share/nginx/html/index.html
COPY --from=build /app/pages /usr/share/nginx/html/pages
COPY --from=build /app/assets /usr/share/nginx/html/assets

EXPOSE 80
