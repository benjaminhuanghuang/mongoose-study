## Sub document / Nested schema 

## Virtual Field
```
  UserSchema.virtual("postCount").get(function() {
    return this.posts.length;
  });
```