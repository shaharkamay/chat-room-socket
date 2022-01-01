#Add Node
FROM node:16-alpine3.12
#run Build
COPY ./client /client
RUN cd /client
WORKDIR /client
RUN npm i
RUN npm run build
RUN cd ../
#run server
COPY ./server /server
RUN cd /server
WORKDIR /server
RUN npm i
RUN npm run build
#start server
CMD [ "npm","start" ]

