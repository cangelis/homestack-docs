# ngrok

ngrok can be installed using a ready to use script `ngrok.sh` to any container.

## Install

In your `.install` script..

```sh
#!/bin/sh

cd $BUILD_FOLDER

scripts/alpine/ngrok.sh
```

ngrok's download URL is hard-coded in the `ngrok.sh`. If the url becomes outdated you can grab a valid one from ngrok's site use it like this..


```sh
NGROK_DOWNLOAD_URL=https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip scripts/alpine/ngrok.sh
```

`ngrok` executable will be installed to `/usr/bin` directory and should be in your PATH already.

## Configuration

You can make ngrok tunnels without any configuration needed after you authenticate but using a configuration file is
 pretty useful when you don't want to replicate yourself everyday.
 
ngrok configurations live in `~/.ngrok2/ngrok.yml` file. Because home folder is mounted as a volume, the configurations will not be lost after
 you `homestack down`.
 
## Web Address

Connections to the tunnels can be inspected using `ngrok`'s web panel. In order to connect to ngrok web panel from the host operating system
 your `web_addr` config should look like this in your `ngrok.yml` file.
 
```yaml
authtoken: <your auth token>
web_addr: 0.0.0.0:4040
```

and you need to map the ports in the `docker-compose.override.yml` file accordingly.

```yaml
  php73:
    ports:
      - "4040:4040"
```

You can access to web panel from http://localhost:4040 on the host operating system.

## Configure connections

Imagine a scenario that you installed ngrok in the nginx container and also want to expose mailhog. Because mailhog lives in another container 
you need to configure the `addr` field accordingly. Here is the example how you can expose mailhog from ngrok in nginx container..

```yaml{7}
authtoken: <your auth token>
web_addr: 0.0.0.0:4040
tunnels:
  mailhog:
    subdomain: my-mailhog
    proto: http
    addr: mailhog:8025
    host_header: localhost
```

And run

```sh
ngrok start mailhog
```

You can also do it without the configuration file

```sh
ngrok http mailhog:8025
```