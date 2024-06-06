---
sidebar_position: 2
---

# Reachmaker

Reachmaker est un outil SaaS B2B destiné à faciliter la rencontre et la gestion de ses partenariats business.

## Infos

- Société: Reachmaker SAS
- Création: 2020
- Statut: Co-fondateur associé
- Rôle: CTO hands-on
- https://reachmaker.com
- Période: Mai 2020 à Septembre 2022

## Réalisations

- Plateforme B2B en self service incluant moteur de matching, messagerie intégrée, annonces & templates de gestion de partenariats - https://app.reachmaker.com/
- Lead magnet "Calculez la valeur de votre contenu" - https://calculator.reachmaker.com
- Back office de gestion des données
- Conception, développement, CI/CD devops

## Contexte

Associé co-fondateur avec Caroline Mignaux, conférencière, podcasteuse et multi entrepreneure à succès, nous lançons Reachmaker en 2020, projet qu'elle a imaginé durant ses 10 ans d'expérience en tant qu'experte marketing & growth.

À l'époque, nous travaillons dans la même société sans se connaître personnellement. Caroline me contact et me présente son idée, un premier projet entreprenarial pour lequel elle cherche un sparing partner capable de prendre en charge l'ensemble de l'IT.

_Répartition des rôles_

Caroline: CEO, stratégie, vision, prospection de clients, échanges avec les futurs partenaires

Anthony: CTO, conception, développement de la plateforme et des outils, gestion de l'IT

## Oragnisation de travail

En tant que co-fondateur, je ne me rémunère pas directement avec Reachmaker, j'ai de l'equity.

Je travaille à temps partiel sur Reachmaker, j'effectue des missions en freelance pour me financer.

Nous n'avons pas de locaux, nous travaillons en full remote.

Je suis autonome sur ma ligne de nage. Nous effectuons une weekly en co-fondateurs pour les choix autours du produit et des daily avec nos équipes lorsque nous avons des renforts de stagiares ou alternants.

Caroline démarre son personal branding autours de l'entreprenariat, lance ses premiers épisodes du podcast Marketing Square, réalise des lives réguliers sur LinkedIn et Clubhouse et commence à cumuler les abonnés.

Seul développeur, je m'applique à suivre les bonnes pratiques du Git Flow pour gérer les repositories et la CI/CD via GitLab.

## Milestones

- Mai/Juin 2020: Prise de contact, échanges sur l'organisation
- Juillet 2020: Début du développement, recrutement stagiaire UX/UI pour la conception
- Septembre 2020: Lancement du MVP avec création de compten matching de profils et messagerie en temps réelle - Beta gratuite, +1000 inscriptions
- Ocotbre 2020: Ajout des annonces de partenariat
- Novembre 2020: Mise en place du Back office
- Mars 2021: Lancement des abonnements, intégration du paywall
- Mai/Juin 2021: Développement et lancement du lead magnet Reach Calculator
- Juin 2021 à Septembre 2022: Maintenance logicielle, itérations succéssives, recherche du Product Market Fit

Depuis septembre 2022, la plateforme et les outils sont toujours en ligne et accessibles. Avec Caroline, nos activités communes ont bifurqué vers le projet Refer avec lequel nous souhaitions fusionner dans un premier temps.

## Chiffres

- +1600 entreprises
- Environ 500 clients payants
- 200 annonces de partenariat
- +3000 messages échangés
- +4000 charmes envoyés
- 3500 leads générés

## Stack

### Code

- Backend: NodeJS, Framework NestJS, TypeScript, REST API, JWT, MongoDB
- Frontend: React, React Router, Parcel -> Create React App -> ViteJS, Recoil -> Jotai, Material UI
- Back office: NextJS, Material UI, GraphQL
- Workers JS/TS: Matching, Notifications sender (email & push), Cron jobs

### Outils externes

- Feedback & customer care : Intercom
- Crashes & détection d'anomalies : Sentry
- Abonnements: Stripe
- Notifications: OneSignal
- Versioning & CI/CD: Gitlab
- Hébergement: Netlify, Digital Ocean -> AWS, Vercel, Heroku
- Tasks & Queues: RabbitMQ
- Data: Mongo Atlas

### Choix techniques

Il s'agit de ma première expérience avec NestJS côté backend, je recherchais un framework pour remplacer Loopback que j'utilisais en version 3 et dont la v4 a totalement changé de paradigme.

Le MVP a été lancé via Parcel sur Netlify en trial pour réduire les coûts de lancement. De même que la base MongoDB utilisée est un cluster trial chez MongoDb Atlas.

Le backend est déployé sur un VPS d'entrée de gamme chez Digital Ocean.

Le code est répertorié sur un compte GitLab, les projets sont privés. Les premières expérimentations de CI/CD reposent sur des runners custom tournant sur des machines que j'ai à disposition chez moi.

Le back office est lancé en NextJS afin d'expérimenter les fonctionnalités d'API intégrée au framework. J'y fais mes premières expérimentations avec GraphQL. Par la suite, le back office rebascule en mode full frontend consommant l'API exposée par NestJS. Le back office est hébergé sur Vercel, plan Hobby.

Une première grosse refonte tech est réalisé en passant de Parcel v1 à Create React App. Parcel v1 commence à poser des problèmes de performances dans l'expérience développeur et lors de déploiements.

L'intégration du paiement via Stripe se fait dans un premier temps via la librarie de composants Elements pour prévilégier une intégration complète de l'expérience utilisateur. Cependant la maintenance nécessaire fait qu enous basculons vers Stripe Checkout afin de réduire la charge de travail et gagner en flexibilité sur la confuguration des options de paiement (offres, codes promos, etc).

L'hébergement migre petit à petit des VPS de Digital Ocean vers des services managés chez AWS pour s'assurer une configuration d'auto scaling. L'environnement de staging est migré vers Heroku pour profiter des services PaaS sans avoir à maintenir les runners spécifiques.
