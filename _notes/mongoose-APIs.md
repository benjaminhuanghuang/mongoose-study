## Mongoose provide APIs on Model Class and Model Instance

## Create
   
   ```
   const driver = new Driver({ email: "t@t.com", driving: false });
   driver.save()
   .then(()=>{
     const url = `/api/drivers/${driver._id}`;    // driver._id was used as string here 
   })
  ```
## Read
  - FindOne vs FindById
  Artist.findOnd({_id: _id})

  - Class find
  ```
   User.find({ name: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());  // _id is Object
        done();
      });
  ```


## Update
  Model Class API
  - update
  ```
  User.update({name:'Joe'}, {age: 30})

  User.update({name:'Joe'}, {$inc: {age:1}})
  
  ```
  - findeOneAndUpdate
  
  - findeByIdAndUpdate
  
  Model Instance API
  - update
  - set & save


## Delete
  Model Class API
  - remove
  - findeOneAndRemove
  - findeByIdAndRemove
  Model Instance API
  - remove


## Pagination
  
  User.find({}).sort({ name: 1 }).skip(1).limit(2)   # 1: ascending  -1: descending
   
    