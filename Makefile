DC = docker-compose -f ../compose/docker-compose.yml

help:
	@echo "up - Starts all services defined in docker-compose.yml in detached mode."
	@echo "down - Stops and removes containers, networks, volumes, and images created by up."
	@echo "stop - Stops all running services without removing them."
	@echo "start - Starts services that were stopped using stop."
	@echo "migrate - Runs Django migrations for the backend service."
	@echo "migrations - Generates new migrations based on changes to Django models."
	@echo "start-server - Starts the backend service if it was previously stopped."
	@echo "stop-server - Stops the backend service without removing the container."
	@echo "start-client - Starts the frontend service if it was previously stopped."
	@echo "stop-client - Stops the frontend service without removing the container."
	@echo "logs - Follows log output from all the services."

up: ## Starts all services in detached mode
	@$(DC) up -d

down: ## Stops and removes containers, networks, volumes, and images
	@$(DC) down

stop: ## Stops all running services
	@$(DC) stop

start: ## Starts stopped services
	@$(DC) start

migrate: ## Runs Django migrations
	@$(DC) exec server python manage.py migrate

migrations: ## Creates new migrations based on changes to models
	@$(DC) exec server python manage.py makemigrations

start-server: ## Starts the Django backend service
	@$(DC) start server

stop-server: ## Stops the Django backend service
	@$(DC) stop server

start-client: ## Starts the React client service
	@$(DC) start client

stop-client: ## Stops the React client service
	@$(DC) stop client

logs: ## Displays log output from all services
	@$(DC) logs -f

.PHONY: help up down stop start migrate migrations start-server stop-server start-client stop-client logs

.DEFAULT_GOAL := help
