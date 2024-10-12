import { gql } from "@apollo/client";

const DELETE_TENANTS = gql`
  mutation removeTenant($id: ID!) {
    removeTenant(id: $id) {
      id
      name
      email
    }
  }
`;









export { DELETE_TENANTS };