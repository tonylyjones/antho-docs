# $project

L'opérateur `$project` permet d'inclure ou d'exclure des champs de la sélection.

Comme `$addFields` il permet également d'ajouter des champs.

## Utilisation

### Règles de projection

Il faut soit définir les champs à inclure, auquel cas les autres champs ne sont pas sélectionnés.

Ici on ne sélectionne que les champs `name`, `status` et `_id` inclus par défaut.

```
db.collection.aggregate([
    {
        $project: {
            name: 1,
            status: 1
        }
    }
])
```

Ou exclure les champs spécifiques, auquel cas les champs non listés sont retournés

```
db.collection.aggregate([
    {
        $project: {
            status: 0
        }
    }
])
```

On ne peut pas mixer les inclusions et les exclusions dans la même projection, à l'exception de `_id` qu'il faut exclure explicitement.

### Ajout de champ

Pour ajouter un champ, la syntaxe est similaire à `$addFields`

```
db.collection.aggregate([
    {
        $project: {
            name: 1,
            totalPrice: { $multiply: ["$price", "$quantity"] }
        }
    }
])
```

## Performance

Les calculs utilisés lors de l'ajout de champ utilisent la RAM de la machine. Dans le cas d'opération sur un grand volume de données, il faut anticiper la consommation de mémoire.
