# MailHog

[MailHog](https://github.com/mailhog/MailHog) is a service to be used for web and api based SMTP testing.

## Usage

### Build

No need of building.

### Run

```sh
$ homestack up -d mailhog
```

### Port mapping

MailHog uses `8025` by default. Make sure you map it with the port on the host operating system and visit http://localhost:8025

### Connect SMTP

Use `mailhog` as host and `1025` as the SMTP port.
