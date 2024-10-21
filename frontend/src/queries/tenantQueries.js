import { gql } from "@apollo/client";

const GET_TENANTS = gql`
  query getTenants {
    users {
      id
      username
      email
      tel
      id_no
      role
      token
      createdAt
      updatedAt
    }
  }
`;

// GET_SINGLE_TENANT

const GET_TENANT_BY_ID = gql`
  query getTenantById($id: ID!) {
    user(id: $id) {
      id
      username
      email
      tel
      id_no
      role
      createdAt
      updatedAt
    }
  }
`;



export { GET_TENANTS, GET_TENANT_BY_ID };
