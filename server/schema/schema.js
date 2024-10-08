const { projects, clients } = require('../../sampleData.js');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');


//house type

const TenantType = new GraphQLObjectType({
name: 'Tenant',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tenants:{
            type: new GraphQLList(TenantType),
            resolve() {
                return clients;
            }
        },
        tenant: {
            type: TenantType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return clients.find(client => client.id === args.id);
            }
        },
        
    }

});







module.exports = new GraphQLSchema({
    query: RootQuery,
})

