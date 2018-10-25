#!/usr/bin/env bash

# set -o errexit
set -o pipefail

RED=$(tput setaf 1)
GREEN=$(tput setaf 2)
YELLOW=$(tput setaf 3)
WHITE=$(tput setaf 7)

function checkPackages() {
    if [[ -n "$(which docker)" ]]; then
        echo "Docker installed"
    else
        installPackage "docker"
    fi
    if [[ -n "$(which yarn)" ]]; then
        echo "Yarn installed"
    else
        installPackage "yarn"
    fi 
}

function installPackage() {
    if [[ ! -n "$(which brew)" ]]; then
        echo "${YELLOW}====> Installing brew${WHITE}"
        /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    fi
    case "$1" in
        "docker")
            echo "${YELLOW}====> Installing docker version 18.03-ce${WHITE}"
            brew cask install https://raw.githubusercontent.com/Homebrew/homebrew-cask/4bbea3bf6e453b35079848e4f77c75d45ae38502/Casks/docker.rb
            ;;
        "yarn")
            echo "${YELLOW}====> Installing yarn version 1.7.0${WHITE}"
            brew install https://raw.githubusercontent.com/Homebrew/homebrew-core/44c669b613a38397ee974f629c2020c7dbe88f92/Formula/yarn.rb
            ;;
    esac
}

function checkBackend() {
    if [ -n "$(docker container ps -q --filter "name=soc_backend_1")" ];then
        echo "${GREEN}====> The Backend application is running${WHITE}"
    else
        echo "${RED}====> The Backend application is not running!!!!"
        echo -e "You need to start it up for the frontend application to work${WHITE}\\n"
    fi
    if [ -n "$(docker container ps -q --filter "name=soc_database_1")" ];then
        echo "${GREEN}====> The Postgres database is running${WHITE}"
    else
        echo "${RED}====> The Postgres database is not running"
    fi
}

function configureHosts() {
    IP="127.0.0.1"
    HOST="soc-sandbox.andela.com"
    STATE=$(grep -c "${IP}\\t${HOST}" /etc/hosts)
    if [ "$STATE" -eq 1 ];then
        echo "${GREEN}====> Frontend host ${HOST} already exists on this machine.${WHITE}"
    elif [ "$STATE" -gt 1 ]; then
        echo "${RED}====> More than one match for the host ${HOST} was found!${WHITE}"
    else
        echo "${YELLOW}====> Adding frontend Host ${HOST}${WHITE}"
        sudo bash -c "echo -e \"${IP}\\t${HOST}\" >> /etc/hosts"
        echo "${GREEN}====> Host added${WHITE}"
    fi
}

"$@"
