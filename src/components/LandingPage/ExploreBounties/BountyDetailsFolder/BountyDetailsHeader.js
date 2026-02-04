/** @format */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Settings } from 'lucide-react';
import BountyBoardLogo from '../../../../assets/logos/BountyBoard.svg';
import { useAuth } from '../../../../context/AuthContext';
import { Dropdown, Menu } from 'antd';

const BountyDetailsHeader = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, signOut } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Navigate to home page with search query
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="dashboard" onClick={() => navigate('/dashboard')}>
        <div className="flex items-center gap-2 py-1">
          <User size={16} />
          <span>Dashboard</span>
        </div>
      </Menu.Item>
      <Menu.Item key="settings" onClick={() => navigate('/dashboard/settings')}>
        <div className="flex items-center gap-2 py-1">
          <Settings size={16} />
          <span>Settings</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        <div className="flex items-center gap-2 py-1 text-red-600">
          <LogOut size={16} />
          <span>Sign Out</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <img 
              src={BountyBoardLogo} 
              alt="Bounty Board" 
              className="h-8 md:h-10 w-auto"
            />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find bounties by keyword or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A65CC] focus:border-transparent text-sm"
                />
                <Search 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  size={20}
                />
              </div>
            </form>
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=0A65CC&color=fff`}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    className="h-8 w-8 rounded-full object-cover border border-gray-200"
                  />
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </div>
                  </div>
                </div>
              </Dropdown>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 md:px-6 py-2 md:py-2.5 text-[#0A65CC] border border-[#0A65CC] rounded-lg font-medium hover:bg-[#E7F0FA] transition-colors text-sm md:text-base"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 md:px-6 py-2 md:py-2.5 bg-[#0A65CC] text-white rounded-lg font-medium hover:bg-[#0854B3] transition-colors text-sm md:text-base"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Find bounties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A65CC] focus:border-transparent text-sm"
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                size={18}
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default BountyDetailsHeader;
