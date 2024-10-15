import { useContext } from 'react';
import { AuthContext } from "../../context/authContext";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const DangerZone = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  console.log(user);

  return (
    <motion.div
      className='bg-green-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-green-700 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className='flex items-center mb-4'>
        <LogOut className='text-green-400 mr-3' size={24} />
        <h2 className='text-xl font-semibold text-gray-100'>Logout Zone</h2>
      </div>
      <p className='text-gray-300 mb-4'>Log out of your account.</p>
      <button
        className='bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200'
        onClick={handleLogout}
      >
        Logout
      </button>
    </motion.div>
  );
};

export default DangerZone;
