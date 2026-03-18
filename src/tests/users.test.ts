import { describe, it, expect, vi, afterEach } from 'vitest';
import { getUsers } from '../services/users';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Users API', () => {
  it('should return users (positive test)', async () => {
    const mockUsers = [
      {
        id: '1',
        organization: 'Lendsqr',
        username: 'grace1',
        email: 'grace1@example.com',
        phoneNumber: '08010000001',
        dateJoined: '2020-01-01 10:00 AM',
        status: 'Active',
        fullName: 'Grace Effiom',
        bvn: '12345678901',
        gender: 'Female',
        maritalStatus: 'Single',
        children: '0',
        residenceType: "Parent's Apartment",
        educationLevel: 'B.Sc',
        employmentStatus: 'Employed',
        sector: 'FinTech',
        duration: '2 years',
        officeEmail: 'grace1@lendsqr.com',
        monthlyIncome: ['₦200,000', '₦400,000'],
        loanRepayment: '₦40,000',
        twitter: '@grace1',
        facebook: 'grace1',
        instagram: '@grace1gram',
        guarantorName: 'Ada Obi',
        guarantorPhone: '08110000001',
        guarantorEmail: 'ada@example.com',
        guarantorRelationship: 'Sister',
        accountBalance: '₦200,000.00',
        accountNumber: '9123456780',
        tier: 2,
      },
    ];

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockUsers,
      })
    );

    const users = await getUsers();

    expect(users.length).toBeGreaterThan(0);
    expect(users[0].email).toBe('grace1@example.com');
  });

  it('should throw an error when fetch fails (negative test)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => [],
      })
    );

    await expect(getUsers()).rejects.toThrow('Failed to fetch users');
  });
});