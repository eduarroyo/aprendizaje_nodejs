/*
 Learn MongoDB
───────────────
 FIND PROJECT
 Exercise 4 of 9

Here we will learn how to search for documents but only fetch the fields
we need. Also known as projection in MongoDB

Use the parrots collection to find all documents where age
is greater than the first argument passed to your script.

The difference from the last lesson will be that we only want the
name and age properties

Using console.log, print the documents to stdout.

-------------------------------------------------------------------------------

## HINTS

To find a document or documents, one needs to call find() on the collection.

Find is a little bit different than what we are used to seeing.

Here is an example:

    collection.find({
        name: 'foo'
    }, {
        name: 1,
        age: 1,
        _id: 0
    }).toArray(function(err, documents) {
    })

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.

## Resource:

  * http://docs.mongodb.org/manual/reference/method/db.collection.find/#explicitly-exclude-the-id-field
*/

var mongo = require('mongodb').MongoClient;
var ageFilter = parseInt(process.argv[2]);

mongo.connect('mongodb://localhost:27017/learnyoumongo', function (err, db) {
    'use strict';
    var collection;

    if (err) {
        console.log("ERROR");
        console.log(err);
    } else {
        collection = db.collection('parrots');
        collection.find(
            // Proyección: registrso con "age" mayor ($gt) que ageFilter.
            {age: {$gt: ageFilter}},
            // Selección: poner a 1 los campos incluidos y a 0 los no incluidos.
            // Parece que hay que poner explícitamente los campos que no queremos seleccionar
            {name: 1, age: 1, _id: 0}
        ).toArray(function (err, parrots) {
            // if(err) throw err (de la solución)
            if (err) {
                console.error("Error: ", err);
            } else {
                console.log(parrots);
            }
            db.close();
        });
    }
});