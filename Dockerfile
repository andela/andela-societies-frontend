FROM node:carbon

LABEL AUTHOR="Thomas Nyambati <thomas.nyambati@andela.com>"
LABEL application="soc-frontend"

#due to the rapid changes the serve team is making please 
#use this version of serve

RUN yarn global add express@4.16.2

WORKDIR /application

COPY public /application

COPY prodserver /application

ENV NODE_PATH /usr/local/share/.config/yarn/global/node_modules/

RUN chmod +x ./prodserver

CMD ./prodserver 4000
