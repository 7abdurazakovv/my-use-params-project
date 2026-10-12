import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Xatolik:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Ma'lumotlar yuklanmoqda...</div>;

  return (
    <div className="home-container">
      <h1>Foydalanuvchilar Ro'yxati</h1>
      <div className="user-grid">
        {users.map(user => (
          <div className="user-card" key={user.id}>
            <h3>{user.name}</h3>
            <p><strong>Username:</strong> @{user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>City:</strong> {user.address.city}</p>
            <Link to={`/user/${user.id}`} className="details-btn">
              Batafsil ko'rish
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}