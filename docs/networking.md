# Networking

## Connecting from host to a container

In order to connect to a docker container from the host operating system, ports need to be exposed. See your `docker-compose.override.yml` to see how you can map the ports.

This is an example port mapping in order to connect to php7.0 container's port `22` from host operating system using port `7022`

```yaml
php70:
  ports:
    - "7022:22"
```

### Hosts

Containers can be accessed through `127.0.0.1` but you can add mapping into `/etc/hosts` file in the host operating system in order to connect to a container using a different host. Example `/etc/hosts` entry:

```
127.0.0.1 my-project.foo.bar
127.0.0.1 second-project.foo.bar
```

## Connecting from one container to another

It is most likely one container will need to consume another. Such as `php-fpm` will probably need to connect `mysql`. The default networking can already handle this and you only need to use the container's name as the hostname. For example this is an example mysql configuration.

```{1,6}
DB_HOST=mysql80
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root

REDIS_SERVER=redis50
```

### Aliases

You may want to connect to a service using a different hostname instead of the default which is the name of the service in `docker-compose.yml` file.

For example, there may be a site configured in nginx with `site_name api.my-service.com` and you want to connect this site from a `php` container using this hostname instead of default `nginx117`.

This is how you can achieve this in the `docker-compose.override.yml`

```yaml
networks:
  my-network:

services:
  nginx117:
    networks:
      my-network:
        aliases:
          - api.my-service.com
      default:

  php73:
    networks:
      - my-network
      - default
```

::: warning
Always add `default` when you modify `networks` section otherwise you'll lose connection to other containers
:::