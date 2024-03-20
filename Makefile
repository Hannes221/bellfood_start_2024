.PHONY: deploy

deploy:
	ansible-playbook -i github-deployment/inventory.yml --vault-id azureuser@~/.ansible-vault-pw ./github-deployment/playbook.yml -vv

deploy-ci:
	ansible-playbook -i github-deployment/inventory.yml --vault-id ./github-deployment/host_vars/vault.yml ./github-deployment/playbook.yml -vv