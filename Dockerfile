FROM ruby:2.4.0

RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y libxml2-dev libxslt1-dev
RUN apt-get install -y libqt4-webkit libqt4-dev xvfb
RUN apt-get install -y python python-dev python-pip python-virtualenv
RUN rm -rf /var/lib/apt/lists/*
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g cordova ionic

ENV SYSTEM_MODE development
ENV HOME=/opt/app

RUN mkdir -p $HOME
WORKDIR $HOME
