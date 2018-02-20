# EZSleep

EZSleep was a website designed to emulate airBnB, written with a JavaScript front end and back end. 

### User Stories
```
As a tourist,
So that I can decide where I want to go,
I want to be able to view listings
```

```
As a tourist,
So that I can get more information on a listing,
I want to be able to view the location, and price
```

```
As a host,
So I can make money from my spare room/property,
I want to be able to post my listing
```

```
As a host,
So I can give more information about my spare room/property,
I want to be able to add location and price to my listing
```

```
As a tourist,
So that I can plan in advance,
I would like to book a listing
```


### Various Instructions


***Used for migrating into test database***
node_modules/.bin/sequelize db:migrate --url 'postgres://127.0.0.1/airbnb_test'

***Creating a new migration file:***
node_modules/.bin/sequelize migration:create --name="name"

***Different syntax for zombie testing***
1. Filling forms
```browser.fill('#id01', 'London')```
**or**
```browser.fill('input[name="Price/Night:"]', '£40.00')```
