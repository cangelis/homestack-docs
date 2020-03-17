# nginx

nginx is a web ser... Well.. we all know what nginx is. Let's get down to business.

## Supported versions

- `1.17` as `nginx117`

## Usage

### Build

```sh
$ homestead build nginx117
```

### Up

```sh
$ homestead up -d nginx117
```

## Configuration

nginx container mounts two volumes for configuring nginx and making changes on these folders don't require building again. 
Here they are;

### `nginx/<version>/conf`

This is the folder where you can place your custom configurations. You can see the example php upstream configurations in the folder already. 
You can `cp` the examples and use any of them.

### `nginx/<version>/sites`

The name of the folder is pretty clear. You can place the configurations of your sites.

## Restart nginx

When you make changes in the configuration folders, make sure you restarted nginx.

```sh
$ homestack restart nginx
```