all: up

up:
	@docker-compose -f ./docker-compose.yml up -d

down:
	@docker-compose -f ./docker-compose.yml down

clean: down

re: clean all

fclean: down
	if [ -n "$$(docker ps -qa)" ]; then docker stop $$(docker ps -qa); fi
	if [ -n "$$(docker ps -qa)" ]; then docker rm $$(docker ps -qa) -f; fi
	if [ -n "$$(docker images -q)" ]; then docker rmi $$(docker images -q) -f; fi
	if [ -n "$$(docker volume ls -q)" ]; then docker volume rm $$(docker volume ls -q); fi
	docker system prune --all --force --volumes
	docker network prune --force
	docker volume prune --force

	@echo "fclean successfull"

sh_frontend:
	@docker exec -it frontend sh

explore_image_filesystem:
	docker run --rm -it --entrypoint sh 5e5996cc32b6

logs:
	@echo "nginx logs:"
	@docker logs nginx
	@echo ""

	@echo "frontend logs:"
	@docker logs frontend
	@echo ""

.PHONY: all up down clean re fclean sh_frontend logs