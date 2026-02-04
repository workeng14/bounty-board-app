/** @format */

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "../Container/Container";
import { Select, Dropdown, Menu } from "antd";
import { MenuOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../../context/AuthContext";

export const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="dashboard" onClick={() => navigate('/dashboard')}>
        <div className="flex items-center gap-2 py-1">
          <UserOutlined />
          <span>Dashboard</span>
        </div>
      </Menu.Item>
      <Menu.Item key="settings" onClick={() => navigate('/dashboard/settings')}>
        <div className="flex items-center gap-2 py-1">
          <SettingOutlined />
          <span>Settings</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        <div className="flex items-center gap-2 py-1 text-red-600">
          <LogoutOutlined />
          <span>Sign Out</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  const USAFlag = () => (
    <svg width='20' height='14' viewBox='0 0 7410 3900'>
      <rect width='7410' height='3900' fill='#b22234' />
      <g fill='#fff'>
        <rect y='300' width='7410' height='300' />
        <rect y='900' width='7410' height='300' />
        <rect y='1500' width='7410' height='300' />
        <rect y='2100' width='7410' height='300' />
        <rect y='2700' width='7410' height='300' />
        <rect y='3300' width='7410' height='300' />
      </g>
      <rect width='2964' height='2100' fill='#3c3b6e' />
      <g fill='#fff'>
        {Array.from({ length: 9 }, (_, row) =>
          Array.from({ length: row % 2 === 0 ? 6 : 5 }, (_, col) => {
            const x = col * 494 + (row % 2 === 0 ? 82 : 329);
            const y = row * 210 + 105;
            return (
              <polygon
                key={`${row}-${col}`}
                points={`${x},${y - 70} ${x + 20},${y + 22} ${x - 30},${
                  y - 22
                } ${x + 30},${y - 22} ${x - 20},${y + 22}`}
              />
            );
          }),
        )}
      </g>
    </svg>
  );

  const ArabicFlag = () => (
    <svg width='20' height='14' viewBox='0 0 512 336'>
      <rect width='512' height='336' fill='#006c35' />
      <text
        x='50%'
        y='45%'
        dominantBaseline='middle'
        textAnchor='middle'
        fill='white'
        fontSize='35'
        fontFamily='Arial'
      >
        لا إله إلا الله
      </text>
      <rect x='140' y='240' width='230' height='20' fill='white' />
    </svg>
  );

  return (
  <div className="w-full bg-[#F1F2F4]">
    <div className="max-w-[100rem] w-[85%] mx-auto">
      {/* شريط الروابط */}
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-8 sm:gap-12">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link text-[14px] ${isActive ? "active-link" : ""}`
            }
          >
            Home
          </NavLink>

          {/* على الديسكتوب نظهر باقي اللنكات؛ على الموبايل منخلي منيو */}
          {!isMobile && (
            <>
              {isAuthenticated && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `nav-link text-[14px] ${isActive ? "active-link" : ""}`
                  }
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link text-[14px] ${isActive ? "active-link" : ""}`
                }
              >
                About Us
              </NavLink>
            </>
          )}

          {isMobile && (
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MenuOutlined className="text-xl" />
            </button>
          )}
        </div>

        {/* User Profile or Login/Signup */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=0A65CC&color=fff`}
                  alt={`${user?.firstName} ${user?.lastName}`}
                  className="h-7 w-7 rounded-full object-cover border border-gray-300"
                />
                {!isMobile && (
                  <span className="text-sm font-medium text-gray-900">
                    {user?.firstName}
                  </span>
                )}
              </div>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className="px-3 py-1.5 text-sm text-[#0A65CC] font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-3 py-1.5 text-sm bg-[#0A65CC] text-white font-medium rounded-lg hover:bg-[#0854B3] transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>

    {/* قائمة الموبايل المنسدلة */}
    {isMobile && (
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[200px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2 pl-4 pb-3">
          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-link text-[14px] ${isActive ? "active-link" : ""}`
              }
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link text-[14px] ${isActive ? "active-link" : ""}`
            }
          >
            About Us
          </NavLink>
        </div>
      </div>
    )}

    <style>
      {`
        .nav-link {
          position: relative;
          padding-bottom: 4px;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background-color: transparent;
          transition: background-color 0.3s ease;
        }
        .active-link {
          font-weight: 500;
          color: #0A65CC;
        }
        .active-link::after {
          background-color: #0A65CC;
          bottom: ${isMobile ? "-1px" : "-11px"};
        }
      `}
    </style>
  </div>
);

};
