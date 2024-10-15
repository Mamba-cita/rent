import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from '@apollo/client';
import Header from "../components/common/Header";
import RoomsTable from "../components/rooms/RoomsTable";
import StatCard from "../components/common/StatCard";
import { GET_ROOMS } from "../queries/roomQueries"; 
import RoomsGrowthChart from "../components/rooms/RoomsGrowthChart";
import RoomsActivityHeatmap from "../components/rooms/RoomsActivityHeatmap";
import RoomsDemographicsChart from "../components/rooms/RoomsDemographicsChart";

const RoomsPage = () => {
	const { loading, error, data } = useQuery(GET_ROOMS);

	// Handle loading state
	if (loading) return <p>Loading...</p>;

	// Handle error state
	if (error) return <p>Error fetching rooms: {error.message}</p>;

	// Extracting room data from the query result
	const rooms = data.rooms || [];

	const totalRooms = rooms.length;

	// Filter for new rooms added today
	const newRoomsToday = rooms.filter(room => {
		if (!room.createdAt) return false; 
		const createdAt = new Date(parseInt(room.createdAt));
		const today = new Date();
		return (
			createdAt.getDate() === today.getDate() &&
			createdAt.getMonth() === today.getMonth() &&
			createdAt.getFullYear() === today.getFullYear()
		);
	}).length;

	// Filter for active rooms (adjust as needed based on your use case for "active")
	const activeRooms = rooms.filter(room => room.status === 'RENTED').length;

	// Calculate churn rate based on active rooms
	const churnRate = totalRooms > 0 ? 
		((totalRooms - activeRooms) / totalRooms * 100).toFixed(1) + '%' : 
		'0%'; 

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Rooms' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Rooms'
						icon={UsersIcon}
						value={totalRooms.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard
						name='New Rooms Today'
						icon={UserPlus}
						value={newRoomsToday}
						color='#10B981'
					/>
					<StatCard
						name='Occupied Rooms'
						icon={UserCheck}
						value={activeRooms.toLocaleString()} 
						color='#F59E0B'
					/>
					<StatCard
						name='Churn Rate'
						icon={UserX}
						value={churnRate}
						color='#EF4444'
					/>
				</motion.div>

				{/* ROOMS TABLE */}
				<RoomsTable rooms={rooms} /> {/* Pass rooms data to RoomsTable */}

				{/* ROOM CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<RoomsGrowthChart />
					<RoomsActivityHeatmap />
					<RoomsDemographicsChart/>
				</div>
			</main>
		</div>
	);
};

export default RoomsPage;
