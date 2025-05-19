# Etapa 1 - build Angular
FROM node:22 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Etapa 2 - servidor NGINX
FROM nginx:stable-alpine
COPY --from=build /app/dist/cadastro-livros-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf