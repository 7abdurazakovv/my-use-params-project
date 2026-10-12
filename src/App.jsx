import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Lokal zaxira ma'lumotlar
const fallbackUsers = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": { "street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough" },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": { "name": "Romaguera-Crona", "catchPhrase": "Multi-layered client-server neural-net" }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": { "street": "Victor Plains", "suite": "Suite 879", "city": "Wisokyburgh" },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": { "name": "Deckow-Crist", "catchPhrase": "Proactive didactic contingency" }
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": { "street": "Douglas Extension", "suite": "Suite 847", "city": "McKenziehaven" },
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": { "name": "Romaguera-Jacobson", "catchPhrase": "Face to face bifurcated interface" }
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": { "street": "Hoeger Mall", "suite": "Apt. 692", "city": "South Elvis" },
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
    "company": { "name": "Robel-Corkery", "catchPhrase": "Multi-tiered zero tolerance productivity" }
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": { "street": "Skiles Walks", "suite": "Suite 351", "city": "Roscoeview" },
    "phone": "(254)954-1289",
    "website": "demarco.info",
    "company": { "name": "Keebler LLC", "catchPhrase": "User-centric fault-tolerant solution" }
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": { "street": "Norberto Crossing", "suite": "Apt. 950", "city": "South Christy" },
    "phone": "1-477-935-8478 x6430",
    "website": "ola.org",
    "company": { "name": "Considine-Lockman", "catchPhrase": "Synchronised bottom-line interface" }
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz",
    "address": { "street": "Rex Trail", "suite": "Suite 280", "city": "Howemouth" },
    "phone": "210.067.6132",
    "website": "elvis.io",
    "company": { "name": "Johns Group", "catchPhrase": "Configurable multimedia task-force" }
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": { "street": "Ellsworth Summit", "suite": "Suite 729", "city": "Aliyaview" },
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
    "company": { "name": "Abernathy Group", "catchPhrase": "Implemented secondary concept" }
  },
  {
    "id": 9,
    "name": "Glenna Reichert",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io",
    "address": { "street": "Dayna Park", "suite": "Suite 449", "city": "Bartholomebury" },
    "phone": "(775)976-6794 x41206",
    "website": "conrad.com",
    "company": { "name": "Yost and Sons", "catchPhrase": "Switchable contextually-based project" }
  },
  {
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": {
      "street": "Kattie Turnpike",
      "suite": "Suite 198",
      "city": "Lebsackbury"
    },
    "phone": "024-648-3804",
    "website": "ambrose.net",
    "company": { "name": "Hoeger LLC", "catchPhrase": "Centralized empowering task-force" }
  }
];

// iOS 26/27 Ultra-modern Dark/Light futuristic glass theme styles
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  body {
    background: #0b0f19;
    background-image: 
      radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.15) 0px, transparent 50%),
      radial-gradient(at 100% 100%, rgba(147, 51, 234, 0.15) 0px, transparent 50%);
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #f8fafc;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
`;

// Navbar Komponenti (iOS 27 Glassmorphism)
function Navbar() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '18px 36px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    }}>
      <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        iOS 27 Spatial OS
      </h2>
      <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: '600', fontSize: '14px', background: 'rgba(59, 130, 246, 0.15)', padding: '8px 16px', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.3)', transition: 'all 0.3s ease' }}>
        Bosh sahifa
      </Link>
    </nav>
  );
}

// Home Sahifasi
function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUsers(fallbackUsers);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '120px', color: '#94a3b8', fontSize: '16px' }}>Neural tarmoqdan yuklanmoqda...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '30px', letterSpacing: '-1px', color: '#ffffff' }}>Foydalanuvchilar Paneli</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {users.map(user => (
          <div key={user.id} style={{
            background: 'rgba(30, 41, 59, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
            e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.4)';
            e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(37, 99, 235, 0.25)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: '#f8fafc' }}>{user.name}</h3>
            <p style={{ color: '#93c5fd', margin: '4px 0', fontSize: '14px', fontWeight: '500' }}>@{user.username}</p>
            <p style={{ color: '#94a3b8', margin: '10px 0 20px 0', fontSize: '14px' }}>{user.email}</p>
            <Link to={`/user/${user.id}`} style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #2563eb, #9333ea)',
              color: '#fff',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
              transition: 'all 0.2s ease'
            }}>
              Ma'lumotni ochish
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// UserDetail Sahifasi (useParams orqali)
function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        const foundUser = fallbackUsers.find(item => item.id === Number(id));
        if (foundUser) {
          setUser(foundUser);
          setLoading(false);
        } else {
          navigate('/404', { replace: true });
        }
      });
  }, [id, navigate]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '120px', color: '#94a3b8', fontSize: '16px' }}>Yuklanmoqda...</div>;
  if (!user) return null;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '60px auto',
      padding: '40px',
      background: 'rgba(30, 41, 59, 0.65)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderRadius: '28px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h2 style={{ color: '#fff', marginTop: 0, fontSize: '26px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '18px', letterSpacing: '-0.5px' }}>
        {user.name}
      </h2>
      
      <div style={{ margin: '16px 0', fontSize: '15px', display: 'flex' }}><strong style={{ color: '#94a3b8', width: '120px' }}>Username:</strong> <span style={{ color: '#e2e8f0' }}>@{user.username}</span></div>
      <div style={{ margin: '16px 0', fontSize: '15px', display: 'flex' }}><strong style={{ color: '#94a3b8', width: '120px' }}>Email:</strong> <span style={{ color: '#e2e8f0' }}>{user.email}</span></div>
      <div style={{ margin: '16px 0', fontSize: '15px', display: 'flex' }}><strong style={{ color: '#94a3b8', width: '120px' }}>Phone:</strong> <span style={{ color: '#e2e8f0' }}>{user.phone}</span></div>
      <div style={{ margin: '16px 0', fontSize: '15px', display: 'flex' }}><strong style={{ color: '#94a3b8', width: '120px' }}>Website:</strong> <span style={{ color: '#e2e8f0' }}>{user.website}</span></div>
      <div style={{ margin: '16px 0', fontSize: '15px', display: 'flex' }}><strong style={{ color: '#94a3b8', width: '120px' }}>Company:</strong> <span style={{ color: '#e2e8f0' }}>{user.company?.name}</span></div>
      <div style={{ margin: '16px 0', fontSize: '15px', display: 'flex' }}><strong style={{ color: '#94a3b8', width: '120px' }}>City:</strong> <span style={{ color: '#e2e8f0' }}>{user.address?.city}</span></div>
      
      <Link to="/" style={{
        display: 'inline-block',
        marginTop: '28px',
        padding: '12px 24px',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        color: '#fff',
        borderRadius: '14px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '600',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        transition: 'all 0.2s ease'
      }}>
        ← Orqaga qaytish
      </Link>
    </div>
  );
}

// 404 Sahifasi
function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '140px 20px' }}>
      <h1 style={{ fontSize: '96px', fontWeight: '900', background: 'linear-gradient(135deg, #ef4444, #f43f5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>404</h1>
      <h2 style={{ color: '#f8fafc', fontSize: '24px', margin: '15px 0 10px 0', fontWeight: '700' }}>Sahifa topilmadi</h2>
      <p style={{ color: '#94a3b8', marginBottom: '30px', fontSize: '16px' }}>Siz qidirayotgan manzil mavjud emas yoki o'chirilgan.</p>
      <Link to="/" style={{
        display: 'inline-block',
        padding: '14px 28px',
        background: 'linear-gradient(135deg, #2563eb, #9333ea)',
        color: 'white',
        borderRadius: '16px',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '15px',
        boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)'
      }}>
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}

// Asosiy App
export default function App() {
  return (
    <BrowserRouter>
      <style>{globalStyles}</style>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}