const { projects, clients } = require('../../sampleData.js');

const House = require('../models/House.js');
const Tenant = require('../models/Tenants.js');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
const { modelName } = require('../models/Tenants.js');


//house type

const HouseType = new GraphQLObjectType({
    name: 'House',
        fields: () => ({
            id: { type: GraphQLID },
            size: { type: GraphQLString },
            house_no: { type: GraphQLString },
            floor_no: { type: GraphQLString },
            rent: { type: GraphQLString },
            status: { type: GraphQLString },
            tenant: { 
             type: TenantType,
             resolve(parent, args) {
                return Tenant.findById(parent.tenantId);
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
        tel: { type: GraphQLString },
        id_no: { type: GraphQLString },
        house:{
            type: HouseType,
            resolve(parent, args) {
                return House.findById(parent.houseId);
            }
        }
        
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        houses: {
            type: new GraphQLList(HouseType),
            resolve() {
              return House.find();
            }
        },
        house: {
            type: HouseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return House.findById(args.id);
            }
        },
        tenants:{
            type: new GraphQLList(TenantType),
            resolve() {
                return Tenant.find();
            }
        },
        tenant: {
            type: TenantType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Tenant.findById(args.id);
            }
        },
        
    }

});







module.exports = new GraphQLSchema({
    query: RootQuery,
})

