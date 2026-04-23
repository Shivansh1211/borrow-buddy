

const API_URL = 'http://localhost:5000/api';

async function testFlow() {
  console.log('--- STARTING INTEGRATION TEST ---');
  
  // 1. Register User A
  let res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'User A', email: 'user.a@ug.sharda.ac.in', password: 'password123' })
  });
  const userA = await res.json();
  console.log('User A registered:', userA.email);

  // 2. Register User B
  res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'User B', email: 'user.b@ug.sharda.ac.in', password: 'password123' })
  });
  const userB = await res.json();
  console.log('User B registered:', userB.email);

  // 3. User A adds an item
  res = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userA.token}` },
    body: JSON.stringify({ name: 'A Calculator', description: 'Works fine', whatsapp: '9999999999', available: true })
  });
  const itemA = await res.json();
  console.log('User A added item:', itemA.name);

  // 4. User B checks items
  res = await fetch(`${API_URL}/items`, {
    headers: { Authorization: `Bearer ${userB.token}` }
  });
  const itemsList = await res.json();
  console.log('User B sees items count:', itemsList.length);

  // 5. User B borrows the item
  res = await fetch(`${API_URL}/items/${itemA._id}/borrow`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${userB.token}` }
  });
  const tx = await res.json();
  console.log('User B borrowed item. TX Status:', tx.status);

  // 6. User B checks borrowed items
  res = await fetch(`${API_URL}/users/borrowed`, {
    headers: { Authorization: `Bearer ${userB.token}` }
  });
  const borrowedList = await res.json();
  console.log('User B borrowed list count:', borrowedList.length);

  // 7. User A checks lent items
  res = await fetch(`${API_URL}/users/lent`, {
    headers: { Authorization: `Bearer ${userA.token}` }
  });
  const lentList = await res.json();
  let lentMatched = lentList.find(x => x._id.toString() === itemA._id.toString() || x.item?._id.toString() === itemA._id.toString());
  console.log('User A lent item status:', lentMatched?.status);

  // 8. User B returns the item
  res = await fetch(`${API_URL}/items/${itemA._id}/return`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${userB.token}` }
  });
  const returnObj = await res.json();
  console.log('User B returned item message:', returnObj.message);

  console.log('--- TEST FINISHED ---');
}

testFlow().catch(console.error);
