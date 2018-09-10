DOCKER_DEV_COMPOSE_FILE := docker/dev/docker-compose.yml

.PHONY: help


## Show help
help:
	@echo ''
	@echo 'Usage:'
	@echo "${YELLOW} make ${RESET} ${GREEN}<target> [options]${RESET}"
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
    	message = match(lastLine, /^## (.*)/); \
		if (message) { \
			command = substr($$1, 0, index($$1, ":")-1); \
			message = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW_S}%-$(TARGET_MAX_CHAR_NUM)s${RESET} %s\n", command, message; \
		} \
	} \
    { lastLine = $$0 }' $(MAKEFILE_LIST)
	@echo ''

## Start the frontend application
start:status
	@ yarn install
	@ yarn sandbox
	@ echo "${YELLOW}====> Building the andela societies frontend image.${WHITE}"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) build --no-cache frontend
	@ echo "${GREEN}====> Image built. Image name is \"soc-frontend:sandbox\"${WHITE}"
	@ echo "${YELLOW}====> Starting the application${WHITE}"
	@ docker-compose -p soc -f $(DOCKER_DEV_COMPOSE_FILE) up --force-recreate -d frontend
	@ echo "${YELLOW}====> Application is running at \"http://soc-sandbox.andela.com:4021/\"${WHITE}"
	@ open http://soc-sandbox.andela.com:4021/

## Stop the frontend application
stop:
	@ echo "${YELLOW}====> Stopping frontend container if it is running${WHITE}"
	@ docker-compose -p soc -f $(DOCKER_DEV_COMPOSE_FILE) stop
	@ echo "${YELLOW}====> Removing stopped container for the frontend if the it exists${WHITE}"
	@ docker-compose -p soc -f $(DOCKER_DEV_COMPOSE_FILE) rm -f
	@ echo "${YELLOW}====> Removing image for the frontend application${WHITE}"
	@ docker images -q --filter "reference=soc-frontend:sandbox" | xargs -I ARGS docker image rm ARGS
	@ echo "${GREEN}====> Container and image removed.${WHITE}"

## Destroy the shared network
tear:stop
	@ echo "${YELLOW}====> Delete shared network for the frontend and the backend.${WHITE}"
	@ docker network ls -q --filter "name=soc_soc-network" | xargs -I ARGS docker network rm ARGS
	@ echo "${GREEN}====> Resources destroyed.${WHITE}"

## Manage the frontend host and checking the backend application and database are running.
status:
	@ chmod +x scripts/sandbox.sh && scripts/sandbox.sh checkPackages
	@ echo "${YELLOW}====> Checking the backend and database containers${WHITE}"
	@ chmod +x scripts/sandbox.sh && scripts/sandbox.sh checkBackend
	@ echo "${YELLOW}====> End of backend and database check${WHITE}"
	@ echo "${YELLOW}====> Managing host for the frontend${WHITE}"
	@ chmod +x scripts/sandbox.sh && scripts/sandbox.sh configureHosts

# COLORS
GREEN  := `tput setaf 2`
YELLOW := `tput setaf 3`
WHITE  := `tput setaf 7`
YELLOW_S := $(shell tput -Txterm setaf 3)
NC := "\e[0m"
RESET  := $(shell tput -Txterm sgr0)
