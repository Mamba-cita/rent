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

export { GET_TENANTS };
