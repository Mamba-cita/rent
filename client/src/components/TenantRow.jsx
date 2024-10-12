
import { useMutation } from '@apollo/client';
import {FaTrash} from 'react-icons/fa';
import { DELETE_TENANTS } from '../mutations/tenantMutations';
import { GET_TENANTS } from '../queries/tenantQueries';





export default function TenantRow({tenant}) {
    const [removeTenant] = useMutation(DELETE_TENANTS, {
        variables: {id: tenant.id},
        refetchQueries: [{query: GET_TENANTS}],
        onCompleted: () => console.log('Tenant deleted successfully.'),
        onError: error => console.error(error),
  
    });
  return (
    <tr>
      <td>{tenant.name}</td>
      <td>{tenant.email}</td>
      <td>{tenant.tel}</td>
      <td>{tenant.id_no}</td>
      <td>
        {tenant.house && (
          <span>
            {tenant.house.house_no} - {tenant.house.size} -{tenant.house.floor_no} - {tenant.house.status}
          </span>
        )}
      </td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={removeTenant}><FaTrash/></button>
      </td>
    </tr>
  )
}
