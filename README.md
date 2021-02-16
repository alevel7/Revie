# REVIE PLATFORM

Revie is a hypothetical platform where users can sign up with their basic information and post reviews about apartments they've previously lived in.

There are 3 kinds of endpoints to work with

- [Users](#users)
- [Apartments](#apartments)
- [Reviews](#reviews)

all api has a base url of `https://revie-apartment.herokuapp.com/`

### users

#### Register a user

    POST /users

sample request

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

sample response

```json
{
  "status": "success",
  "data": {
    "token": "string",
    "userData": {
      "id": "integer",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "updatedAt": "datetime",
      "createdAt": "datetime"
    }
  }
}
```

#### Login a user

    POST /users/signin

sample request

```json
{
  "email": "string",
  "password": "string"
}
```

sample response

```json
{
  "status": "string",
  "data": {
    "token": "string",
    "userData": {
      "id": 2,
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "updatedAt": "datetime",
      "createdAt": "datetime"
    }
  }
}
```

#### Get a user

    GET /users/<id>

    id - the id of the user whose details are needed.
    Only authenticated users can make a request to this route, so in the header
    a parameter token:<recieved token> need to be set.
    This token is received upon successful login


sample response

```json
{
  "success": "Boolean",
  "data": [
    {
      "id": "integer",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "password": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  ]
}
```

#### update a user

    PATCH /users/<id>

    id - the id of the user whose details need to be updated.
    Only authenticated users can make a request to this route, so in the header
    a parameter token:<recieved token> need to be set.
    This token is received upon successful login

sample request

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

sample response

```json
{
    "success": "Boolean",
    "data": "User with id <id> updated successfully"
}
```

### Apartments
#### add an apartment

    POST /apartments/

    Only authenticated users can make a request to this route to add details of
    of apartment they've lived in, so in the header
    a parameter token:<recieved token> need to be set.
    This token is received upon successful login

sample request

```json
 {
     "type":"string",
     "address":"string"
  }
```
type can only be on of
- 2 bedroom flat, 
- 3 bedroom flat, 
- a room, 
- a room self contain, 
- a room and palour self contain, 
- a room and palour



sample response

```json
{
    "success": true,
    "data": {
        "id": 3,
        "type": "string",
        "address": "string",
        "updatedAt": "datetime",
        "createdAt": "datetime"
    }
}
```

#### update an apartment

    PATCH /apartments/<id>

    id - the id of the apartment whose details need to be updated.
    Only authenticated users can make a request to this route to updated
    details of an apartment they have added before, so in the header
    a parameter token:<recieved token> need to be set.
    This token is received upon successful login

sample request

```json
 {
     "type":"string",
     "address":"string"
  }
```

sample response

```json
{
    "success": "Boolean",
    "data": "apartment with id <id> successfully updated"
}
```
#### get an apartment

    GET /apartments/<id>?sort=<sorttype>

    id - the id of the apartment whose details need to be updated.
    sorttype - is an optional query string to fetch the review of an apartment
    in a sorted form. a sorttype of mostrecent returns all review for this apartment from the most recent to oldest. A sorttype of mosthelpful
    returns all reviews for this aparmtment from the most helpful to least helpful


sample response

```json
{
    "success": "Boolean",
    "data": {
        "id": 4,
        "type": "string",
        "address": "string",
        "createdAt": "datetime",
        "updatedAt": "datetime",
        "All_Reviews": [
            " a list of reviews specific to this apartment"...
        ]
    }
}
```

### Reviews
#### add a review

    POST /reviews

    Only authenticated users can make a request to this route, so in the header
    a parameter token:<recieved token> need to be set.
    This token is received upon successful login. anyone can add comment/review
    about any apartment


sample request

```json
 {
     "comment":"string", 
     "ApartmentId": "integer", 
     "reviewTypeId":"integer"
  }
```

sample response

```json
{
    "success": "Boolean",
    "data": {
        "helpful": "integer",
        "id": "integer",
        "comment": "string",
        "ApartmentId": "integer",
        "reviewTypeId": "integer",
        "UserId": "integer",
        "updatedAt": "datetime",
        "createdAt": "datetime"
    }
}
```

#### delete a review

    DELETE /reviews/<id>

    id - the id of the apartment whose details need to be deleted.
    Only authenticated users can make a request to this route, so in the header
    a parameter token:<recieved token> need to be set.
    This token is received upon successful login. anyone can add comment/review
    about any apartment


sample response

```json
{
    "success": "Boolean",
    "data": "review with id <id> has been removed"
}
```


#### get a review

    GET /reviews/<id>

    id - the id of the apartment whose details is needed.


sample response

```json
{
    "success": "Boolean",
    "data": {
        "id": "integer",
        "comment": "string",
        "helpful": "integer",
        "createdAt": "datetime",
        "updatedAt": "datetime",
        "reviewTypeId": "integer"6,
        "UserId": "integer",
        "ApartmentId": "integer",
        "media": [ " a list of images/videos associated with this review"]
    }
}
```


#### update a review

    PATCH /apartments/<id>

    id - the id of the review whose details need to be updated.
    this route is used to update the review with the number of 
    random uers who find the review helpful. for each request,
    the review's number of user who find the review helpful increases

sample request

```json
 {
      "helpful": true
  }
```

sample response

```json
{
    "success": "Boolean",
    "data": "review with id <id> updated successfully"
}
```