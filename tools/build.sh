#!/bin/bash


composer install
bin/console d:s:u --force
yarn install
yarn build
echo "Project was successfully built!"
