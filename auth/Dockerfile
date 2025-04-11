# base image to build the container
FROM node:alpine

# additional commands to install the dependencies
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# command to execute on container start
CMD [ "npm", "start" ]