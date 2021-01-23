## Access docker node container

You can use this command:
```
    docker exec -it [container_name] /bin/sh
```

## See container IP address

You can use this command:
```
    docker network inspect [docker network name]
```

## Run migrations
Inside the API container you can run the following command to execute all migrations:

```
    yarn typeorm migration:run
```
