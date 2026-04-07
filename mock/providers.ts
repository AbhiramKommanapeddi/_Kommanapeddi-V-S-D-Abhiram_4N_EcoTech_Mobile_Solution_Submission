export interface ServiceProvider {
  id: string;
  name: string;
  category: 'Healthcare' | 'Home Services' | 'Beauty' | 'Technical' | 'Education';
  rating: number;
  profileImage: string;
  description: string;
  location: string;
  price: string;
  availableSlots: string[];
}

export const PROVIDERS: ServiceProvider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    category: 'Healthcare',
    rating: 4.9,
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    description: 'Experienced cardiologist with over 15 years in clinical practice. Specializing in heart health and prevention.',
    location: 'Central Medical Plaza, New York',
    price: '$150/hr',
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'],
  },
  {
    id: '2',
    name: 'Alex Johnson',
    category: 'Home Services',
    rating: 4.8,
    profileImage: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=200',
    description: 'Professional plumber specializing in emergency repairs and full bathroom installations.',
    location: 'Brooklyn, New York',
    price: '$80/hr',
    availableSlots: ['11:00 AM', '01:00 PM', '03:00 PM'],
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    category: 'Beauty',
    rating: 4.7,
    profileImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=200',
    description: 'Professional makeup artist and skincare specialist with a passion for natural looks.',
    location: 'Manhattan, New York',
    price: '$100/hr',
    availableSlots: ['10:00 AM', '12:00 PM', '02:00 PM', '05:00 PM'],
  },
  {
    id: '4',
    name: 'Marcus Chen',
    category: 'Technical',
    rating: 4.9,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    description: 'Senior software engineer available for private tutoring and project consulting. Expert in React and Node.js.',
    location: 'Queens, New York',
    price: '$120/hr',
    availableSlots: ['08:00 PM', '09:00 PM', '10:00 PM'],
  },
  {
    id: '5',
    name: 'Emily Davis',
    category: 'Education',
    rating: 5.0,
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    description: 'Certified mathematics tutor for K-12 and college students. Making math fun and easy to understand.',
    location: 'Staten Island, New York',
    price: '$60/hr',
    availableSlots: ['03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'],
  },
  {
    id: '6',
    name: 'Michael Brown',
    category: 'Home Services',
    rating: 4.6,
    profileImage: 'https://images.unsplash.com/photo-1540560083214-14a921ccd453?auto=format&fit=crop&q=80&w=200',
    description: 'Reliable electrician for residential and commercial electrical work. Troubleshooting and installations.',
    location: 'Bronx, New York',
    price: '$90/hr',
    availableSlots: ['09:00 AM', '11:00 AM', '01:00 PM'],
  },
];

export const CATEGORIES = ['Healthcare', 'Home Services', 'Beauty', 'Technical', 'Education'];
