
import { gql } from '@apollo/client';

const GET_TENANTS = gql`
query getTenants {
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
}
`;







export { GET_TENANTS };