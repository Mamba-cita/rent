import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from '@apollo/client';
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";
import { GET_TENANTS } from "../queries/tenantQueries"; 

const UsersPage = () => {
	const { loading, error, data } = useQuery(GET_TENANTS); // Fetch tenants using the query

	// Handle loading state
	if (loading) return <p>Loading...</p>;

	// Handle error state
	if (error) return <p>Error: {error.message}</p>;

	// Extracting user data from the query result
	const users = data.users || [];

	// Calculate user statistics based on fetched data
	const totalUsers = users.length;

	const newUsersToday = users.filter(user => {
		// Ensure createdAt exists and calculate new users
		if (!user.createdAt) return false; 
		const createdAt = new Date(parseInt(user.createdAt)); // Parse createdAt if it's a timestamp
		const today = new Date();
		return createdAt.getDate() === today.getDate() &&
		       createdAt.getMonth() === today.getMonth() &&
		       createdAt.getFullYear() === today.getFullYear();
	}).length;

	// Assuming active users are determined by token existence
	const activeUsers = users.filter(user => user.token !== null).length;

	const churnRate = totalUsers > 0 ? ((totalUsers - activeUsers) / totalUsers * 100).toFixed(1) + '%' : '0%'; // Simple churn rate calculation

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Tenants' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Tenants'
						icon={UsersIcon}
						value={totalUsers.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard
						name='New Tenants Today'
						icon={UserPlus}
						value={newUsersToday}
						color='#10B981'
					/>
					<StatCard
						name='Active Tenants'
						icon={UserCheck}
						value={activeUsers.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCard
						name='Churn Rate'
						icon={UserX}
						value={churnRate}
						color='#EF4444'
					/>
				</motion.div>

				{/* USERS TABLE */}
				<UsersTable users={users} /> {/* Pass users data to UsersTable */}

				{/* USER CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<UserGrowthChart />
					<UserActivityHeatmap />
					<UserDemographicsChart />
				</div>
			</main>
		</div>
	);
};

export default UsersPage;
