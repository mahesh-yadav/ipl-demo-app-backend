# Mongodb server

### How to start and initialize MongoDb server

1. Go to the **mongodb** folder from terminal
2. Run `"mongod -f mongod.conf"` - this starts MongoDB server on port **30000** with any user authentication
3. In another terminal, from the **mongodb** folder run `"mongoimport --port 30000 --db=xseed --collection=matches --type=csv --headerline --file=matches.csv"` - This command will initialize the DB with matches collection.

# Backend

### RESTful API endpoints:

1. **/matches** -- **GET** - returns a list of matches

   - **Query parameters:** limit, skip, search, filter

2. **/matches/:matchId** -- **GET** - returns a single match with given id

3. **/users** -- **POST** - Allows creation of a new user

4. **/users/:userId** -- **GET** - returns a single user

5. **/signin** -- **POST** - Allows sign in - returns access token

### How to start the server

1. Go to the **backend** folder from terminal
2. Run `"yarn install"` to install project dependencies
3. Run `"yarn compile"` - this will use babel to transpile code from **src** folder to **dist**
4. Run `"yarn start"` - this will start the serve on **port 4000** (_make sure mongod is running on port 30000 before executing this command_)

