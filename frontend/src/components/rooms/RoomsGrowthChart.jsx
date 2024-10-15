import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useQuery } from '@apollo/client';
import { GET_ROOMS } from "../../queries/roomQueries";

const RoomsGrowthChart = () => {
	const { loading, error, data } = useQuery(GET_ROOMS); // Fetch rooms data

	// Handle loading state
	if (loading) return <p>Loading...</p>;

	// Handle error state
	if (error) return <p>Error: {error.message}</p>;

	// Extract room data from the query result
	const rooms = data.rooms || [];

	// Calculate room growth data
	const roomGrowthData = [];
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const roomsPerMonth = Array(12).fill(0); // Create an array to hold room counts for each month

	rooms.forEach(room => {
		const createdAt = new Date(room.createdAt); // Assuming `createdAt` field exists for rooms
		if (createdAt) {
			const monthIndex = createdAt.getMonth(); // Get month index (0-11)
			roomsPerMonth[monthIndex] += 1; // Increment room count for the respective month
		}
	});

	// Build room growth data for chart
	monthNames.forEach((month, index) => {
		roomGrowthData.push({ month, rooms: roomsPerMonth[index] });
	});

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Rooms Growth</h2>
			<div className='h-[320px]'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart data={roomGrowthData}>
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
							dataKey='rooms'
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

export default RoomsGrowthChart;
