import { gql } from "@apollo/client";

const GET_ROOMS = gql`
  query getRooms {
    rooms {
      id
      room_no
      size
      status
      houseId
      house {
        name
        city
        street
      }
      tenantId
      tenant {
        username
        email
        tel
      }
      createdAt
      updatedAt
    }
  }
`;

const GET_SINGLE_ROOM = gql`
  query getSingleRoom($id: ID!) {
    room(id: $id) {
      id
      room_no
      size
      status
      houseId
      house {
        name
        city
        street
      }
      tenantId
      tenant {
        username
        email
        tel
      }
      createdAt
      updatedAt
    }
  }
`;


export  {
    GET_ROOMS,
    GET_SINGLE_ROOM,
  };
