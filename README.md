# eliftech-task
## Delivery App

Test task from [ElifTech School](https://eliftech.school/). Web application
where users can order food delivery.

## Database
This app uses MongoDB. To setup the connection, you should specify
the environmental variable *MONGO_URL* (either local or remote, both works).

### Seeds
Command `npm run seeds` generates random data on the connect database.

## Running the App
Command `npm start` runs the server on port *3000* (unless port is specified
on the environment configuration).