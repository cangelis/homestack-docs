# Alpine

[Alpine](https://alpinelinux.org/) is a lightweight Linux distro. Because it is lightweight it is very popular among the Docker community. 
Homestack containers usually base in alpine images.

The purpose of this setup in Homestack is to have an environment that you can install **anything** into it through [`.install`](extending.html#install-file) file. You can install services that are not yet supported by Homestack and
 you won't feel yourself limited.

The alpine container runs [supervisord](http://supervisord.org/) as the main process and manages the background services using it.
 You need to configure the daemons for supervisord in order to run them in the background. If you have no idea how to do it, you can take a look at the supervisord's documentation or 
 take a look at the examples in `homestack/build/config/supervisor`
 
## Available versions

- `3.11` as `alpine311`

## Usage

### Build

```
$ homestack build alpine311
``` 

### Up

```
$ homestack up -d alpine311
```

## Available ready to use scripts

The scripts that are available in `$BUILD_FOLDER/scripts` in build-time.

- `alpine/bash.sh` installs `bash`
- `alpine/curl.sh` installs `curl`
- `alpine/git.sh` installs `git`
- `alpine/nano.sh` installs `nano`
- `alpine/nodejs.sh` installs `node` and `npm`
- `alpine/sshd.sh` installs ssh server and configures the supervisord accordingly. Make sure you forwarded the port `22` accordingly in `docker-compose.override.yml`
- `alpine/vuepress.sh` installs `vuepress`
- `alpine/yarn.sh` installs `yarn`

## Home folder

Home folder (`/root` in the container) is mounted as a volume in the container so the changes on your home folder won't be lost after you run `homestack down`. 
You can see the content's of the home folder in `<homestack root>/alpine/<version>/home`

## Crontabs

Crontabs are saved in `<homestack root>/alpine/<version>/crontabs` on host operating system as a volume. So the crontabs aren't lost after `down`. You can edit the crontabs as usual in the container.

```
# crontab -e
```

## Advanced

### Adding supervisor configurations

You can add your supervisor configurations like `my_service.conf` into the `<homestack root>/alpine/<version>/supervisord` folder and you don't need to build again. This directory is mounted as a volume in the container.
 You just need to restart the container 
 
 ```
$ homestack restart alpine311
 ```
 
### Restart a supervisor program

In the container

```
# supervisorctl restart <program_name>
```

On the host OS

```
$ homestack exec alpine311 supervisorctl restart <program_name>
```

### Restart all supervisor programs

```
# supervisorctl restart all
```