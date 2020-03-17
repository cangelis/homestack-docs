# Getting Started

## Install Docker

Homestack is Docker based so the first thing you should do is to install Docker.

Make sure `docker-compose` works

```sh
$ docker-compose --version
```

## Directory structure

I'd suggest to setup the environment into the directory where all your project files live such as your `~/codes` folder. Example structure can be:

```
+ homestack
+ project_1
+ project_2
```

However, you can set up the environment into another directory and configure the path of your projects in the `.env` file which will be mentioned later or you can mount more volumes other than
 the default one which is mentioned in [extending](extending.html#custom-volumes) part.

## Install

First clone the repository and `cd` into it.

```sh
$ git clone git@github.com:cangelis/homestack.git
$ cd homestack
$ git checkout 1.x
```

Make your own `.env` and `docker-compose.override.yml` files.

```sh
$ cp .env.example .env
$ cp docker-compose.override.yml.example docker-compose.override.yml
```

Add this function to your `.zshrc`, `.bashrc`, `.ashrc` or whatever rc you use so using the environment will be pretty handy.

```sh
function homestack {
    ( cd ~/codes/homestack && docker-compose $* )
}
```

::: warning
Make sure you configure the `~/codes/homestack` folder according to yours.
:::

## Building and running

Docker images are built once and starts from scratch every time you `up`. So the changes you make in the container will be lost after you run `down`. But we will see 
how to make our changes permanent later.

This is how you can build the images

```sh
$ homestack build mysql57 nginx117
```
 
### :runner: Up & Running

```sh
$ homestack up -d mysql57 nginx117
```

Go your browser and see nginx's 404 page on http://localhost :tada:

::: warning
nginx uses port 80 by default but it's customizable. Make sure the nginx's port is available before running this
:::

### :question: See if they are up

```sh
$ homestack ps
```

### :stop_sign: Stop a service

```sh
$ homestack stop mysql57
```

### :x: Stop all services

```sh
$ homestack down
```

## Configuration files

There are two configurations files which are `docker-compose.override.yml` and `.env`. Feel free to edit them! The details of the configurations will be mentioned as you go through the documentation.

### Source Folder

Your projects' folder is mounted to `/var/www` in the container. The folder that is going to be mounted is configured in `.env` file. You can use a relative or absolute path.

By default it's mounting the upper level folder.

```
CODE_FOLDER=..
```

You can mount more volumes in addition to the default one. You can see how it's done on [extending](extending.html#custom-volumes) part.

### Mounting options for macOS

You can configure the semantics of shared folders on macOS in `.env` file. It is `:cached` by default which is pretty efficient. You can see the other available options here: [https://docs.docker.com/docker-for-mac/osxfs-caching/](https://docs.docker.com/docker-for-mac/osxfs-caching/)

```
VOLUME_CACHE_OPTION=:cached
```

### docker-compose.override.yml

This is the file where you can add your custom docker-compose configurations and extend Homestack. This link explains how it works in detail: [https://docs.docker.com/compose/extends/#multiple-compose-files](https://docs.docker.com/compose/extends/#multiple-compose-files)

## Running commands on the container

```sh
$ homestack exec <container_name> <command>
```

Example run `php -v` on PHP 7.3 container

```sh
$ homestack exec php73 php -v
```

## Shell access onto the container

There are different ways of login to container shell but the easiest way is to run `sh` directly on it.

```
# run the container
homestack up -d php73

# this will run "sh -l" on the container and will let you in
homestack exec php73 sh -l
```

::: tip
`-l` option of `sh` will let it execute the `.profile` file once you login. Otherwise it will be skipped.
:::

::: tip
Add these aliases to your `.zshrc`, `.bashrc` or similar for easier shell access.

```sh
function sh73 {
    homestack exec php73 sh -l
}

function sh72 {
    homestack exec php72 sh -l
}

# do the similar for other containers...
```

So you can run

```sh
$ sh73
```

which will login to php7.3's shell.
:::