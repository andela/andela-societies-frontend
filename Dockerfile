FROM node:dubnium

LABEL AUTHOR="Crispus Kamau <crispus.kamau@andela.com>"
LABEL application="soc-frontend"

ENV NODE_PATH /usr/local/share/.config/yarn/global/node_modules/

RUN yarn global add express@4.16.2 morgan@1.9.1

WORKDIR /application

COPY public /application

COPY prodserver /application

RUN chmod +x ./prodserver

CMD ./prodserver 4000
