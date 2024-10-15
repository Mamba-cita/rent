const messagesResolvers = require('./messages');
const usersResolvers = require('./users');
const roomsResolvers = require('./rooms');
const housesResolvers = require('./houses');
const rentsResolvers = require('./rents');


module.exports = {
    Query: {
        ...messagesResolvers.Query,
        ...usersResolvers.Query,
        ...roomsResolvers.Query,
        ...housesResolvers.Query,
        ...rentsResolvers.Query,
    },
    Mutation: {
        ...messagesResolvers.Mutation,
        ...usersResolvers.Mutation,
        ...roomsResolvers.Mutation,
        ...housesResolvers.Mutation,
        ...rentsResolvers.Mutation,
    },
};