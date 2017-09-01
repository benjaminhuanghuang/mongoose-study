## Relation / Association / Sub document / Nested schema 

## Validation and UT

## Virtual property
Add postCount virtual property to User . Do NOT use => function here
```
  UserSchema.virtual("postCount").get(function() {
    return this.posts.length;
  });
```


## Population Query
  - Add modifier in the query to populate the association document
  ```
  User.findOne({name:'Ben'}).populate('blogPosts').then()
  ```
  
  - Loading deeply nested associations: User.blogPosts.comments.user
  ```
  User.findOne({name:'Ben'}).populate({
    path: 'blogPosts',
    populate:{
      path: 'comments',
      model: 'comments',
      populate:{
        path:'user',
        model:'user'
      }
    } 
  }).then()
  ```

## Middleware / pre or post hooks to events
  - Encrypt password before save user
  ```
  ```

  - To delete Association
  ```
  UserSchema.pre("remove", function(next) {
    const BlogPost = mongoose.model("blogPost");
    // this === joe, joe's blog posts === this.blogPosts
     BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
  });

  ```


## Pagination / skip & limit
  
