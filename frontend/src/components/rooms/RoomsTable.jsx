import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "../../queries/roomQueries";

const RoomsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);

  const { loading, error, data } = useQuery(GET_ROOMS); // Fetch rooms instead of houses

  useEffect(() => {
    if (data && data.rooms) {
      setFilteredRooms(data.rooms); // Set rooms data to the state
    }
  }, [data]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = (data?.rooms || []).filter(
      (room) =>
        (room.room_no && room.room_no.toLowerCase().includes(term)) ||
        (room.house?.city && room.house.city.toLowerCase().includes(term)) ||
        (room.house?.street && room.house.street.toLowerCase().includes(term)) ||
        (room.tenant?.username && room.tenant.username.toLowerCase().includes(term))
    );
    setFilteredRooms(filtered); // Filter rooms based on the search term
  }, [searchTerm, data]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching rooms:", error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <motion.div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Rooms</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search rooms...'
            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label='Search rooms'
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Room No</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Size</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Status</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>House Name</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>City</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Street</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Tenant</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Created At</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Updated At</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-700'>
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <motion.tr key={room.id}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-100'>{room.room_no || 'N/A'}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-300'>{room.size || 'N/A'}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className={`text-sm ${room.status === "Occupied" ? "text-green-400" : "text-red-400"}`}>
                      {room.status || 'N/A'}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-300'>{room.house?.name || 'N/A'}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-300'>{room.house?.city || 'N/A'}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-300'>{room.house?.street || 'N/A'}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-300'>
                      {room.tenant ? (
                        <>
                          <span>{room.tenant.username || 'N/A'}</span>
                          <br />
                          <span>{room.tenant.email || 'N/A'}</span>
                          <br />
                          <span>{room.tenant.tel || 'N/A'}</span>
                        </>
                      ) : 'Vacant'}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-300'>{new Date(room.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-300'>{new Date(room.updatedAt).toLocaleDateString()}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                    <button className='text-indigo-400 hover:text-indigo-300 mr-2'>Edit</button>
                    <button className='text-red-400 hover:text-red-300'>Delete</button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className='text-center'>No rooms found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RoomsTable;
