import { House, LayoutDashboard, TrendingUp, Users, Menu } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    color: "#6366f1",
    path: "/",
  },
  {
    name: "Houses",
    icon: House,
    color: "#f59e0b",
    path: "/houses",
  },
  {
    name: "Tenants",
    icon: Users,
    color: "#f59e0b",
    path: "/tenants",
  },
  {
    name: "Analytics",
    icon: TrendingUp,
    color: "#3BB2F6",
    path: "/analytics",
  },
  {
    name: "Settings",
    icon: LayoutDashboard,
    color: "#6366f1",
    path: "/settings",
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
  <motion.div
    className={`reative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
      isOpen ? "w-64" : "w-20"
    }`}
    animate={{ width: isOpen ? 256 : 80 }}
  >
    <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
      >
        <Menu size={24} />
      </motion.button>
      <nav className="mt-8 flex-grow ">
        {SIDEBAR_ITEMS.map((item, index) => (
       <Link key={item.href} to={item.href}>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2"
            >
                <item.icon size={20} style={{ color: item.color, minWidth: '20px' }} />
                <AnimatePresence>
                    {isOpen && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 , delay: 0.3 }}
                            className="ml-4 whitespace-nowrap"
                        >
                            {item.name}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>

       </Link>
        ))}
    
    </nav>
    </div>
  </motion.div>

 

    );
}
