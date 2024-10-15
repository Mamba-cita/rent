import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";

const INSIGHTS = [
	{
		icon: TrendingUp,
		color: "text-green-500",
		insight: "Rental income has increased by 12% over the last month, driven by higher occupancy rates.",
	},
	{
		icon: Users,
		color: "text-blue-500",
		insight: "Tenant satisfaction ratings have improved by 10% after implementing new maintenance response policies.",
	},
	{
		icon: ShoppingBag,
		color: "text-purple-500",
		insight: 'Short-term rental units show the highest demand during holidays, indicating a need for targeted marketing.',
	},
	{
		icon: DollarSign,
		color: "text-yellow-500",
		insight: "Adjusting rental prices based on market trends could boost revenue by up to 6% this quarter.",
	},
];

const AIPoweredInsights = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1.0 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>AI-Powered Insights</h2>
			<div className='space-y-4'>
				{INSIGHTS.map((item, index) => (
					<div key={index} className='flex items-center space-x-3'>
						<div className={`p-2 rounded-full ${item.color} bg-opacity-20`}>
							<item.icon className={`size-6 ${item.color}`} />
						</div>
						<p className='text-gray-300'>{item.insight}</p>
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default AIPoweredInsights;
