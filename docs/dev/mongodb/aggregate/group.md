# $group

Cet opérateur permet de grouper les documents selon une clé et d'effectuer des opérations d'aggrégation sur ces groupes.

## Exemple

Calcul de la somme totale par status

```
db.orders.aggregate([
    { $group: { _id: "$status", total: { $sum: "$amount" } } }
])
```

Supposons que nous avons ces commandes :

```
{_id: 1, status: "pending", amount: 1400}
{_id: 2, status: "pending", amount: 4920}
{_id: 3, status: "confirmed", amount: 5990}
{_id: 4, status: "delivered", amount: 6700}
{_id: 5, status: "confirmed", amount: 499}
{_id: 6, status: "canceled", amount: 4999}
```

L'exécution du pipeline d'aggregation donnera :

```
[
    {_id: "pending", total: 6320},
    {_id: "confirmed", total: 6489},
    {_id: "delivered", total: 6700},
    {_id: "canceled", total: 4999},
]
```
