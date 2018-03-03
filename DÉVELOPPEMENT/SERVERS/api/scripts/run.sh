#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
SRC="$DIR/.."

# Get to the api folder
cd "$SRC"

# Run memcached (needed)
memcached -d

# Get all the dependencies
composer install

# Set the database
php artisan migrate

if [ -z "$1" ]; then
    php -S 10.212.97.188:8080 -t public/
else
    php -S "localhost:$1" -t public/
fi

