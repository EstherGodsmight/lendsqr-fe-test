import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import type { User } from '../../types/user';

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('selectedUser');
    const storedUsers = localStorage.getItem('usersList');

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      if (parsedUser.id === id) {
        setUser(parsedUser);
        return;
      }
    }

    if (storedUsers) {
      const parsedUsers: User[] = JSON.parse(storedUsers);
      const matchedUser = parsedUsers.find((item) => item.id === id);
      if (matchedUser) {
        setUser(matchedUser);
      }
    }
  }, [id]);

  if (!user) {
    return (
      <AppLayout title="User Details">
        <section className="content-card">
          <p>No user data found.</p>
          <button type="button" className="btn btn--primary" onClick={() => navigate('/users')}>
            Back to Users
          </button>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="User Details">
      <div className="details-page__header-actions">
        <button type="button" className="back-link" onClick={() => navigate('/users')}>
          ← Back to Users
        </button>

        <div className="details-page__buttons">
          <button type="button" className="btn btn--outline-danger">
            Blacklist User
          </button>
          <button type="button" className="btn btn--outline-primary">
            Activate User
          </button>
        </div>
      </div>

      <section className="details-summary">
        <div className="details-summary__user">
          <div className="details-summary__avatar">
            {user.fullName
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)}
          </div>

          <div>
            <h2>{user.fullName}</h2>
            <p>{user.username}</p>
          </div>
        </div>

        <div className="details-summary__tier">
          <p>User’s Tier</p>
          <div className="stars">
            {'★'.repeat(user.tier)}
            {'☆'.repeat(3 - user.tier)}
          </div>
        </div>

        <div className="details-summary__balance">
          <h2>{user.accountBalance}</h2>
          <p>{user.accountNumber}/Providus Bank</p>
        </div>
      </section>

      <section className="details-tabs">
        <span className="details-tabs__item details-tabs__item--active">General Details</span>
        <span className="details-tabs__item">Documents</span>
        <span className="details-tabs__item">Bank Details</span>
        <span className="details-tabs__item">Loans</span>
        <span className="details-tabs__item">Savings</span>
        <span className="details-tabs__item">App and System</span>
      </section>

      <section className="content-card">
        <InfoSection
          title="Personal Information"
          items={[
            ['Full Name', user.fullName],
            ['Phone Number', user.phoneNumber],
            ['Email Address', user.email],
            ['BVN', user.bvn],
            ['Gender', user.gender],
            ['Marital Status', user.maritalStatus],
            ['Children', user.children],
            ['Type of Residence', user.residenceType],
          ]}
        />

        <InfoSection
          title="Education and Employment"
          items={[
            ['Level of Education', user.educationLevel],
            ['Employment Status', user.employmentStatus],
            ['Sector of Employment', user.sector],
            ['Duration of Employment', user.duration],
            ['Office Email', user.officeEmail],
            ['Monthly Income', user.monthlyIncome.join(' - ')],
            ['Loan Repayment', user.loanRepayment],
          ]}
        />

        <InfoSection
          title="Socials"
          items={[
            ['Twitter', user.twitter],
            ['Facebook', user.facebook],
            ['Instagram', user.instagram],
          ]}
        />

        <InfoSection
          title="Guarantor"
          items={[
            ['Full Name', user.guarantorName],
            ['Phone Number', user.guarantorPhone],
            ['Email Address', user.guarantorEmail],
            ['Relationship', user.guarantorRelationship],
          ]}
        />
      </section>
    </AppLayout>
  );
};

type InfoSectionProps = {
  title: string;
  items: [string, string][];
};

const InfoSection = ({ title, items }: InfoSectionProps) => {
  return (
    <div className="info-section">
      <h3>{title}</h3>
      <div className="info-grid">
        {items.map(([label, value]) => (
          <div key={label} className="info-grid__item">
            <p className="info-grid__label">{label}</p>
            <p className="info-grid__value">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetailsPage;