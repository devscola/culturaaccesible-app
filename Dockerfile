FROM node:latest

RUN mkdir -p /opt/app
ADD . /opt/app
WORKDIR /opt/app

ENV SYSTEM_MODE development

RUN apt-get update
RUN npm install -g ionic cordova && cordova telemetry off
