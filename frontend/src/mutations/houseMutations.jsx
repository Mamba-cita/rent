import { gql } from "graphql-tag";

const CREATE_HOUSE = gql`
mutation Mutation($houseInput: HouseInput) {
    createHouse(houseInput: $houseInput) {
      id
      city
      street
      name
      createdAt
      updatedAt
    }
  }
`;









export { CREATE_HOUSE };
