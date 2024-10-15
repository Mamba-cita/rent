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

//single house


const GET_SINGLE_HOUSE = gql`
query getSingleHouse($id: ID!) {
    house(id: $id) {
      id
      city
      street
      name
      createdAt
      updatedAt
      rooms {
        id
        room_no
        size
        status
        createdAt
        updatedAt
      }
      tenants {
        id
        name
        email
        tel
        id_no
        house {
          id
          size
          house_no
          floor_no
          status
        }
      }
      roomsCount
      tenantsCount
      houseNumber
      floorNumber
      houseSize
      houseStatus
      houseType
    }
  }
  `;


export { GET_HOUSES , GET_SINGLE_HOUSE};
