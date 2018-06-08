FROM node:carbon

LABEL AUTHOR="Thomas Nyambati <thomas.nyambati@andela.com>"
LABEL application="soc-frontend"

#due to the rapid changes the serve team is making please 
#use this version of serve

RUN yarn global add serve@6.5.6

WORKDIR /application

COPY public /application

CMD serve -si --port 4000
