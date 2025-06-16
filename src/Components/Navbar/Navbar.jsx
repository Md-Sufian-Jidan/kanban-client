import { useState,  } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {  signOut } from 'firebase/auth';
import { KanbanSquare } from 'lucide-react';
import auth from '../../Firebase/Firebase.config';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = false;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];


  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
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
      className="bg-white shadow-soft px-6 py-4 rounded-b-2xl"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
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
          className="md:hidden mt-4 flex flex-col gap-3 text-text font-medium"
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
