# $addFields

Permet d'ajouter un ou plusieurs champs aux documents qui peuvent être statiques ou le résultat d'un calcul.

Il permet également de réinitialiser les champs si besoin.

## Exemples

Supposons que l'on a une collection de `students`

```
{ "_id": 1, "name": "Alice", "age": 23 }
{ "_id": 2, "name": "Bob", "age": 27 }
```

Il est possible d'ajouter un champ statique status à tous les documents sélectionnés

```
db.students.aggregate([
    {
        $match: { /* whatever */ }
    }
    {
        $addFields: {
            status: "active"
        }
    }
])
```

Il est également possible d'ajouter un champ dynamique, par exemple `isAdult` qui vérifie une condition

```
db.students.aggregate([
    {
        $addFields: {
            isAdult: { $gte: ["$age", 18] }
        }
    }
])

```

Dans une utilisation plus avancée, on peut utiliser les opérateurs de calcul. Exemple si on a des `products`

```
{ "_id": 1, "name": "Laptop", "price": 1000, "taxRate": 0.20 }
{ "_id": 2, "name": "Keyboard", "price": 50, "taxRate": 0.20 }
```

On peut calculer le prix total en ajoutant au prix, le facteur de la taxe (`$price` multiplié par 1 + `$taxRate`)

```
db.products.aggregate([
    {
        $addFields: {
            totalPrice: { $multiply: ["$price", { $add: [1, "$taxRate"] }] }
        }
    }
])
```

Autre cas d'usages:

- ajouter le champ `fullName` en concaténant `firstName` et `lastName`.

```
db.orders.aggregate([
    {
        $addFields: {
            "customer.fullName": { $concat: ["$customer.firstName", " ", "$customer.lastName"] }
        }
    }
])
```

- calculer la quantité totale à partir d'un tableau du document

```
{
    "_id": 1,
    "customer": { "firstName": "John", "lastName": "Doe" },
    "items": [ { "product": "Laptop", "quantity": 1 }, { "product": "Keyboard", "quantity": 2 } ]
}
```

```
db.orders.aggregate([
    {
        $addFields: {
            totalQuantity: { $sum: "$items.quantity" }
        }
    }
])
```
