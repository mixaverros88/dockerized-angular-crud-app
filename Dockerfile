# Stage 1: download the code of github
FROM alpine/git as downloadSourceCode
WORKDIR /app
RUN git clone https://github.com/mixaverros88/angular-Rest-Crud

# Stage 2: build the artifact
FROM node:8-alpine as builder
RUN mkdir /ng-app
COPY --from=downloadSourceCode /app/angular-Rest-Crud /ng-app
WORKDIR /ng-app
RUN npm install -g @angular/cli@latest
RUN npm install
RUN npm run build

### Stage 3: Deploy ###
FROM nginx:1.17.8-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/restFull /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
