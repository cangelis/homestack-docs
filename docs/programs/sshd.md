# sshd

You can run shell directly on the container instead of connecting through ssh with this command.

```sh
homestack exec <container> sh -l
```

But you may still want to install it in order to make the services work with the softwares that can only connect with ssh...

## Install

sshd can be installed to alpine based, supervisor supported containers such as php and alpine using a ready to use script in one line...

In your `.install` script;

```sh
#!/bin/sh

cd $BUILD_FOLDER

scripts/alpine/sshd.sh
```

and build the container again.

```sh
homestack build php73
```

`sshd.sh` script installs ssh server and configures the supervisor installed accordingly.

## Configure Port

Before running the container you need to map the port to connect from host operating system.

In your `docker-compose.override.yml`

```yaml
  php73:
    ports:
      - "7322:22"
```

## Keys and configurations

You can add the public keys that can authorize through ssh in `/root/.ssh/authorized_keys` file in the container. The home folder is
 mounted as volume so the changes in this folder won't be lost after you `down`.
