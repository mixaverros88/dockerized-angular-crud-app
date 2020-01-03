FROM nginx:alpine
COPY /dist/restFull /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]