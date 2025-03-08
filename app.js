const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(connectionURL);
const dbName = 'task-prototype';

const db = client.db(dbName);
const collection = db.collection('users');

user1 = {
    name: "Mohammed Ahmed",
    age: 26,
    city: "Ismailia"
}

user2 = {
    name: "Mohammed Khalid",
    age: 30,
    city: "New York"
}

users = [{
    name: "Salma Khalid",
    age: 20,
    city: "New York"
}, 
{
    name: "Olga Schmidt",
    age: 21,
    city: "Berlin"
},
{
    name: "Boris Borisov",
    age: 27,
    city: "Moskow"
},
{
    name: "Max Mustermann",
    age: 27,
    city: "Munich"
},
{
    name: "Adam Smith",
    age: 27,
    city: "Yorkshire"
},
{
    name: "John Doe",
    age: 27,
    city: "London"
},
{
    name: "Abdul Rehman",
    age: 23,
    city: "Damascus"
},
{
    name: "Peter Levis",
    age: 27,
    city: "California"
},
{
    name: "Yuri Agafonov",
    age: 40,
    city: "Saint Petersburg"
},
{
    name: "Lionel Messi",
    age: 35,
    city: "Barcelona"
}]

async function addOne(user) {
    try{
        const result = await collection.insertOne(user);
        console.log("inserted one:", result.insertedId);
    } catch (e) {
        console.log(e);
    }
}

async function addMany(users) {
    try{
        const result = await collection.insertMany(users);
        console.log("inserted many:", result.insertedIds);
        console.log("Length of inserted many:", result.insertedCount);
    } catch (e) {
        console.log(e);
    }
}

async function findOne_by_age(age) {
    try{
        const result = await collection.findOne({age: age});
        console.log("Found one:", result);
    } catch (e) {
        console.log(e);
    }
}

async function findMany_by_age(age) {
    try{
        const result = await collection.find({age: age}).toArray();
        console.log("Found many:", result);
        console.log("Length of found many:", result.length);
    } catch (e) {
        console.log(e);
    }
}
async function findMany_by_age_limit(age) {
    try{
        const result = await collection.find({age: age}).limit(3).toArray();
        console.log("Found many:", result);
    } catch (e) {
        console.log(e);
    }
}

async function deleteOne_by_age(age) {
    try{
        const result = await collection.deleteOne({age: age});
        console.log("Deleted one:", result);

        const remainingUsers = await collection.find({}).toArray();
        console.log("Remaining users:", remainingUsers);
    } catch (e) {
        console.log(e);
    }
}

//  addOne(user1);
//  addOne(user2);

// addMany(users);

// findMany_by_age(27);

// findMany_by_age_limit(27);