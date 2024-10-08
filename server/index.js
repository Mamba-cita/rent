const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const port = process.env.PORT || 5000;


// Create an instance of Express


const app = express();


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
    context: {
        // Add your context here
    }
}))








app.listen(port, console.log(`Server running on port ${port}`));




