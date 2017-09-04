const { MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/node-todo', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connect to MongoDB');

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('xxxxxxx')
  },{
    $set:{
      name:'Andrew'
    },
    $inc:{
      age:1
    }
  })

})