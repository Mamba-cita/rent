const { projects, clients } = require('../../sampleData.js');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');


//house type

const HouseType = new GraphQLObjectType({
    name: 'House',
        fields: () => ({
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            status: { type: GraphQLString },
            tenant: { 
             type: TenantType,
             resolve(parent, args) {
                return clients.find(client => client.id === parent.clientId);
             }
            }
        })
    })

//tenant type

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
        houses: {
            type: new GraphQLList(HouseType),
            resolve() {
                return projects;
            }
        },
        house: {
            type: HouseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return projects.find(project => project.id === args.id);
            }
        },
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

