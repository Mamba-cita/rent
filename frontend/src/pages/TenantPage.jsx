// TenantProfile.jsx
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../context/authContext"; 
import { GET_TENANT_BY_ID } from "../queries/tenantQueries";

const TenantPage = () => {
  const { user } = useContext(AuthContext);

  // Fetch tenant information based on user ID
  const { loading, error, data } = useQuery(GET_TENANT_BY_ID, {
    variables: { id: user.id },
    skip: !user.id, // Skip the query if there's no user ID
  });

  // Handle loading state
  if (loading) return <p>Loading tenant information...</p>;

  // Handle error state
  if (error) return <p>Error fetching tenant information: {error.message}</p>;

  // Render the tenant information
  const tenant = data.user;

  return (
    <div>
      <h1>Tenant Profile</h1>
      <p><strong>Name:</strong> {tenant.username}</p>
      <p><strong>Email:</strong> {tenant.email}</p>
      <p><strong>Phone:</strong> {tenant.tel}</p>
      <p><strong>ID No:</strong> {tenant.id_no}</p>
      <p><strong>Role:</strong> {tenant.role}</p>
      <p><strong>Created At:</strong> {new Date(tenant.createdAt).toLocaleDateString()}</p>
      <p><strong>Updated At:</strong> {new Date(tenant.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default TenantPage;
