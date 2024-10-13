import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_HOUSES } from "../../queries/houseQueries";

const HousesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHouses, setFilteredHouses] = useState([]);

  const { loading, error, data } = useQuery(GET_HOUSES);

  // Debugging: Check the structure of fetched data
  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.houses) {
      setFilteredHouses(data.houses);
    }
  }, [data]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = (data?.houses || []).filter(
      (house) =>
        (house.name && house.name.toLowerCase().includes(term)) ||
        (house.city && house.city.toLowerCase().includes(term)) ||
        (house.street && house.street.toLowerCase().includes(term))
    );
    setFilteredHouses(filtered);
  }, [searchTerm, data]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching houses:", error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <motion.div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Houses</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search houses...'
            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label='Search houses'
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Name</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>City</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Street</th> 
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-700'>
            {filteredHouses.length > 0 ? (
              filteredHouses.map((house) => (
                <motion.tr key={house.id}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-10 w-10'>
                        <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                          {house.name ? house.name.charAt(0) : 'N/A'}
                        </div>
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-100'>{house.name || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-300'>{house.city || 'N/A'}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-300'>{house.street || 'N/A'}</div> 
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                    <button className='text-indigo-400 hover:text-indigo-300 mr-2'>Edit</button>
                    <button className='text-red-400 hover:text-red-300'>Delete</button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className='text-center'>No houses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default HousesTable;
