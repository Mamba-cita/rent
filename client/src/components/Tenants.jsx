import { useQuery } from '@apollo/client';
import TenantRow from './TenantRow';
import { GET_TENANTS } from '../queries/tenantQueries';
import Spinner from './Spinner';


export default function Tenants() {
  const { loading, error, data } = useQuery(GET_TENANTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong :(</p>;

  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>ID No</th>
          <th>House</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.tenants.map(tenant => (
          <TenantRow key={tenant.id} tenant={tenant} />
        ))}
      </tbody>
    </table>
  );
}
