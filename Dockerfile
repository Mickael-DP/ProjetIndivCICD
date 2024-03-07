#Create MySQL Image for JSP Tutorial Application
FROM mysql:latest
MAINTAINER m.dallepasqualine@gmail.com
COPY ./database/ /docker-entrypoint-initdb.d
EXPOSE 3306