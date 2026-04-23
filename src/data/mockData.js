/** Mock catalogue items shown on the dashboard */
export const mockAvailableItems = [
  {
    id: 'it-1',
    name: 'Semester notes — Data Structures',
    ownerName: 'Aisha Khan',
    available: true,
    description: 'Printed bundle + PDF link after borrow. Library pickup preferred.',
    whatsapp: '919876543210',
    instagram: 'aisha.studies',
  },
  {
    id: 'it-2',
    name: '65W USB-C laptop charger',
    ownerName: 'Rohan Mehta',
    available: true,
    description: 'Lenovo slim tip; works for most USB-C laptops.',
    whatsapp: '918765432109',
    instagram: '',
  },
  {
    id: 'it-3',
    name: 'Cricket kit (bat + pads)',
    ownerName: 'Emily Chen',
    available: false,
    description: 'Out with the sports club until next week.',
    whatsapp: '919998887776',
    instagram: 'emily_on_campus',
  },
  {
    id: 'it-4',
    name: 'Mini projector',
    ownerName: 'Dev Patel',
    available: true,
    description: 'HDMI + power cable. Handle gently.',
    whatsapp: '',
    instagram: 'dev.projects',
  },
  {
    id: 'it-5',
    name: 'Drafter + sheet holder',
    ownerName: 'Jordan Lee',
    available: true,
    description: 'For engineering drawing labs.',
    whatsapp: '919112233445',
    instagram: 'jordan.draws',
  },
  {
    id: 'it-6',
    name: 'Bluetooth speaker (small)',
    ownerName: 'Sam Wilson',
    available: false,
    description: 'Charging soon; will mark available again.',
    whatsapp: '918889990011',
    instagram: 'sam.playlist',
  },
]

/** Items the current user has borrowed */
export const mockBorrowedItems = [
  {
    id: 'br-1',
    itemName: 'Microeconomics notes (bound)',
    borrowDate: '2026-03-18',
  },
  {
    id: 'br-2',
    itemName: 'USB-C hub (7-in-1)',
    borrowDate: '2026-03-25',
  },
]

/** Items the current user has lent out */
export const mockLentItems = [
  {
    id: 'ln-1',
    itemName: 'Scientific calculator',
    borrowerName: 'Priya Sharma',
    status: 'active',
  },
  {
    id: 'ln-2',
    itemName: 'Campus map (laminated)',
    borrowerName: 'Alex Rivera',
    status: 'returned',
  },
]
