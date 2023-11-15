## Root directory
ROOT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

## Include env file
-include .env

## Set 'bash' as default shell
SHELL := $(shell which bash)

## Set 'help' target as the default goal
.DEFAULT_GOAL := help

## Test if the dependencies we need to run this Makefile are installed
DOCKER := DOCKER_BUILDKIT=1 $(shell command -v docker)
DOCKER_COMPOSE := COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 $(shell command -v docker-compose)
DOCKER_COMPOSE_FILE := $(ROOT_DIR)/docker/docker-compose.yml
NPM := $(shell command -v npm)

.PHONY: help
help: ## Show this help
	@egrep -h '^[a-zA-Z0-9_\/-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort -d | awk 'BEGIN {FS = ":.*?## "; printf "Usage: make \033[0;34mTARGET\033[0m \033[0;35m[ARGUMENTS]\033[0m\n\n"; printf "Targets:\n"}; {printf "  \033[33m%-25s\033[0m \033[0;32m%s\033[0m\n", $$1, $$2}'

.PHONY: init
init: ## Create env files
	@echo "📁 Creating files..."
	cp ./.env.sample ./.env
	cp ./.env.sample ./.env.development
	cp ./.env.sample ./.env.production

.PHONY: requirements
requirements: ## Check if the requirements are satisfied
ifndef DOCKER
	@echo "🐳 Docker is not available. Please install docker."
	@exit 1
endif
ifndef DOCKER_COMPOSE
	@echo "🐳 docker-compose is not available. Please install docker-compose."
	@exit 1
endif
ifndef NPM
	@echo "📦 npm is not available. Please install npm."
	@exit 1
endif
	@echo "🆗 The necessary dependencies are already installed!"

TAG ?= prod

.PHONY: install
install: requirements ## Install the project
	@echo "🍿 Installing dependencies..."
	@npm install

.PHONY: start
start: install ## Start application in development mode
	@echo "▶️ Starting app in development mode..."
	@npm run dev

.PHONY: db-up
db-up: ## Start database container
	@echo "▶️ Starting database (Docker)..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) --env-file .env up -d db db-pgweb

.PHONY: db-connect
db-connect: ## Connect to the database
	@echo "▶️ Connecting..."
	docker exec -it db psql --port=${DB_PORT} --username=${DB_USER} --password --dbname=${DB_NAME}

.PHONY: db-down
db-down: ## Stop database container
	@echo "🛑 Stopping database (Docker)..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) --env-file .env stop db db-pgweb

.PHONY: clean
clean: ## Clean all container resources
	@echo "🧼 Cleaning all resources..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) --env-file .env down --rmi local --volumes --remove-orphans

.PHONY: logs
logs: ## Show logs for all or c=<name> containers
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) --env-file .env logs --tail=100 -f $(c)

