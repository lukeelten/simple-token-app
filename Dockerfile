#Download Node Alpine image
FROM node:lts AS build

#Setup the working directory
WORKDIR /usr/src/ng-app

#Copy package.json
COPY package.json package-lock.json ./

#Install dependencies
RUN npm install

#Copy other files and folder to working directory
COPY . .

#Build Angular application in PROD mode
RUN npm run build

#Download NGINX Image
FROM nginx:stable

#Copy built angular files to NGINX HTML folder
COPY --from=build /usr/src/ng-app/dist/simple-token-app/ /usr/share/nginx/html