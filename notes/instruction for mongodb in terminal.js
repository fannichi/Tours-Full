// use <database-name> ex : use tours-test

// insert a document in a collection
// db.tours.insertOne({name: 'test', price: 100})

// pull the documents from a collection:
// db.tours.find()

// show all the databases that we have
// show dbs

// show the current database
// db

// show all the collections in the current database
// show collections

// Filtering documents (Querying documents) using or operator
// db.tours.find({$or: [{ price: { $gt: 500 } }, { rating: { $gte: 4.8 } }]})

// Filtering documents (Querying documents) using and operator
// db.tours.find({ price: { $gt: 500 }, rating: { $gte: 4.8 } })

// update a document
// db.tours.updateOne({ name: 'The Forest Hiker' }, { $set: { price: 200 } }) // update the first document that matches the query

// update multiple documents
//  db.tours.updateMany({ price: { $gt: 500 } }, { $set: { price: 500 } }) // update all the documents that matches the query

// replace a document
// db.tours.replaceOne({ name: 'The Park Camper' }, { name: 'The Park Camper', price: 1000 })

//delete a document
// db.tours.deleteOne({ name: 'The Park Camper' })

// delete multiple documents
// db.tours.deleteMany({ price: { $gte: 1000 } })

// delete all the documents in a collection
// db.tours.deleteMany({})

//k7BYwj9mo2d01F58
//uceeffannichi
// sarawlaw123@

// what is mongoose? it is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
