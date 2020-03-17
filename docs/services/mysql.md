# MySQL

## Supported versions

- `5.7` as `mysql57`
- `8.0` as `mysql80`

## Usage

### Build

```sh
$ homestack build mysql57 mysql80
```

### Up

```sh
$ homestack up -d mysql57 mysql80
```

## Storage folder

MySQL data is stored in the host operating system in `mysql/<version>/data` folder. You can clear its contents 
completely if you want to start from scratch. Just make sure you don't remove `.gitignore` file in it.

## Configuration

### Root password

Root password can be set using the environment variable `MYSQL_ROOT_PASSWORD`.

```yaml
mysql57:
    ports:
      - "3308:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=secret
```

### Other environment variables

These can be used for creating a user and a database while initializing MySQL for the first time..

```yaml
mysql57:
    ports:
      - "3308:3306"
    environment:
      - MYSQL_USER=homestack
      - MYSQL_PASSWORD=secret
      - MYSQL_DATABASE=my_database
```

## Home folder

Home folder (`/root`) is mounted from the host operating system (`mysql/<version>/home`). You can use it to store/restore your backups and other useful stuff.