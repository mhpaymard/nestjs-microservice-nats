# NestJs-Microservice-Nats
Scaffold quickly your next [NestJS 8](https://nestjs.com/) API project with 
- NestJS
- Nats
- TypeORM
- Postgresql
- Docker (docker-compose)
- JWT
- Swagger

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM
- A database such as MariaDB, MySQL, PostgreSQL or MongoDB. You may use the provided `docker-compose` file. Here we have used [Postgresql](https://www.postgresql.org/)
- [Nats](https://nats.io/) is a simple, secure and high performance open source data layer for cloud native applications, IoT messaging, and microservices architectures.
- [Docker compose](https://docs.docker.com/compose/) may also be useful for advanced testing and image building, although it is not required for development.

### 1.2 Project configuration

Start by cloning this project on your workstation.

``` sh
git clone https://github.com/mhpaymard/nestjs-microservice-nats-authentication.git
```

You can now configure your project by creating a new `.env` file containing your environment variables used for development.

```
nano .env
```

## 1.3. Default Docker commands

The Docker commands below are already included with this template and can be used to quickly run, build and test your project.
```sh

# Internal command used during the Docker build stage
docker-compose up --build


## 1.4. Project goals

The goal of this project is to provide a clean and up-to-date "starter pack" for REST API projects that are built with NestJS. As a advanced start up, we might clone and quick start for Pub/Sub or event based microservice communication.

## 1.5. Contributing

Feel free to suggest an improvement, report a bug, or ask something: [https://github.com/mhpaymard/nestjs-microservice-nats-authentication/issues](https://github.com/mhpaymard/nestjs-microservice-nats-authentication/issues)
