import { useQuery } from "@apollo/client"; 
import { GET_ROOMS } from "../../queries/roomQueries"; 
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

// Define color constants for better readability
const COLORS = [
	"#8884d8", // Purple
	"#82ca9d", // Green
	"#ffc658", // Yellow
	"#ff8042", // Orange
	"#0088FE", // Blue
];

const RoomsDemographicsChart = () => {
	const { loading, error, data } = useQuery(GET_ROOMS); // Use the GET_ROOMS query

	// Handle loading state
	if (loading) return <div>Loading...</div>;
	// Handle error state
	if (error) return <div>Error: {error.message}</div>;

	// Assuming data.rooms contains the necessary demographic data
	const userDemographicsData = data.rooms.map(room => ({
		name: room.demographicGroup, // Update according to your data structure
		value: room.count, // Update according to your data structure
	}));

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 lg:col-span-2'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Rooms Demographics</h2>
			<div style={{ width: "100%", height: "300px" }}>
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={userDemographicsData}
							cx='50%'
							cy='50%'
							outerRadius={100}
							fill='#8884d8'
							dataKey='value'
							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
						>
							{userDemographicsData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default RoomsDemographicsChart;
