# $match

L'opérateur `$match` permet de filtrer les documents en entrée du pipeline. Il est conseillé de le placer le plus en amont possible.

Sa syntaxe est similaire à celle de `db.collection.find`

## Exemples

Trouver les commandes avec une promotion

```
db.orders.aggregate([
    {
        $match: {
            discount: { $exists: true, $gt: 0 }
        }
    }
])
```

Filtrer selon le résultat d'une expression

```
db.orders.aggregate([
    {
        $match: {
            $expr: {
                $gt: [
                    "$total",
                    { $sum: { $map: {
                        input: "$items",
                        as: "item",
                        in: { $multiply: ["$$item.quantity", "$$item.price"] }
                    }}}
                ]
            }
        }
    }
])
```

Cas où le document contient un tableau

```
{
    "_id": 1,
    "student": "John",
    "grades": [
        { "subject": "math", "grade": 75 },
        { "subject": "english", "grade": 85 },
        { "subject": "science", "grade": 95 }
    ]
}
```

Pour filtrer selon le contenu du tableau `grades`, on utilise la notation pointée.

```
db.school.aggregate([
    {
        $match: {
            "grades.subject": "science",
            "grades.grade": { $gt: 90 }
        }
    }
])
```
