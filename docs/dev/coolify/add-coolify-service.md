# Ajout d'un service Coolify

Dans le cadre des missions réalisées pour [Azimutt](https://azimutt.app), j'ai été chargé de proposer un service permettant de déployer azimutt sur un serveur [Coolify](https://coolify.io/).

## Fonctionnement

En suivant la [doc](https://coolify.io/docs/knowledge-base/add-a-service), un service est un fichier `docker compose` que l'on personnalise afin de rendre une partie des variables configurables via l'interface de Coolify.

L'avantage est que Coolify s'occupe de pré-générer des valeurs par défaut pour faciliter le déploiement one-click.

## Application à Azimutt

Dans le cas d'Azimutt, le fichier docker-compose était déjà disponible dans le repo. Il met en place la base de données Postgres dont va dépendre le backend et déploie le service `azimutt-backend` à partir de l'image docker déjà buildée à chaque mise à jour.

Pour Coolify, j'ai adapté ce fichier afin d'y ajouter un service de storage compatible S3 (Minio) et un serveur d'envoi SMTP (bytemark/smtp). Afin de faciliter le setup, le bucket Minio par défaut est également créé si nécessaire.

J'ai également remplacé les variables d'environnement codées en dur par des variables qui permettent à Coolify de pré-générer des valeurs et de les personnaliser dans l'interface.

De plus, il faut y ajouter des entêtes de meta données pour configurer le catalogue de services et préciser le port à exposer par Caddy. [Doc ici](https://coolify.io/docs/knowledge-base/add-a-service#metadata)

### Fichier final

```yaml
# documentation: https://docs.azimutt.app/
# slogan: Next-Gen ERD: Design, Explore, Document and Analyze your database.
# tags: erd, entity-relationship diagram, database tool, database schema, diagram
# icon: svgs/azimutt.svg
# port: 4000

services:
  database:
    image: postgres
    restart: always
    container_name: azimutt-db
    environment:
      - POSTGRES_PASSWORD=$SERVICE_PASSWORD_POSTGRESQL
      - POSTGRES_USER=$SERVICE_USER_POSTGRESQL
      - POSTGRES_DB=azimutt_app
    volumes:
      - pg-data:/var/lib/postgresql/data
  storage:
    image: quay.io/minio/minio:latest
    command: server /data --console-address ":9001"
    environment:
      - MINIO_SERVER_URL=$MINIO_SERVER_URL
      - MINIO_BROWSER_REDIRECT_URL=$MINIO_BROWSER_REDIRECT_URL
      - MINIO_ROOT_USER=$SERVICE_USER_MINIO
      - MINIO_ROOT_PASSWORD=$SERVICE_PASSWORD_MINIO
    volumes:
      - minio-data:/data
  createbuckets:
    image: minio/mc
    depends_on:
      - storage
    entrypoint: >
      /bin/sh -c "
      /usr/bin/mc config host add myminio http://storage:9000 $SERVICE_USER_MINIO $SERVICE_PASSWORD_MINIO;
      /usr/bin/mc mb -p myminio/azimutt;
      /usr/bin/mc policy download myminio/azimutt;
      exit 0;
      "
  smtp:
    image: bytemark/smtp
    environment:
      - RELAY_HOST=$SERVICE_URL_SMTP
      - RELAY_PORT=587
      - RELAY_USERNAME=$SERVICE_EMAIL_SMTP
      - RELAY_PASSWORD=$SERVICE_PASSWORD_SMTP
  backend:
    container_name: azimutt-backend
    platform: linux/amd64
    restart: always
    image: ghcr.io/azimuttapp/azimutt:main
    depends_on:
      - database
      - storage
    ports:
      - 4000:4000
    environment:
      - SERVICE_FQDN_AZIMUTT
      - PHX_SERVER=true
      - PHX_HOST=$SERVICE_FQDN_AZIMUTT
      - PORT=4000
      - DATABASE_URL=ecto://$SERVICE_USER_POSTGRESQL:$SERVICE_PASSWORD_POSTGRESQL@database/azimutt_app
      - SECRET_KEY_BASE=$SERVICE_PASSWORD_64_AZIMUTT
      - FILE_STORAGE_ADAPTER=s3
      - S3_BUCKET=azimutt
      - S3_HOST=$MINIO_SERVER_URL
      - S3_KEY_ID=$SERVICE_USER_MINIO
      - S3_KEY_SECRET=$SERVICE_PASSWORD_MINIO
      - AUTH_PASSWORD=true
      - SKIP_ONBOARDING_FUNNEL=true
      - SKIP_EMAIL_CONFIRMATION=true
      - PUBLIC_SITE=false
      - EMAIL_ADAPTER=smtp
      - SMTP_RELAY=$SERVICE_URL_SMTP
      - SMTP_USERNAME=$SERVICE_EMAIL_SMTP
      - SMTP_PASSWORD=$SERVICE_PASSWORD_SMTP
      - SMTP_PORT=587
```

## Tests

Pour tester la configuration, il faut un accès à Coolify. J'ai fais le choix de déployer une instance self hosted sur Digital Ocean (VPS régular SSD, 2 CPU, 2Go à 18$/mois suffit pour tester), mais je pense que cela fonctionne également sur leur offre cloud.

Une fois dans l'interface, il faut ajouter un service à l'un de ses projets et choisir l'option "Docker Compose".

On copie/colle notre fichier YAML et valide. Enfin, il faut Deploy le service.

De là, on peut vérifier les logs et/ou lancer l'URL de déploiement pour vérifier si tout a fonctionné.

## Contribution à Coolify

Pour contribuer à Coolify afin de rendre le template disponible à tous, il faut faire une PR.

Processus classique:

- on fork le [Repo Github](https://github.com/coollabsio/coolify), en prenant soin de récupérer toutes les branches et pas seulement `main`. La PR doit être faite vers la branche `next`.
- on clone en local notre propre repository
- on bascule sur la branche `next` avec la commande `git checkout next` et on se met à jour si besoin avec `git pull`
- on se créé une branche de dev. Pour Azimutt, j'ai créé la branche `feature/add-azimutt-service`
- on y ajoute le fichier yaml dans `templte/compose` et un logo dans `public/svgs`
- on commit et push sur notre repo
- on ouvre la PR de notre branche vers `next`

[Lien vers ma PR](https://github.com/coollabsio/coolify/pull/2695)

## Références

https://coolify.io/docs/knowledge-base/add-a-service
