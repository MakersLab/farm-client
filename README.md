# Farm - client
 Application that drives 3D printer farm

Version 0.5.0

# Requirements

- NodeJS 6.10.3
- Yarn

## Installing NodeJS

    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y nodejs

## Installing Yarn

    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install yarn

# Project setup

Need to have NodeJS and Yarn installed

All commands which contain yarn are supposed to be run at `client` folder

go to client folder and run

    yarn install


## Building for development

    yarn run dev

Starts server with Hot Module Replacement(HMR) which enables faster development

Server is running at [http://localhost:8080](http://localhost:8080)

## Building client for production

run

    yarn run prod

Build is stored at `build` folder
