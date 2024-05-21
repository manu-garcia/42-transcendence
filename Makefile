all: up

up:
	@docker compose --env-file ./env/.env -f ./docker-compose.yml -f docker-compose.development.yml up -d
down:
	@docker compose --env-file ./env/.env -f ./docker-compose.yml -f docker-compose.development.yml down --remove-orphans

upprod:
	@docker compose --env-file ./env/.env -f ./docker-compose.yml up -d
downprod:
	@docker compose --env-file ./env/.env -f ./docker-compose.yml down --remove-orphans

clean: down downprod

re: clean all

fclean-all: down downprod
	if [ -n "$$(docker ps -qa)" ]; then docker stop $$(docker ps -qa); fi
	if [ -n "$$(docker ps -qa)" ]; then docker rm $$(docker ps -qa) -f; fi
	if [ -n "$$(docker images -q)" ]; then docker rmi $$(docker images -q) -f; fi
	if [ -n "$$(docker volume ls -q)" ]; then docker volume rm $$(docker volume ls -q); fi
	docker system prune --all --force --volumes
	docker network prune --force
	docker volume prune --force

	@echo "fclean successfull"

fclean: down downprod
	@docker compose down --rmi all --volumes --remove-orphans
	@docker images | grep -E '42-transcendence-nginx|42-transcendence-frontend|42-transcendence-backend|42-transcendence-db|42-transcendence-pgadmin' | awk '{print $$3}' | xargs -r docker rmi -f
	@docker volume ls -q | grep -E 'transcendence_postgres-data|transcendence_pgadmin|transcendence_node_modules|transcendence_redis-data' | xargs -r docker volume rm

	@echo "fclean successful"

sh_frontend:
	@docker exec -it frontend sh

sh_backend:
	@docker exec -it backend sh

explore_image_filesystem:
	docker run --rm -it --entrypoint sh 5e5996cc32b6

logs:
	@echo "nginx logs:"
	@docker logs nginx
	@echo ""

	@echo "frontend logs:"
	@docker logs frontend
	@echo ""

.PHONY: all up down clean re fclean fclean-all sh_frontend logs
