## Sub document / Nested schema 

## Validation and UT

## Virtual property
Add postCount virtual property to User . Do NOT use => function here
```
  UserSchema.virtual("postCount").get(function() {
    return this.posts.length;
  });
```

## Relation / 

## Middleware
