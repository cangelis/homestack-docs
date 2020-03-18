# Varnish

## Supported versions

- `3.0` as `varnish30`
- `4.1` as `varnish41`
- `5.2` as `varnish52`
- `6.0` as `varnish60`

## Building

```sh
homestack build varnish<version>
```

## Up

First action is to make your `default.vcl` file in the regarding varnish folder in Homestack root. 
You can simply start copying the example.

Example

```sh
# In homestack root folder
cp varnish/3.0/default.vcl.example varnish/3.0/default.vcl
```

Then you can start the container.

```sh
homestack up -d varnish30
```

## Configuring the backend

As you can see in the example, you still can use the name of the service as a `.host` in backend section. This is an example 
backend configuration to use `nginx117` as backend.

```
vcl 4.1;

backend default {
    .host = "nginx117";
    .port = "80";
}
```

## Depend on backend service

The backend service such as nginx should be up and running before varnish is started. You can add `depends_on` section into the varnish configuration
 in `docker-compose.override.yml` so varnish will never start before the services in the `depends_on` section.
 
```yaml{4,5}
  varnish60:
    ports:
      - "8060:80"
    depends_on:
      - nginx117
```

## Port

In the `docker-compose.override.yml.example` file, nginx uses port `80` and varnish services have a port convention looks like `80<varnish version>`. You are 
free to change the port mapping in `docker-compose.override.yml` file as described in [networking](/docs/networking.html) section.