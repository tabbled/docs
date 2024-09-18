---
title: Докер
description: Документация Tabbled платформы | Докер
---

# Установка и настройка платформы с Docker

**1. Download the docker-compose file example**
```shell
https://raw.githubusercontent.com/tabbled/tabbled/main/docker-compose.yaml
```
**2. Create an .env file with configuration**

Download the example docker-compose file and pass contained variables
```shell
wget https://raw.githubusercontent.com/tabbled/tabbled/main/.env.example
```

**3. Create a docker volume for PostgresSQL data**

```shell
docker volume create pg_data
```

**4. Install and start Tabbled application**
```shell
docker compose up
```

**5. Open `localhost` on a web browser.**

Note: Default login:password are admin:admin