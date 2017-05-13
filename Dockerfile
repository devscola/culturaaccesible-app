FROM node:latest

ENV SYSTEM_MODE development
ENV HOME=/opt/app

RUN mkdir -p $HOME
WORKDIR $HOME

RUN apt-get update
RUN npm install -g ionic cordova && cordova telemetry off
