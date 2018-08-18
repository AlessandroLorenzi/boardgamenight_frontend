
install:
	docker run -u $(shell id -u) --rm -v $(shell pwd):/app trion/ng-cli npm install

build:
	docker run -u $(shell id -u) --rm -v $(shell pwd):/app trion/ng-cli ng build --configuration=prod

serve:
	docker run -u $(shell id -u) --rm -v $(shell pwd):/app -p4200:4200 trion/ng-cli ng serve --host 0.0.0.0 --disable-host-check --configuration=local
