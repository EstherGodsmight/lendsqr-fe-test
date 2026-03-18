import fs from 'fs';
import path from 'path';

const statuses = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
const genders = ['Male', 'Female'];
const maritalStatuses = ['Single', 'Married'];
const educationLevels = ['B.Sc', 'M.Sc', 'HND', 'OND'];
const employmentStatuses = ['Employed', 'Unemployed', 'Self-Employed'];
const sectors = ['FinTech', 'Education', 'Retail', 'Health', 'Technology'];
const residenceTypes = ["Parent's Apartment", 'Flat', 'Duplex', 'Bungalow'];
const relationships = ['Brother', 'Sister', 'Friend', 'Parent'];
const organizations = ['Lendsqr', 'Irorun', 'Lendstar', 'Credit Plus', 'Money Trust'];
const firstNames = ['Grace', 'Ada', 'John', 'David', 'Sarah', 'Mary', 'Tosin', 'Debby', 'Michael', 'Ayo'];
const lastNames = ['Effiom', 'Obi', 'Doe', 'Smith', 'James', 'Johnson', 'Dokunmu', 'Ogana', 'Lee', 'Owoeye'];

const users = Array.from({ length: 500 }, (_, i) => {
  const id = String(i + 1);
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];
  const fullName = `${firstName} ${lastName}`;
  const status = statuses[i % statuses.length];
  const gender = genders[i % genders.length];
  const organization = organizations[i % organizations.length];

  return {
    id,
    organization,
    username: `${firstName.toLowerCase()}${i + 1}`,
    email: `${firstName.toLowerCase()}${i + 1}@example.com`,
    phoneNumber: `080${String(10000000 + i).slice(0, 8)}`,
    dateJoined: `2020-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')} 10:00 AM`,
    status,
    fullName,
    bvn: String(10000000000 + i),
    gender,
    maritalStatus: maritalStatuses[i % maritalStatuses.length],
    children: String(i % 4),
    residenceType: residenceTypes[i % residenceTypes.length],
    educationLevel: educationLevels[i % educationLevels.length],
    employmentStatus: employmentStatuses[i % employmentStatuses.length],
    sector: sectors[i % sectors.length],
    duration: `${(i % 10) + 1} years`,
    officeEmail: `${firstName.toLowerCase()}${i + 1}@lendsqr.com`,
    monthlyIncome: [`₦${(200000 + i * 1000).toLocaleString()}`, `₦${(400000 + i * 1000).toLocaleString()}`],
    loanRepayment: `₦${(40000 + i * 100).toLocaleString()}`,
    twitter: `@${firstName.toLowerCase()}${i + 1}`,
    facebook: `${firstName.toLowerCase()}${i + 1}`,
    instagram: `@${firstName.toLowerCase()}${i + 1}gram`,
    guarantorName: `${firstNames[(i + 3) % firstNames.length]} ${lastNames[(i + 2) % lastNames.length]}`,
    guarantorPhone: `081${String(10000000 + i).slice(0, 8)}`,
    guarantorEmail: `guarantor${i + 1}@example.com`,
    guarantorRelationship: relationships[i % relationships.length],
    accountBalance: `₦${(200000 + i * 5000).toLocaleString()}.00`,
    accountNumber: String(9123456780 + i),
    tier: (i % 3) + 1
  };
});

const outputPath = path.join(process.cwd(), 'public', 'users.json');
fs.writeFileSync(outputPath, JSON.stringify(users, null, 2));

console.log(`Created ${users.length} users at ${outputPath}`);