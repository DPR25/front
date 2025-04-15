FROM nginx:alpine
ADD https://www.google.com /time.now
WORKDIR /usr/share/nginx/html
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
