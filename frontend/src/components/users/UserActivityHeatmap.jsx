import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { useQuery } from '@apollo/client';
import { GET_TENANTS } from "../../queries/tenantQueries";

const UserActivityHeatmap = () => {
	const { loading, error, data } = useQuery(GET_TENANTS); // Fetch tenants using the query

	// Handle loading state
	if (loading) return <p>Loading...</p>;

	// Handle error state
	if (error) return <p>Error: {error.message}</p>;

	// Extract user data from the query result
	const users = data.users || [];

	// Initialize user activity data for the week
	const userActivityData = [
		{ name: "Mon", "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
		{ name: "Tue", "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
		{ name: "Wed", "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
		{ name: "Thu", "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
		{ name: "Fri", "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
		{ name: "Sat", "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
		{ name: "Sun", "0-4": 0, "4-8": 0, "8-12": 0, "12-16": 0, "16-20": 0, "20-24": 0 },
	];

	// Calculate user activity based on createdAt field
	users.forEach(user => {
		const createdAt = new Date(user.createdAt); // Assuming `createdAt` field exists
		if (createdAt) {
			const dayIndex = createdAt.getDay(); // Get day index (0-6)
			const hour = createdAt.getHours(); // Get hour (0-23)

			// Determine which hour range the hour falls into
			let hourRange = "";
			if (hour >= 0 && hour < 4) hourRange = "0-4";
			else if (hour >= 4 && hour < 8) hourRange = "4-8";
			else if (hour >= 8 && hour < 12) hourRange = "8-12";
			else if (hour >= 12 && hour < 16) hourRange = "12-16";
			else if (hour >= 16 && hour < 20) hourRange = "16-20";
			else if (hour >= 20 && hour < 24) hourRange = "20-24";

			if (hourRange) {
				userActivityData[dayIndex][hourRange] += 1; // Increment the respective hour range for the day
			}
		}
	});

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Tenants Activity Heatmap</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<BarChart data={userActivityData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='name' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Bar dataKey='0-4' stackId='a' fill='#6366F1' />
						<Bar dataKey='4-8' stackId='a' fill='#8B5CF6' />
						<Bar dataKey='8-12' stackId='a' fill='#EC4899' />
						<Bar dataKey='12-16' stackId='a' fill='#10B981' />
						<Bar dataKey='16-20' stackId='a' fill='#F59E0B' />
						<Bar dataKey='20-24' stackId='a' fill='#3B82F6' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default UserActivityHeatmap;
