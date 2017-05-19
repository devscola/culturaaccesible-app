FROM ruby:2.4.0

ENV SYSTEM_MODE development
ENV HOME=/opt/app

RUN mkdir -p $HOME
WORKDIR $HOME

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g ionic cordova
