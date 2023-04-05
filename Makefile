.PHONY: envrionment build clean start

# Load env
ifneq (,$(wildcard ./.env))
include .env
VARS:=$(shell sed -ne 's/ *\#.*$$//; /./ s/=.*$$// p' .env )
$(foreach v,$(VARS),$(eval $(shell echo export $(v)="$($(v))")))
endif

environment:
	npm install

build:
	npm run build

clean:
	npm run angry

format:
	npm run lint

start:
	npm run dev
