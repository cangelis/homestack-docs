# Extending

You already started to extend Homestack while configuring ports and networks. Let's go beyond it..

## `.install` file

Changes on containers are not permanent so when you stop a container, the softwares you installed, the configurations you made are lost. So you need to build an image 
if you want to make your changes permanent.

Each software configuration has a `build` folder. For example: `nginx/1.17/build`. This is the script where we are going to place our magic script `.install`

```
nginx
  |_ 1.17
    |_ build
      |_ .install
```

`.install` file is a script that is executed while the containers are built. This means it is the place where you can place all your custom configurations and installations. 

It's optional but you'll probably use it a lot

### Example: install `nano` 

`nano` is a text editor which is not included in the images by default. You may want to install it because you may not know how to exit `vim`.

Let's install it into PHP 7.0's container but the process is same for all the services.

Make a file called `.install` in `php/7.0/build` and paste this:

```
#!/bin/sh

apk add nano
```

and build the image again:

```sh
$ homestack build php70
```

::: tip
`apk` is the package manager of alpine linux similar to `apt-get`. Homestack uses alpine images as much as it can because they are lightweight.
:::

```
# start the container
$ homestack up -d php70

# login to shell
$ homestack exec php70 sh -l

# ...
# nano is available in the container
```

## Build context

The scripts and configurations in the `build` folder in Homestack root folder are to be used in the build process and are copied into the container's `/tmp/build` folder temporarily. 
The absolute path of this folder is available as `$BUILD_FOLDER` in `.install` script in build-time so you don't need to hard-code the path.

This is the folder where the core configurations, ready to use scripts and your custom configurations live in.

Each ready to use script is mentioned in the regarding container's documentation in which it can be ran but you are free to browse them.

Example `.install` script for a php container:

```
#!/bin/sh

cd $BUILD_FOLDER/scripts

alpine/nodejs.sh
alpine/yarn.sh
alpine/vuepress.sh
alpine/git.sh

php/mcrypt.sh
php/zip.sh
php/gd.sh

docker-php-ext-install opcache bcmath pdo_mysql
```

#### Custom configuration files

You may want to customize a service using a custom configuration file such as `nginx.conf` or `my.cnf` file. Here is the way you can achieve this...

Place your custom `nginx.conf` file into `<Homestack_root>/build/usr` and copy it to somewhere permanent during build time in `.install` script.

```
#!/bin/sh

cp $BUILD_FOLDER/usr/nginx.conf /etc/nginx/nginx.conf
```

::: tip
`build/usr` folder is dedicated for custom build-time configurations and scripts only. It is a folder whose contents are `.gitignore`d so this folder is not affected when Homestack is upgraded. 
Better use only this folder for custom stuff rather than `build/scripts` or `build/config`.
:::

You don't have to use the config files at all. You can modify the existing configurations instead.

This is how you can switch root's default login shell from ash to bash in `.install` script.

```
#!/bin/sh

$ sed -i 's#root:x:0:0:root:/root:/bin/ash#root:x:0:0:root:/root:/bin/bash#g' /etc/passwd
```

::: tip
Because alpine linux is very lightweight in terms of storage, it may not contain very well known executables such as `chsh`
:::

## Custom volumes

Each container has different default mounting points according to its needs but you can also mount custom folders. 
Mounting a volume in a container instead of copying in build-time makes sense when you want to keep the files in the host operating system and 
don't want to lose them when you run `homestack down`. Who would want to lose the changes on a source code?

The custom volumes can be mounted using `docker-compose.override.yml`. Here is how:

```yaml{4,5}
  php70:
    ports:
      - "7022:22"
    volumes:
      - /Users/cangelis/my_project:/var/my_project
```

And your `my_project` will be mounted to `/var/my_project` in the container.

If you want to benefit from semantics on macOS you can add the flag configured in `.env` file just described in [getting started](getting-started.html#mounting-options-for-macos) guide.

```yaml
    volumes:
      - /Users/cangelis/my_project:/var/my_project${VOLUME_CACHE_OPTION}
```

If you want to keep the mounted folder in Homestack folder in order to make that folder portable along with whole environment, there is a folder `volumes` in the Homestack root dedicated for this purpose.
You can mount it like this:

```yaml
    volumes:
      - ./volumes/custom_stuff:/var/custom_stuff{VOLUME_CACHE_OPTION}
```

This folder is `.gitignore`d so upgrading Homestack will not break or lose your changes.

## Custom services

You are not limited to the services that come with Homestack by default. You are free to add your custom services if you already are familiar with Docker. Actually it is pretty easy..

The folder `services` in the Homestack root is dedicated for this purpose. You can keep your `Dockerfile`s in it and can register the service in the `docker-compose.override.yml`.

Adding a new service will not break Homestack at all.

### Example: Install beanstalkd service

Make a folder `services/beanstalkd` and make a `Dockerfile` in it..

```dockerfile
FROM alpine:3.11
RUN apk add --no-cache beanstalkd

CMD ["/usr/bin/beanstalkd"]
```

and register this service in `docker-compose.override.yml`

```yaml
  my_beanstalkd:
    build:
      context: .
      dockerfile: services/beanstalkd/Dockerfile
```

You can now build and run.

```sh
homestack up -d my_beanstalkd
```
