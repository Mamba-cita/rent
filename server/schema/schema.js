const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const House = require('../models/House');
const Tenant = require('../models/Tenants');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

// Constants for roles and statuses
const ROLES = {
  ADMIN: 'Admin',
  TENANT: 'Tenant',
};

const HOUSE_STATUSES = {
  VACANT: 'Vacant',
  RENTED: 'Rented',
  ON_NOTICE: 'On Notice',
};

// UserType
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    tel: { type: GraphQLString },
    id_no: { type: GraphQLString },
    role: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

// HouseType
const HouseType = new GraphQLObjectType({
  name: 'House',
  fields: () => ({
    id: { type: GraphQLID },
    size: { type: GraphQLString },
    house_no: { type: GraphQLString },
    floor_no: { type: GraphQLString },
    rent: { type: GraphQLString },
    status: { type: GraphQLString },
    noticeDate: { type: GraphQLString },
    tenant: {
      type: TenantType,
      resolve(parent) {
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
      resolve(parent) {
        return House.findById(parent.houseId);
      },
    },
    status: { type: GraphQLString },
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
    // Register User
    registerUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        tel: { type: GraphQLNonNull(GraphQLString) },
        id_no: { type: GraphQLNonNull(GraphQLString) },
        role: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const existingUser = await User.findOne({ email: args.email });
        if (existingUser) {
          throw new Error('User already exists');
        }

        const newUser = new User(args);
        return newUser.save();
      },
    },

    // Login User
    loginUser: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { email, password }) {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid credentials');
        }

        // Use the comparePassword method from User model
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
          { userId: user.id, role: user.role },
          JWT_SECRET,
          { expiresIn: '1h' }
        );

        return { ...user._doc, token };
      },
    },

    // Add House
    addHouse: {
      type: HouseType,
      args: {
        size: { type: GraphQLNonNull(GraphQLString) },
        house_no: { type: GraphQLNonNull(GraphQLString) },
        floor_no: { type: GraphQLNonNull(GraphQLString) },
        rent: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLString },
      },
      async resolve(parent, args, { req }) {
        if (req.user.role !== ROLES.ADMIN) {
          throw new Error('Unauthorized');
        }

        const house = new House({
          ...args,
          status: args.status || HOUSE_STATUSES.VACANT, // Default to Vacant
        });

        return house.save();
      },
    },

    // Add Tenant
    addTenant: {
      type: TenantType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        tel: { type: GraphQLNonNull(GraphQLString) },
        id_no: { type: GraphQLNonNull(GraphQLString) },
        houseId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args, { req }) {
        if (req.user.role !== ROLES.ADMIN) {
          throw new Error('Unauthorized');
        }

        const house = await House.findById(args.houseId);
        if (!house || house.status !== HOUSE_STATUSES.VACANT) {
          throw new Error('House is either not available or not vacant');
        }

        const tenant = new Tenant({
          ...args,
          status: 'Active',
          houseId: args.houseId,
        });

        await tenant.save();

        // Update house status and associate tenant
        house.status = HOUSE_STATUSES.RENTED;
        house.tenantId = tenant.id;
        await house.save();

        return tenant;
      },
    },

    // Update House Status
    updateHouseStatus: {
      type: HouseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        status: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        return House.findByIdAndUpdate(
          args.id,
          { status: args.status },
          { new: true }
        );
      },
    },

    // Tenant Gives Notice to Vacate
    giveNotice: {
      type: HouseType,
      args: {
        houseId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args, { req }) {
        if (req.user.role !== ROLES.TENANT) {
          throw new Error('Unauthorized');
        }

        const house = await House.findById(args.houseId);
        if (!house || house.status !== HOUSE_STATUSES.RENTED) {
          throw new Error('House not rented or does not exist');
        }

        const currentDate = new Date();
        house.status = HOUSE_STATUSES.ON_NOTICE;
        house.noticeDate = currentDate.toISOString();
        await house.save();

        return house;
      },
    },

    // Remove Tenant
    removeTenant: {
      type: TenantType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args, { req }) {
        if (req.user.role !== ROLES.ADMIN) {
          throw new Error('Unauthorized');
        }

        const tenant = await Tenant.findById(args.id);
        if (!tenant) {
          throw new Error('Tenant not found');
        }

        const house = await House.findById(tenant.houseId);
        if (house) {
          house.status = HOUSE_STATUSES.VACANT;
          house.tenantId = null;
          await house.save();
        }

        await Tenant.findByIdAndDelete(args.id);
        return tenant;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
