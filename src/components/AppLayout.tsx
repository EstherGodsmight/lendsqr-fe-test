import { NavLink } from 'react-router-dom';
import { useMemo, useState } from 'react';

type AppLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const AppLayout = ({ title, children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const initials = useMemo(() => 'AO', []);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <div className="sidebar__brand-logo">LS</div>
          <div className="sidebar__brand-text">lendsqr</div>
        </div>

        <div className="sidebar__section-title">CUSTOMERS</div>

        <nav className="sidebar__nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            Users
          </NavLink>

          <button
            type="button"
            className="sidebar__link sidebar__link--button"
            onClick={() => {
              localStorage.removeItem('selectedUser');
              setSidebarOpen(false);
              window.location.href = '/';
            }}
          >
            Logout
          </button>
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

            <div className="topbar__brand-mobile">
              <span className="topbar__brand-logo">LS</span>
              <span className="topbar__brand-text">lendsqr</span>
            </div>

            <div className="topbar__search">
              <input type="text" placeholder="Search for anything" />
              <button type="button">🔍</button>
            </div>
          </div>

          <div className="topbar__right">
            <a href="#" className="topbar__docs">
              Docs
            </a>
            <span className="topbar__bell">🔔</span>
            <div className="topbar__profile">
              <div className="topbar__avatar">{initials}</div>
              <span className="topbar__name">Ayomide</span>
            </div>
          </div>
        </header>

        <main className="page">
          <div className="page__header">
            <h1>{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;