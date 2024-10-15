import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";

const roomData = [
    { id: "R001", type: "Bedsitter", tenant: "John Doe", rent: 235.4, status: "Paid" },
    { id: "R002", type: "One-Bedroom", tenant: "Jane Smith", rent: 412.0, status: "Unpaid" },
    { id: "R003", type: "Two-Bedroom", tenant: "Bob Johnson", rent: 162.5, status: "Paid" },
    { id: "R004", type: "Three-Bedroom", tenant: "Alice Brown", rent: 750.2, status: "Unpaid" },
    { id: "R005", type: "Bedsitter", tenant: "Charlie Wilson", rent: 95.8, status: "Paid" },
    { id: "R006", type: "One-Bedroom", tenant: "Eva Martinez", rent: 310.75, status: "Unpaid" },
    { id: "R007", type: "Two-Bedroom", tenant: "David Lee", rent: 528.9, status: "Paid" },
    { id: "R008", type: "Three-Bedroom", tenant: "Grace Taylor", rent: 189.6, status: "Paid" },
];

const roomTypes = ["Bedsitter", "One-Bedroom", "Two-Bedroom", "Three-Bedroom"];

const DashboardTable = () => {
    const [activeTab, setActiveTab] = useState(roomTypes[0]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredRooms = roomData
        .filter((room) => room.type === activeTab && room.tenant.toLowerCase().includes(searchTerm));

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Room Rent Status</h2>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search rooms...'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onChange={handleSearch}
                    />
                    <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                </div>
            </div>

            {/* Tabs */}
            <div className='flex space-x-4 mb-6'>
                {roomTypes.map((type) => (
                    <button
                        key={type}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === type ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                        }`}
                        onClick={() => setActiveTab(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Room ID
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Tenant
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Rent
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Status
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide divide-gray-700'>
                        {filteredRooms.map((room) => (
                            <motion.tr
                                key={room.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                    {room.id}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                    {room.tenant}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                    ${room.rent.toFixed(2)}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        room.status === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}>
                                        {room.status}
                                    </span>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    <button className='text-indigo-400 hover:text-indigo-300 mr-2'>
                                        <Eye size={18} />
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

export default DashboardTable;
