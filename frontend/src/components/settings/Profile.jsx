import { useContext } from 'react';
import { AuthContext } from "../../context/authContext";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className='flex flex-col sm:flex-row items-center mb-6'>
        <img
          src='https://randomuser.me/api/portraits/men/3.jpg'
          alt='Profile'
          className='rounded-full w-20 h-20 object-cover mr-4'
        />

        <div>
          <h3 className='text-lg font-semibold text-gray-100'>{user.username}</h3>
          <p className='text-gray-400'>{user.email}</p>
        </div>
      </div>

      {/* Conditional rendering of the Edit Profile button */}
      {(user.role !== "user" && user.role !== "tenant") && (
        <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
          Edit Profile
        </button>
      )}
    </SettingSection>
  );
};

export default Profile;
