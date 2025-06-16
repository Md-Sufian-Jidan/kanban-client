import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, PlusCircle, LayoutDashboard, BarChartIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const Dashboard = () => {
  const { logOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const handleLogout = () => {
    logOut().then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Logged out successfully.',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    });
  };

  const navItems = [
    { name: 'Overview', to: 'overview', icon: <BarChartIcon size={18} /> },
    { name: 'Create Task', to: 'create-task', icon: <PlusCircle size={18} /> },
    { name: 'My Tasks', to: 'my-tasks', icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background font-body">

      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-heading text-primary">Kanban Board</Link>
        <button onClick={toggleSidebar} className="text-primary">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-white shadow-lg md:static fixed z-50 top-0 left-0 h-[100vh] p-6 rounded-r-2xl sm:rounded-none font-body"
          >
            <div className="mb-6">
              <Link to="/" className="text-2xl font-heading text-primary block">Kanban Board</Link>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-2xl transition-colors duration-200 text-sm ${isActive
                      ? 'bg-accent/10 text-primary font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="mt-8 flex items-center gap-2 text-sm text-rose-600 hover:text-primary transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className=" bg-white shadow"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
