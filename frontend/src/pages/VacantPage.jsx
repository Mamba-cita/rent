import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import VacantsTable from "../components/products/VacantsTable";
import VacantTrendChart from "../components/products/VacantTrendChart";

const VacantPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Vacant Rooms' /> 

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS SECTION */}
			

				{/* VACANT ROOMS TABLE */}
				<VacantsTable />

				{/* CHARTS SECTION */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8'>
					{/* <VacantTrendChart />
					<CategoryDistributionChart /> */}
				</div>
			</main>
		</div>
	);
};

export default VacantPage;
