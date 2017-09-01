## findOneAndUpdate
  Person.findOneAndUpdate(query, updates, options, callback)

  - 3.x 4.x To return the ORIGINAL doc rather the updated doc, set the option 'new' to false. default is true. 'new': true, return the modified doc

  - 4.x To return the ORIGINAL doc rather the updated doc, set the option 'new' to true. default is false.  

## Validation error
  - 3.x type:""   it conflict with V8 javascript engine Error.type 
  - 4.x kind:""


## Query
  - 3.x call .exec() to get promise
     Person.find({}).exec().then()

  - 4.x .find() returns promise
    Person.find({}).then()