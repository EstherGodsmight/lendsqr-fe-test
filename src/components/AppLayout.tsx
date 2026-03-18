import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  FiBriefcase,
  FiHome,
  FiUsers,
  FiUserCheck,
  FiFileText,
  FiPercent,
  FiDatabase,
  FiClipboard,
  FiUserX,
  FiUser,
  FiLayers,
  FiSettings,
  FiSliders,
  FiBarChart2,
  FiLogOut,
  FiChevronDown,
  FiBell,
  FiSearch,
  FiGrid,
} from 'react-icons/fi';
import {
  HiOutlineBanknotes,
  HiOutlineBuildingOffice2,
  HiOutlineDocumentText,
  HiOutlineWallet,
} from 'react-icons/hi2';

type AppLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const AppLayout = ({ title, children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <div className="sidebar__brand-mark">LS</div>
          <div className="sidebar__brand-text">lendsqr</div>
        </div>

        <div className="sidebar__switch">
          <FiBriefcase />
          <span>Switch Organization</span>
          <FiChevronDown />
        </div>

        <nav className="sidebar__nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FiHome />
            <span>Dashboard</span>
          </NavLink>

          <div className="sidebar__section-title">CUSTOMERS</div>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FiUsers />
            <span>Users</span>
          </NavLink>

          <a className="sidebar__link" href="#">
            <FiUserCheck />
            <span>Guarantors</span>
          </a>

          <a className="sidebar__link" href="#">
            <HiOutlineBanknotes />
            <span>Loans</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiLayers />
            <span>Decision Models</span>
          </a>

          <a className="sidebar__link" href="#">
            <HiOutlineWallet />
            <span>Savings</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiClipboard />
            <span>Loan Requests</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiUserX />
            <span>Whitelist</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiUser />
            <span>Karma</span>
          </a>

          <div className="sidebar__section-title">BUSINESSES</div>

          <a className="sidebar__link" href="#">
            <HiOutlineBuildingOffice2 />
            <span>Organization</span>
          </a>

          <a className="sidebar__link" href="#">
            <HiOutlineBanknotes />
            <span>Loan Products</span>
          </a>

          <a className="sidebar__link" href="#">
            <HiOutlineDocumentText />
            <span>Savings Products</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiDatabase />
            <span>Fees and Charges</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiFileText />
            <span>Transactions</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiGrid />
            <span>Services</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiUsers />
            <span>Service Account</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiSliders />
            <span>Settlements</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiBarChart2 />
            <span>Reports</span>
          </a>

          <div className="sidebar__section-title">SETTINGS</div>

          <a className="sidebar__link" href="#">
            <FiSliders />
            <span>Preferences</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiPercent />
            <span>Fees and Pricing</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiClipboard />
            <span>Audit Logs</span>
          </a>

          <a className="sidebar__link" href="#">
            <FiSettings />
            <span>Systems Messages</span>
          </a>

          <button
            type="button"
            className="sidebar__link sidebar__link--button sidebar__logout"
            onClick={() => {
              localStorage.removeItem('selectedUser');
              setSidebarOpen(false);
              window.location.href = '/';
            }}
          >
            <FiLogOut />
            <span>Logout</span>
          </button>

          <div className="sidebar__version">v1.2.0</div>
        </nav>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <div className="main-area">
        <header className="topbar">
          <div className="topbar__left">
            <button
              type="button"
              className="topbar__menu"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              ☰
            </button>

            <div className="topbar__search">
              <input type="text" placeholder="Search for anything" />
              <button type="button" aria-label="Search">
                <FiSearch />
              </button>
            </div>
          </div>

          <div className="topbar__right">
            <a href="#" className="topbar__docs">
              Docs
            </a>
            <span className="topbar__bell">
              <FiBell />
            </span>
            <div className="topbar__profile">
              <div className="topbar__avatar">AO</div>
              <span className="topbar__name">Ayomide</span>
              <FiChevronDown className="topbar__chevron" />
            </div>
          </div>
        </header>

        <main className="page">
          <h1 className="page__title">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;