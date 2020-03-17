# PHP

The purpose of PHP containers is to provide  `php-fpm` server, a workspace to execute php programs and [supervisor](http://supervisord.org/) as process manager. Homestack is superior because it supports running multiple versions of `php`s at the same time.

## Supported versions

- `5.6` as `php56`
- `7.0` as `php70`
- `7.1` as `php71`
- `7.2` as `php72`
- `7.3` as `php73`
- `7.4` as `php74`

## Usage

### Build

```sh
$ homestack build php<version>
```

Build more than one image at the same time

```sh
$ homestack build php56 php70 php71
```

### Up

```sh
$ homestack up -d php56 php70 php71
```

## Available ready to use scripts

All the scripts mentioned in [alpine](alpine.html#available-ready-to-use-scripts)'s documentation are available.

## Install PHP extensions

PHP extensions can be install through the [`.install`](extending.html#install-file) file in build-time.

### Ready to use installers

Some PHP extensions can easily be installed by the scripts provided by Homestack. These scripts install the php extensions and also their dependencies. 
These are the ones that are available in `$BUILD_FOLDER/scripts`

- `php/gd.sh`
- `php/mcrypt.sh`
- `php/xdebug.sh` :information_source: use port `9000`
- `php/zip.sh`

### Use docker extension installer

The extensions can easily be installed using `docker-php-ext-install` command in the container.

```
# docker-php-ext-install mysqli bcmath zip gd opcache
```

Possible extensions you can install using this command:

```
# docker-php-ext-install --help

Possible values for ext-name:
bcmath bz2 calendar ctype curl dba dom enchant exif fileinfo filter ftp gd gettext gmp hash iconv imap interbase intl json ldap mbstring mysqli oci8 odbc opcache pcntl pdo pdo_dblib pdo_firebird pdo_mysql pdo_oci pdo_odbc pdo_pgsql pdo_sqlite pgsql phar posix pspell readline recode reflection session shmop simplexml snmp soap sockets sodium spl standard sysvmsg sysvsem sysvshm tidy tokenizer wddx xml xmlreader xmlrpc xmlwriter xsl zend_test zip
```

### Install extensions using PECL

Some of the extensions are not available in the php's source so you may need to install them using `pecl` and can enable using `docker-php-ext-enable` command.

```
# pecl install grpc
# docker-php-ext-enable grpc
```

::: tip
Run `php -m` to see the list of installed modules
:::

### Restart php-fpm

`php-fpm` should be restarted after an extension is installed.

```
# supervisorctl restart php-fpm
```

## php-fpm

php-fpm is managed by supervisor and can be started, stopped and restarted using it.

### Stop php-fpm

```
# supervisorctl stop php-fpm
```

### Start php-fpm

```
# supervisorctl start php-fpm
```

### Restart php-fpm

```
# supervisorctl restart php-fpm
```

## Configure nginx for php-fpm

There are example configurations for each php version in `nginx/1.17/conf` folder. All you need to is to enable the ones you want to use. No build is required after the change, the configurations are mounted as a volume on the container.

```sh
$ cp php-5.6-upstream.conf.example php-5.6-upstream.conf
```

::: tip
Make sure you `cp` instead of `mv` while using an example configuration. By this way you aren't breaking the skeleton of Homestead and it won't struggle to update itself.
:::

and you can use PHP 5.6 FPM in the nginx configurations just like this..

```{3}
location ~ \.php$ {
    try_files $uri /index.php =404;
    fastcgi_pass php56;
    fastcgi_index index.php;
    # ...
}
```

Restart `nginx` from host operating system after you update a config.

```sh
$ homestack restart nginx117 
```

### Configure nginx dependencies

When you enable one of the php upstream configurations and run this

```sh
$ homestack up nginx117 php56
```

It will most likely fail. Because nginx will start before php-fpm processes and it won't be able to connect to php-fpm. 
The idea is to make sure that php containers start before nginx. This is how you can do it;

Add `depends_on` configuration into nginx and it will wait for php containers to start. 

In your `docker-compose.override.yml` file:

```yaml{2,3,4,5,6}
  nginx117:
    depends_on:
      - php56
      - php70
      - php73
      - php72
    ports:
      - "80:80"
      - "443:443"
```

When you run `homestack up -d nginx117`, it will first start php containers and then start the nginx.