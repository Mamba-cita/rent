const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');
const House = require('../models/House');
const Tenant = require('../models/Tenants');

// HouseType
const HouseType = new GraphQLObjectType({
  name: 'House',
  fields: () => ({
    id: { type: GraphQLID },
    size: { type: GraphQLString },
    house_no: { type: GraphQLString },
    floor_no: { type: GraphQLString },
    rent: { type: GraphQLString },
    status: { type: GraphQLString }, // Vacant, Rented, On Notice
    tenant: {
      type: TenantType,
      resolve(parent, args) {
        return Tenant.findById(parent.tenantId);
      },
    },
  }),
});

// TenantType
const TenantType = new GraphQLObjectType({
  name: 'Tenant',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    tel: { type: GraphQLString },
    id_no: { type: GraphQLString },
    house: {
      type: HouseType,
      resolve(parent, args) {
        return House.findById(parent.houseId);
      },
    },
    status: { type: GraphQLString }, // Active by default
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    houses: {
      type: new GraphQLList(HouseType),
      resolve() {
        return House.find();
      },
    },
    house: {
      type: HouseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return House.findById(args.id);
      },
    },
    tenants: {
      type: new GraphQLList(TenantType),
      resolve() {
        return Tenant.find();
      },
    },
    tenant: {
      type: TenantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Tenant.findById(args.id);
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add House Mutation
    addHouse: {
      type: HouseType,
      args: {
        size: { type: GraphQLString },
        house_no: { type: GraphQLString },
        floor_no: { type: GraphQLString },
        rent: { type: GraphQLString },
        status: { type: GraphQLString }, // Optional
      },
      resolve(parent, args) {
        let house = new House({
          size: args.size,
          house_no: args.house_no,
          floor_no: args.floor_no,
          rent: args.rent,
          status: args.status || 'Vacant', // Default to 'Vacant' if not provided
        });
        return house.save();
      },
    },
    
    // Add Tenant Mutation
    addTenant: {
      type: TenantType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        tel: { type: GraphQLNonNull(GraphQLString) },
        id_no: { type: GraphQLNonNull(GraphQLString) },
        houseId: { type: GraphQLID }, // Relates tenant to a house
      },
      async resolve(parent, args) {
        // Check if the house exists and is vacant
        let house = await House.findById(args.houseId);
        if (!house || house.status !== 'Vacant') {
          throw new Error('House is either not available or not vacant');
        }

        let tenant = new Tenant({
          name: args.name,
          email: args.email,
          tel: args.tel,
          id_no: args.id_no,
          houseId: args.houseId,
          status: 'Active', // Active tenant by default
        });

        // Save the tenant
        let savedTenant = await tenant.save();

        // Update the house status to 'Rented'
        house.status = 'Rented';
        house.tenantId = savedTenant.id;
        await house.save();

        return savedTenant;
      },
    },
    
    // Update House Status
    updateHouseStatus: {
      type: HouseType,
      args: {
        id: { type: GraphQLID },
        status: { type: GraphQLString },
      },
      resolve(parent, args) {
        return House.findByIdAndUpdate(
          args.id,
          { status: args.status },
          { new: true } // Return updated document
        );
      },
    },
    
    // Remove Tenant (when tenant leaves the house)
    removeTenant: {
      type: TenantType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        // Find the tenant
        let tenant = await Tenant.findById(args.id);
        if (!tenant) {
          throw new Error('Tenant not found');
        }

        // Get the associated house and set status back to 'Vacant'
        let house = await House.findById(tenant.houseId);
        if (house) {
          house.status = 'Vacant';
          house.tenantId = null;
          await house.save();
        }

        // Remove tenant
        return Tenant.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
