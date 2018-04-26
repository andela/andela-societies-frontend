FROM node:carbon

LABEL AUTHOR="Thomas Nyambati <thomas.nyambati@andela.com>"
LABEL application="soc-frontend"

RUN yarn global add serve

WORKDIR /application

COPY public /application

CMD serve -si --port 3000