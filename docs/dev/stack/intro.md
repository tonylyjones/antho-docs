# SaaS Stack

Présentation d'une stack type que j'utilise lors de la réalisation d'un projet from scratch. Loin d'être figée, cette liste permet de donner un aperçu global de mon champ de compétences (même s'il est évident que je ne maîtrise pas l'ensemble des outils cités).

## Résumé

- Architecture: Monolithe modulaire, rare micro services
- Backend: NestJS, API Rest, GraphQL
- Frontend: React, ViteJS, React Native, Expo, Redux, Tanstack query
- Tests: Vitest, Jest, Cypress, Storybook, Testing Library
- DB: MongoDB, Postgres
- Cache: Redis
- Queues: RabbitMQ, BullMQ, Amazon SQS
- Emailing: Loops.so, AWS SES
- Tracking: Datadog, Cloud Watch, Sentry, Mixpanel, June.so
- Notifications: Firebase, OneSignal
- CI/CD: Git flow, Github actions, Gitlab runners

## Backend

### NestJS

Utilisé depuis 2020 pour la lancement de Reachmaker, NestJS est le framework que j'affectione côté backend. Sa gestion native de TypeScript et sa modularité permettent définir une architecture backend flexible et robuste.

Utilisations dans mes projets

- Reachmaker: API Rest, TypeORM avec MongoDB, JWT, Tests unitaires & End-to-end, RabbitMQ
- Refer: API GraphQL puis REST, CQRS, MongoDB, BullMQ, Redis
- Inventorizr: Migration de l'api rest générée par Loopback 3 vers Nest, CQRS, MongoDB, CQRS
- Osteo de Garde
- O'Marigot
- Belorder (en freelance)

### MongoDB & Postgres

Base documents populaire, j'ai découvert MongoDB en 2012 dès mon arrivé chez Alteom. Depuis, 90% de mes projets reposent sur un stockage MongoDB.

Depuis quelques temps, je repasse certains projets sous Postgres pour revenir aux fondamentaux de la conception de schémas relationnels et gagner en performance dans certains contextes.

### Micro services

Je prévilégie une architecture basée sur un monolithe modulaire plutôt qu'un full micro service.

Si le contexte le justifie, il est possible que je décide de sortir des fonctionnalités du monolithe afin de les passer à l'échelle de façon individuelle via une architecture serverless type AWS Lambda.

### Redis

L'utilisation d'un memcache comme Redis permet d'optimiser les performances du système en évitant d'extraire trop régulièrement les mêmes données et d'en tirer les mêmes calculs.

### Queues

J'ai utilisé différents systèmes de queues selon le contexte.

- RabbitMQ pour Reachmaker
- BullMQ + Redis, puis Amazon SQS pour Refer

Les choix vont dépendre des besoins et de la gourvenance des services déjà en place.

## Frontend

### React / React Native

React me permet développer et de maintenir les composants UI pour le web et/ou le mobile.

### UI

Côté web j'utilise régulièrement le kit Material UI, malgré ses styles pré-définis, il est aisé de personnaliser le thème afin d'y intégrer le design system.

Côté mobile, ma préférence reste à définir.

### Redux

Redux permet d'implémenter les règles métier et de les tester rapidement.

### TanStack Query

TanStack Query (ou React-Query) propose une bonne gestion des fetch de données avec fonctionnalités de cache, mutations, invalidation.

### Frameworks

Côté web, j'utilise ViteJS dans les projets les plus récents. J'ai remplacé NextJS dont les dernières versions ont perdu en réactivité dans l'expérience développeur et dont la proposition initiale de prise en charge des React Server Components m'a semblé complexe pour la valeur apportée.

La récente proposition de React router couplée aux actions de React 19 est plus intuitive pour l'introduction des RSC.

Côté mobile, Expo est de loin le framework le plus utile pour développer rapidement un app hybride. L'offre de service non obligatoire EAS ajoute un plus non négligeable en termes de gain de temps.

## Tests

Je suis un adepte du Test Driven Development qui permet à la fois de garantir une bonne couverture de test du code mais aussi et surtout de concevoir les features de manière à ce qu'elle répondent au plus juste aux besoins.

À mon sens, l'application du TDD a deux avantages principaux:

- Maximiser la simplicité en s'imposant la rigueur des baby steps
- Favoriser la communication entre les développeurs et les métiers afin s'assurer de chaque règle à valider

## Emailing

### Loops

Loops.so est un service de gestion des templates d'email et des séquences, très prisées en marketing. L'intégration via son api est très rapide pour déclencher les envois selon les événements de la plateforme (inscription, demande de mot de passe, etc).

La gestion intégrée des templates et séquences favorise la collaboration entre les équipes pluridisciplinaires.

### AWS SES

Simple Email Service est un service peu coûteux d'envoi d'emails transactionels (1$/1000 envois)

Il nécessite néanmoins de configurer les templates et les règles d'envoi dans un système entièrement géré par un profil développeur ou devops.

### Spam et réputation

Quelque soit le service utilisé, il est nécessaire de réaliser des configurations minimales pour éviter que les envoient soient filtrés par les systèmes anti spam

#### Configuration du SPF

Sender Policy Framework permet d'identifier les serveurs autorisés à envoyer les emails avec votre nom de domaine.

#### Configuration du DKIM

DomainKeys Identified Mail permet de signer les emails envoyés via un jeu de clés publique et privée. Cette signature numérique permet de valider que l'envoi a été autorisé.

#### Configuration du DMARC

Domain-based Message Authentication Reporting and Conformance défini la politique de traitement des messages qui ne vérifient pas la SPF ou le DKIM. En pratique, cela permet d'identifier l'adresse email des administrateurs qui pourront identifier une utilisation fraduleuse du nom de domaine.

#### Serveurs d'envoi

Si au lancement du pojet, les services managés comme Loops, SendGrid, Mailjet et même AWS permettent de délivrer un taux complètement acceptable d'emails aux clients et prospects.

L'évolution de votre SaaS devra prendre en considération que l'envoi de milliers d'emails transactionels par heure devront se faire via des serveurs dédiés dont vous avez le contrôle sur l'adresse IP. Cela pour des raisons de coûts et de réputation.

L'envoi d'emails commerciaux et marketing devront se faire via d'autres serveurs / services. Idéalement avec un domaine différent pour dissocier les réputations.

## Tracking

### Datadog

Pour l'instant très peu utilisé de mon côté, datadog permet de sauvegarder les logs afin d'y retrouver des éléments liés à une erreur ou un comportement non souhaité.

Dans une utilisation avancée, l'extraction des logs permet également de comprendre certains comportements utilisateurs, dissocier les coûts par service, etc.

### Cloud Watch

Gestion des logs incluse dans AWS lorsque les services sont hébergés chez eux.

### Sentry

Sentry permet d'enregistrer et tracer les erreurs dans le code qui se produisent en production.

Avec une bonne configuration, Sentry permet de retracer quel utilisateur, quel appareil, quelle version de l'app et quelle ligne de code a posé problème. Facilitant la reproduction et la résolution du problème.

Sentry s'inscrit dans une démarche pro-active de résolution des problèmes en étant automatiquement notifié à chaque crash.

### Mixpanel

Alternative plus intuitive à google Analytics, Mixpanel permet facilement de tracker des événements personnalisés via son SDK.

L'interface permet de configurer une multitude de dashboard pour suivre l'activité des utilisateurs, les tunnels de conversion, etc. De nombreux templates sont disponibles.

### June.so

Alternative à Mixpanel, l'équipe de June a fait le choix de proposer des dashboard par défaut qui correspondent aux attentes des investisseurs et VC en termes de KPI: inscription, onboarding, conversion, ahah moment, etc.

L'intégration est simple via son SDK et l'ensemble des dashboard sont hautement personnalisables pour sortir les statistiques de la plateforme.
