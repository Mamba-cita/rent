import { useQuery } from "@apollo/client"; 
import { GET_ROOMS } from "../../queries/roomQueries";
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";

const VacantsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const { loading, error, data } = useQuery(GET_ROOMS);
	console.log(data);

	// Handle loading state
	if (loading) return <div>Loading...</div>;
	// Handle error state
	if (error) return <div>Error: {error.message}</div>;

	// Filter out only vacant rooms
	const vacantRooms = data.rooms.filter(room => room.status === "VACANT");

	// Handle search filtering
	const filteredRooms = vacantRooms.filter(
		(room) => room.room_no.toString().includes(searchTerm) || room.house.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Vacant Rooms List</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search vacants...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={handleSearch}
						value={searchTerm}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Room No
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Size
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Status
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								House Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								City
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Street
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredRooms.map((room) => (
							<motion.tr
								key={room.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
									{room.room_no}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{room.size}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{room.status}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{room.house.name}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{room.house.city}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{room.house.street}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
										<Edit size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300'>
										<Trash2 size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default VacantsTable;
