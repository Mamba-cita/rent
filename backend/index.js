require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Access environment variables
const MONGODB = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        // You can add any context here, e.g., user authentication, etc.
        req,
    }),
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`🚀 Server running at ${res.url}`);
    })
    .catch((error) => {
        console.error('❌ Error connecting to MongoDB:', error.message);
    });
