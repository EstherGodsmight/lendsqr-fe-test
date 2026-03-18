import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { getUsers } from '../../services/users';
import type { User } from '../../types/user';

const ITEMS_PER_PAGE = 10;

const UsersPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    organization: '',
    username: '',
    email: '',
    phoneNumber: '',
    status: '',
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getUsers();
        setUsers(data);
        localStorage.setItem('usersList', JSON.stringify(data));
      } catch {
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const organizationMatch =
        appliedFilters.organization === '' ||
        user.organization
          .toLowerCase()
          .includes(appliedFilters.organization.toLowerCase());

      const usernameMatch =
        appliedFilters.username === '' ||
        user.username.toLowerCase().includes(appliedFilters.username.toLowerCase());

      const emailMatch =
        appliedFilters.email === '' ||
        user.email.toLowerCase().includes(appliedFilters.email.toLowerCase());

      const phoneMatch =
        appliedFilters.phoneNumber === '' ||
        user.phoneNumber.includes(appliedFilters.phoneNumber);

      const statusMatch =
        appliedFilters.status === '' || user.status === appliedFilters.status;

      return (
        organizationMatch &&
        usernameMatch &&
        emailMatch &&
        phoneMatch &&
        statusMatch
      );
    });
  }, [users, appliedFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, page]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  const activeUsersCount = users.filter((user) => user.status === 'Active').length;
  const usersWithLoans = Math.round(users.length * 0.42);
  const usersWithSavings = Math.round(users.length * 0.77);

  const handleViewDetails = (user: User) => {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    navigate(`/users/${user.id}`);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setPage(1);
    setShowFilter(false);
  };

  const handleResetFilters = () => {
    const empty = {
      organization: '',
      username: '',
      email: '',
      phoneNumber: '',
      status: '',
    };
    setFilters(empty);
    setAppliedFilters(empty);
    setPage(1);
  };

  return (
    <AppLayout title="Users">
      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-card__icon stat-card__icon--purple">👥</div>
          <p className="stat-card__label">USERS</p>
          <h2 className="stat-card__value">{users.length.toLocaleString()}</h2>
        </article>

        <article className="stat-card">
          <div className="stat-card__icon stat-card__icon--blue">✅</div>
          <p className="stat-card__label">ACTIVE USERS</p>
          <h2 className="stat-card__value">{activeUsersCount.toLocaleString()}</h2>
        </article>

        <article className="stat-card">
          <div className="stat-card__icon stat-card__icon--orange">📄</div>
          <p className="stat-card__label">USERS WITH LOANS</p>
          <h2 className="stat-card__value">{usersWithLoans.toLocaleString()}</h2>
        </article>

        <article className="stat-card">
          <div className="stat-card__icon stat-card__icon--pink">💰</div>
          <p className="stat-card__label">USERS WITH SAVINGS</p>
          <h2 className="stat-card__value">{usersWithSavings.toLocaleString()}</h2>
        </article>
      </section>

      <section className="content-card content-card--table">
        {loading && <p>Loading users...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <>
            <div className="table-wrap">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>
                      <button
                        type="button"
                        className="column-filter-trigger"
                        onClick={() => setShowFilter((prev) => !prev)}
                      >
                        ORGANIZATION ⌄
                      </button>
                    </th>
                    <th>USERNAME</th>
                    <th>EMAIL</th>
                    <th>PHONE NUMBER</th>
                    <th>DATE JOINED</th>
                    <th>STATUS</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.organization}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.dateJoined}</td>
                      <td>
                        <span className={`status-badge status-badge--${user.status.toLowerCase()}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="users-table__menu-cell">
                        <button
                          type="button"
                          className="users-table__menu-trigger"
                          onClick={() =>
                            setOpenMenuId(openMenuId === user.id ? null : user.id)
                          }
                        >
                          ⋮
                        </button>

                        {openMenuId === user.id && (
                          <div className="row-menu">
                            <button type="button" onClick={() => handleViewDetails(user)}>
                              View Details
                            </button>
                            <button type="button">Blacklist User</button>
                            <button type="button">Activate User</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {showFilter && (
                <div className="filter-panel">
                  <div className="form-field">
                    <label>Organization</label>
                    <input
                      type="text"
                      value={filters.organization}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          organization: e.target.value,
                        }))
                      }
                      placeholder="Organization"
                    />
                  </div>

                  <div className="form-field">
                    <label>Username</label>
                    <input
                      type="text"
                      value={filters.username}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      placeholder="User"
                    />
                  </div>

                  <div className="form-field">
                    <label>Email</label>
                    <input
                      type="text"
                      value={filters.email}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="Email"
                    />
                  </div>

                  <div className="form-field">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={filters.phoneNumber}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          phoneNumber: e.target.value,
                        }))
                      }
                      placeholder="Phone Number"
                    />
                  </div>

                  <div className="form-field">
                    <label>Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                      <option value="Blacklisted">Blacklisted</option>
                    </select>
                  </div>

                  <div className="filter-panel__actions">
                    <button type="button" className="btn btn--light" onClick={handleResetFilters}>
                      Reset
                    </button>
                    <button type="button" className="btn btn--primary" onClick={handleApplyFilters}>
                      Filter
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="table-footer">
              <p>
                Showing {(page - 1) * ITEMS_PER_PAGE + 1} -{' '}
                {Math.min(page * ITEMS_PER_PAGE, filteredUsers.length)} of{' '}
                {filteredUsers.length}
              </p>

              <div className="pagination">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  ‹
                </button>
                <span>{page}</span>
                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  ›
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </AppLayout>
  );
};

export default UsersPage;