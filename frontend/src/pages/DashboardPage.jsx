import { House } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DashboardTable from "../components/dashboard/DashboardTable";
import { useEffect, useState } from "react";

// Sample room data simulating what you'd get from the GET_ROOM query
const roomData = [
  { id: "670c3e33b499bd16e623a188", room_no: "A002", size: 0, status: "VACANT", /* other fields */ },
  { id: "670c3e33b499bd16e623a188", room_no: "A002", size: 0, status: "RENTED", /* other fields */ },

  { id: "670c3e33b499bd16e623a189", room_no: "A003", size: 1, status: "RENTED", /* other fields */ },
  { id: "670c3e33b499bd16e623a189", room_no: "A003", size: 1, status: "VACANT", /* other fields */ },

  { id: "670c3e33b499bd16e623a188", room_no: "A004", size: 2, status: "VACANT", /* other fields */ },
  { id: "670c3e33b499bd16e623a188", room_no: "A004", size: 2, status: "RENTED", /* other fields */ },

  { id: "670c3e33b499bd16e623a188", room_no: "A005", size: 3, status: "RENTED", /* other fields */ },
  { id: "670c3e33b499bd16e623a188", room_no: "A005", size: 3, status: "VACANT", /* other fields */ },
  { id: "670c3e33b499bd16e623a188", room_no: "A005", size: 3, status: "VACANT", /* other fields */ },


  // Add more rooms as necessary
];

const DashboardPage = () => {
  const [roomStats, setRoomStats] = useState({
    availableBedSiter: 0,
    availableOneBedroom: 0,
    availableTwoBedroom: 0,
    availableThreeBedroom: 0,
  });

  useEffect(() => {
    // Simulate fetching data from GET_ROOM query
    const calculateRoomStats = (rooms) => {
      const stats = {
        availableBedSiter: 0,
        availableOneBedroom: 0,
        availableTwoBedroom: 0,
        availableThreeBedroom: 0,
      };

      rooms.forEach((room) => {
        if (room.status === "VACANT") {
          switch (room.size) {
            case 0:
              stats.availableBedSiter += 1;
              break;
            case 1:
              stats.availableOneBedroom += 1;
              break;
            case 2:
              stats.availableTwoBedroom += 1;
              break;
            case 3:
              stats.availableThreeBedroom += 1;
              break;
            default:
              break;
          }
        }
      });

      return stats;
    };

    const stats = calculateRoomStats(roomData);
    setRoomStats(stats);
  }, []);

  return (
    <div className='flex-1 relative z-10 overflow-auto'>
      <Header title={"Dashboard"} />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name='Available Bed-siter'
            icon={House}
            value={roomStats.availableBedSiter}
            color='#6366F1'
          />
          <StatCard
            name='Available 1 Bedrooms'
            icon={House}
            value={roomStats.availableOneBedroom}
            color='#F59E0B'
          />
          <StatCard
            name='Available 2 Bedrooms'
            icon={House}
            value={roomStats.availableTwoBedroom}
            color='#10B981'
          />
          <StatCard
            name='Available 3 Bedrooms'
            icon={House}
            value={roomStats.availableThreeBedroom}
            color='#6366F1'
          />
        </motion.div>

        <DashboardTable />
      </main>
    </div>
  );
};

export default DashboardPage;
