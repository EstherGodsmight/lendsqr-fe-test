import AppLayout from '../../components/AppLayout';

const DashboardPage = () => {
  return (
    <AppLayout title="Dashboard">
      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-card__icon stat-card__icon--purple">👥</div>
          <p className="stat-card__label">USERS</p>
          <h2 className="stat-card__value">2,453</h2>
        </article>

        <article className="stat-card">
          <div className="stat-card__icon stat-card__icon--blue">✅</div>
          <p className="stat-card__label">ACTIVE USERS</p>
          <h2 className="stat-card__value">2,453</h2>
        </article>

        <article className="stat-card">
          <div className="stat-card__icon stat-card__icon--orange">📄</div>
          <p className="stat-card__label">USERS WITH LOANS</p>
          <h2 className="stat-card__value">12,453</h2>
        </article>

        <article className="stat-card">
          <div className="stat-card__icon stat-card__icon--pink">💰</div>
          <p className="stat-card__label">USERS WITH SAVINGS</p>
          <h2 className="stat-card__value">102,453</h2>
        </article>
      </section>

      <section className="content-card">
        <h3>Overview</h3>
        <p>
          This dashboard mirrors the Lendsqr admin layout structure with quick
          access to users, account summaries, and details pages.
        </p>
      </section>
    </AppLayout>
  );
};

export default DashboardPage;