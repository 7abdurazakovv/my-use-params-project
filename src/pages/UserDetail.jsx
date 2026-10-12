import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDetail.css';

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API'dan faqat bitta foydalanuvchi ma'lumotini ID bo'yicha olib kelish
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Agar ID bo'yicha foydalanuvchi topilmasa, 404 sahifasiga o'tkazish
        navigate('/404', { replace: true });
      });
  }, [id, navigate]);

  if (loading) return <div className="loading">Yuklanmoqda...</div>;
  if (!user) return null;

  return (
    <div className="detail-container">
      <h2>{user.name}</h2>
      <div className="detail-info"><strong>Username:</strong> @{user.username}</div>
      <div className="detail-info"><strong>Email:</strong> {user.email}</div>
      <div className="detail-info"><strong>Phone:</strong> {user.phone}</div>
      <div className="detail-info"><strong>Website:</strong> {user.website}</div>
      <div className="detail-info"><strong>Company:</strong> {user.company.name} ({user.company.catchPhrase})</div>
      <div className="detail-info">
        <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}
      </div>
      
      <Link to="/" className="back-btn">Orqaga qaytish</Link>
    </div>
  );
}