import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useQuery } from '@apollo/client';
import { GET_TENANTS } from "../../queries/tenantQueries";

const UserGrowthChart = () => {
	const { loading, error, data } = useQuery(GET_TENANTS); // Fetch tenants using the query

	// Handle loading state
	if (loading) return <p>Loading...</p>;

	// Handle error state
	if (error) return <p>Error: {error.message}</p>;

	// Extract user data from the query result
	const users = data.users || [];

	// Calculate user growth data
	const userGrowthData = [];
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const usersPerMonth = Array(12).fill(0); // Create an array to hold user counts for each month

	users.forEach(user => {
		const createdAt = new Date(user.createdAt); // Assuming `createdAt` field exists
		if (createdAt) {
			const monthIndex = createdAt.getMonth(); // Get month index (0-11)
			usersPerMonth[monthIndex] += 1; // Increment user count for the respective month
		}
	});

	// Build user growth data for chart
	monthNames.forEach((month, index) => {
		userGrowthData.push({ month, users: usersPerMonth[index] });
	});

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Tenants Growth</h2>
			<div className='h-[320px]'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart data={userGrowthData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='month' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type='monotone'
							dataKey='users'
							stroke='#8B5CF6'
							strokeWidth={2}
							dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default UserGrowthChart;
