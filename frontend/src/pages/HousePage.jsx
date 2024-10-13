import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from '@apollo/client';
import Header from "../components/common/Header";
import HousesTable from "../components/houses/HousesTable";
import StatCard from "../components/common/StatCard";
import { GET_HOUSES } from "../queries/houseQueries";
import HouseGrowthChart from "../components/houses/HouseGrowthChart";
import HouseActivityHeatmap from "../components/houses/HouseActivityHeatmap";
import HouseDemographicsChart from "../components/houses/HouseDemographicsChart";

const HousePage = () => {
	const { loading, error, data } = useQuery(GET_HOUSES); // Fetch houses data

	// Handle loading state
	if (loading) return <p>Loading...</p>;

	// Handle error state
	if (error) return <p>Error fetching houses: {error.message}</p>;

	// Extracting house data from the query result
	const houses = data.houses || [];

	const totalHouses = houses.length;

	const newHousesToday = houses.filter(house => {
		if (!house.createdAt) return false; 
		const createdAt = new Date(parseInt(house.createdAt));
		const today = new Date();
		return (
			createdAt.getDate() === today.getDate() &&
			createdAt.getMonth() === today.getMonth() &&
			createdAt.getFullYear() === today.getFullYear()
		);
	}).length;

	const activeHouses = houses.filter(house => house.token !== null).length;

	const churnRate = totalHouses > 0 ? 
		((totalHouses - activeHouses) / totalHouses * 100).toFixed(1) + '%' : 
		'0%'; 

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Houses' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Houses'
						icon={UsersIcon}
						value={totalHouses.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard
						name='New Houses Today'
						icon={UserPlus}
						value={newHousesToday}
						color='#10B981'
					/>
					<StatCard
						name='Active Houses'
						icon={UserCheck}
						value={activeHouses.toLocaleString()} // Updated variable
						color='#F59E0B'
					/>
					<StatCard
						name='Churn Rate'
						icon={UserX}
						value={churnRate}
						color='#EF4444'
					/>
				</motion.div>

				{/* HOUSES TABLE */}
				<HousesTable houses={houses} /> {/* Pass houses data to HousesTable */}

				{/* USER CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<HouseGrowthChart />
					<HouseActivityHeatmap />
					<HouseDemographicsChart />
				</div>
			</main>
		</div>
	);
};

export default HousePage;
