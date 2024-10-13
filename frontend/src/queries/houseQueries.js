import { gql } from "@apollo/client";

const GET_HOUSES = gql`
query getHouses {
    houses {
      id
      city
      street
      name
      createdAt
      updatedAt
    }
  }
`;

export { GET_HOUSES };
