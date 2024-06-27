# Work in Progress : Ajout d'un service Coolify

Dans le cadre des missions réalisées pour [Azimutt](https://azimutt.app), j'ai été chargé de proposer un service permettant de déployer azimutt sur un serveur [Coolify](https://coolify.io/).

## Fonctionnement

En suivant la [doc](https://coolify.io/docs/knowledge-base/add-a-service), un service est un fichier `docker compose` que l'on personnalise afin de rendre une partie des variables configurables via l'interface de Coolify.

L'avantage est que Coolify s'occupe de pré-générer des valeurs par défaut pour faciliter le déploiement one-click.

## Application à Azimutt

Dans le cas d'Azimutt, le fichier docker-compose était déjà disponible dans le repo. Il met en place la base de données Postgres dont va dépendre le backend et déploie le service `azimutt-backend` à partir de l'image docker déjà buildée à chaque mise à jour.

La modification consiste à remplacer les valeurs par défaut codées en dur par des variables reconnaissables par Coolify.

## Tests

## Contribution à Coolify

## Références

https://coolify.io/docs/knowledge-base/add-a-service
