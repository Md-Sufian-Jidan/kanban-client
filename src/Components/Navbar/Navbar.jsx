import { useState, } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { KanbanSquare } from 'lucide-react';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useAuth()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard/overview' },
  ];


  const handleLogout = async () => {
    await logOut();
    navigate('/');
    return toast.success('Logout Successful');
  };

  const navVariants = {
    hidden: { y: -60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 70 },
    },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-white shadow-soft px-6 py-4 rounded-b-2xl z-50"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary font-offside">
          <KanbanSquare className="w-6 h-6 text-primary" />
          Kanban Board
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-text font-medium items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-primary transition"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className="hover:text-red-500 transition">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-primary transition">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden mt-4 flex flex-col gap-3 text-text font-medium p-4 rounded-b-2xl shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className="hover:text-red-500">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-primary" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          )}
        </motion.div>
      )}
    </motion.nav>

  );
};

export default Navbar;
