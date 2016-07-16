# Lambbit-client

A CLI friendly file uploading & sharing system with AWS S3 and AWS Lambda.

# Requirements

- Node.js
- AWS account

# Setup

Install lambbit-client by `npm` command.

```
$ npm install lambbit-client
```

Next, you should setup Lambda script according to https://github.com/mozamimy/lambbit-lambda

# Usage

## Quick start

```
$ lammbit-client --bucket your_bucket_name --file /path/to/file/to/upload --to receiver@example.com --from sender@example.com --subject 'Gift for you!' --body 'Check it out :D' --expire 300
```

## Options

```
$ lammbit-client --help

  Usage: lammbit-client [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -b, --bucket <name>     bucket name
    -f, --file <path>       bile path to upload to S3
    -e, --expire <time>     expire time (seconds)
    -t, --to <address>      to address
    -r, --from <address>    from address
    -s, --subject <string>  mail subject
    -o, --body <string>     mail body
```

# Lisence

MIT
