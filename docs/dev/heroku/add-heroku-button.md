# Ajout d'un bouton Heroku Deploy

Dans le cadre des missions réalisées pour [Azimutt](https://azimutt.app), j'ai été chargé d'intégrer le bouton "Deploy to heroku" permettant de lancer l'app directement sur Heroku avec un minimum de configuration.

## Fonctionnement

Pour ajouter un bouton Heroku à son repo, il faut ajouter un fichier `app.json` à la racine de celui-ci. (Pas terrible comme nommage, rien n'indique que c'est spécifique Heroku).

Ce fichier permet de définir les meta données du déploiement: nom, description, logo, tags. La façon de le déployer, les éventuels addons et les variables d'environnement.

## Application à Azimutt

### Environnement d'éxecution

Par défaut, Heroku tente de déployer le projet tel de manière dynamique en détectant la technilogie sous-jacente. S'il détecte du node, il va utiliser un environmment node. Idem s'il détecte du Python.

Azimutt étant un mono-repo avec des dépendances fortes comme Elixir et Elm qui nécessitent l'installation de paquets linux, l'environnement d'exécution sera un container `docker`.

Pour cela, il faut préciser l'option `"stack": "container"` dans la configuration et ajouter le fichier `heroku.yml` à la racine du repo pour indiquer à Heroku comment builder le container (Ici on indique simplement qu'on a un Dockerfile)

### Addons

Pour proposer un déploiement simple afin de faciliter la découverte d'Azimutt, j'ai configuré les services nécessaires au bon fonctionnement sous la forme d'addons proposés par Heroku :

- `heroku-postgresql` comme base de donne Postgres
- `ah-s3-object-storage-stackhero` comme storage compatible S3
- `mailgun` comme serveur d'envoi SMTP

### Variables d'environnement

Dans le fichier `app.json`, on peut configurer les variables d'environnement nécessaires au setup. Dans le cas d'Azimutt, j'ai indiqué les variables minimales pour le fonctionnement et configuré celles qui sont spécifique au déploiement Heroku (S3, mailgun, etc)

### Limitations

#### Nom de host

Azimutt a besoin de connaître l'URL de base du serveur Phoenix pour spécifier des liens vers celui-ci. Sous Heroku, il n'est pas possible de récupérer l'URL qui va être créée avant le déploiement ou via une variable dynamique.

#### Variables d'environnement des addons

Les addons ajoutent des variables d'environnement à la configuration.

Variables qu'il faut reprendre dans notre code.

Il est possible de configurer un préfixe pour chaque Addon afin de maximiser la compatibilité.

Par contre, lorsqu'il y a plusieurs variables, elles sont identifiées par des sufixes spécifiés par les développeurs des addons.

Ainsi, il faut parfois ré-adapter son l'addon.

Pour palier à ce problème, j'ai indiqué dans la doc d'Azimutt comment configurer ou copier les variables d'environnement afin de les adapter au code.

## Ajout du bouton

Afin d'ajouter le bouton, il suffit de copier / coller le code fourni par Heroku dans son `readme.md`

```md
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://www.heroku.com/deploy)
```

Par défaut, l'url `heroku.com/deploy` identifie le repo de base via le `referrer`. Ce qui est très pratique pour tester sur la branche de développement avant de merge vers la branche principale.

Sinon, il est possible de personnaliser la branche à utiliser avec le paramètre `template`.

## Tests

Pour tester, on affiche le `readme` dans GitHub. Sur la bonne branche si on ne bosse pas sur la principale.

On clic dessus et arrive sur Heroku. On peut vérifier la configuration de base et/ou lancer un déploiement complet pour tester.

On peut également se configurer une URL de test si on souhaite pré-remplir des variables d'envrionnement.

Ex pris dans la doc officielle: `https://www.heroku.com/deploy?template=https://github.com/rauchg/slackin/tree/0.5.1&env[SLACK_SUBDOMAIN]=testdomain`

## Références

https://devcenter.heroku.com/articles/heroku-button
