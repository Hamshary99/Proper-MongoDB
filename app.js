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

async function insertOne(user) {
    try {
        const result = await collection.insertOne(user);
        console.log("inserted one:", result.insertedId);
    } catch (e) {
        console.log(e);
    }
}

async function insertMany(users) {
    try {
        const result = await collection.insertMany(users);
        console.log("inserted many:", result.insertedIds);
        console.log("Length of inserted many:", result.insertedCount);
    } catch (e) {
        console.log(e);
    }
}

async function findOne_by_age(age) {
    try {
        const result = await collection.findOne({ age: age });
        console.log("Found one:", result);
    } catch (e) {
        console.log(e);
    }
}

async function findMany_by_age(age) {
    try {
        const result = await collection.find({ age: age }).toArray();
        console.log("Found many:", result);
        console.log("Length of found many:", result.length);
    } catch (e) {
        console.log(e);
    }
}
async function findMany_by_age_limit(age) {
    try {
        const result = await collection.find({ age: age }).limit(3).toArray();
        console.log("Found many:", result);
    } catch (e) {
        console.log(e);
    }
}

async function deleteOne_by_age(age) {
    try {
        const result = await collection.deleteOne({ age: age });
        console.log("Deleted one:", result);

        const remainingUsers = await collection.find({}).toArray();
        console.log("Remaining users:", remainingUsers);
    } catch (e) {
        console.log(e);
    }
}

async function deleteOne_by_Id(theId){
    try{
        const objectId = new mongodb.ObjectId(theId);
        const result = await collection.deleteOne({
            _id: objectId
        });
        console.log("Deleted one:", result);
        console.log("Deleted count:", result.deletedCount);
    }
    catch(e){
        console.log(e);
    }
}

async function deleteMany_by_age(age){
    try{
        const result = await collection.deleteMany({
            age: age
        })
        console.log("Deleted many:", result.deletedCount)
    }
    catch(e){
        console.log(e);
    }
}

async function delete_all(){
    try{
        const result = await collection.deleteMany({});
        console.log("Deleted many:", result.deletedCount)
    }
    catch(e){
        console.log(e);
    }
}
// Update operations
// $set - modify the value of a field
// $inc - increment the value of a field
// modified count is to determine how many documents were modified
/*
db.collection("users").updateOne({__id:objectId}, {
        $set: {name: "Osama the man"},
        $inc: {age: 5}
    }).
    then((data1)=> {
        // instead of using callback we use .then and .catch as promises 
        //unless we want an async function
        console.log(data1.modifiedCount);
    }).
    catch((err) => {
        console.log(err);
    })
*/

async function updateOne_by_id(theId, userName, userIncrementedAge) {
    try {
        const objectId = new mongodb.ObjectId(theId);
        const result = await collection.updateOne({ _id: objectId }, {
            $set: { name: `${userName}` },
            $inc: { age: userIncrementedAge }
        });
        //console.log("Updated one:", result);
        console.log("Modified count:", result.modifiedCount);
    } catch (e) {
        console.log(e);
    }
}


async function updateFirstFour(newName, age){
    try{
        const firstFourUsers = await collection.find({}).limit(4).toArray();

        for(const user of firstFourUsers){
            const result = await collection.updateOne({ _id: user._id }, {
                $set: {name: `${newName}`},
                $inc: {age: age}
            });
            console.log("Modified count:", result.modifiedCount);
        }
    } catch (e) {
        console.log(e);
    }
}

async function updateMany_age(age){ 
    try{
        // if we want to update all documents we let the brackets empty
        const result = await collection.updateMany({},{
            $inc: {age: age}
        })
        console.log("Modified count:", result.modifiedCount);
    }
    catch(e){
        console.log(e);
    }
}


/* 1st lecture's task */
// insertOne(user1);
// insertOne(user2);

// insertMany(users);

// findMany_by_age(27);

// findMany_by_age_limit(27);


/* 2nd lecture's task */


insertOne(user1);
insertOne(user2);
insertMany(users);
findMany_by_age(27);
findMany_by_age_limit(27);

const firstId = "67cee92dbe02b17ebcccc712";
const secondId = "67cee92dbe02b17ebcccc713";
const thirdId = "67cee92dbe02b17ebcccc714";
const fourthId = "67cee92dbe02b17ebcccc715";
const firstFour = [firstId, secondId, thirdId, fourthId];

updateOne_by_id(firstFour[0], "Omar Ahmed", 4);
updateOne_by_id(firstFour[1], "Mostafa Labib", 4);
updateOne_by_id(firstFour[2], "Adel Imam", 4);
updateOne_by_id(firstFour[3], "Salazar Pedro", 4);

updateMany_age(14);
deleteMany_by_age(41);

// to delete all
// delete_all();