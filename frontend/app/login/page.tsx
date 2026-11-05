
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Login failed. Please try again.');
        return;
      }

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setMessage('Login successful! Welcome back.');

setTimeout(() => {
  router.push('/');
}, 1000);
    } catch {
      setMessage('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.backgroundCircle} />

      <section style={styles.card}>
  <div style={styles.logo}>
  <div style={styles.logoTextGroup}>
    <span style={styles.logoText}>Grocery Store</span>
    <span style={styles.byHassan}>by Hassan</span>
  </div>
</div>

        <div style={styles.heading}>
          <p style={styles.eyebrow}>WELCOME BACK</p>
          <h1 style={styles.title}>Login to your account</h1>
          <p style={styles.subtitle}>
            Fresh groceries and everyday essentials, delivered to your door.
          </p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div>
            <label htmlFor="email" style={styles.label}>Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.passwordInput}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.showButton}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            ...styles.loginButton,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? 'Signing in...' : 'Login to your account →'}
          </button>
        </form>

        {message && (
          <p style={{
            ...styles.message,
            color: message.startsWith('Login successful') ? '#16834a' : '#c0392b',
          }}>
            {message}
          </p>
        )}

        <div style={styles.footer}>
          <span>Fresh choices. Better living. 🌱</span>
        </div>
      </section>

      <p style={styles.bottomText}>
        © 2026 FreshCart. All rights reserved.
      </p>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f8f1 0%, #e3f2e5 100%)',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 16px',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    fontFamily: 'Arial, sans-serif',
  },
  backgroundCircle: {
    position: 'absolute' as const,
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'rgba(65, 150, 88, 0.08)',
    top: '-150px',
    right: '-100px',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    background: '#ffffff',
    padding: '42px 36px',
    borderRadius: '20px',
    boxShadow: '0 15px 50px rgba(35, 90, 48, 0.10)',
    position: 'relative' as const,
    zIndex: 1,
  },
  logo: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginBottom: '38px',
},
  logoIcon: {
    fontSize: '30px',
  },
 logoText: {
  fontSize: '32px',
  fontWeight: 800,
  color: '#247a43',
  letterSpacing: '-1px',
  textAlign: 'center' as const,
},
  logoTextGroup: {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: '8px',
},

byHassan: {
  background: '#247a43',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 600,
  padding: '5px 18px',
  borderRadius: '20px',
  letterSpacing: '1px',
},
  heading: {
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  eyebrow: {
    color: '#299451',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '2px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '27px',
    color: '#1e3325',
    fontWeight: 750,
    margin: '0 0 12px',
  },
  subtitle: {
    fontSize: '14px',
    lineHeight: 1.7,
    color: '#7a887d',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '21px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#34483a',
    marginBottom: '9px',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box' as const,
    padding: '14px 15px',
    border: '1px solid #dce7de',
    borderRadius: '9px',
    fontSize: '14px',
    outlineColor: '#319654',
    background: '#fbfdfb',
    color: '#1e3325',

  },
  passwordWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #dce7de',
    borderRadius: '9px',
    background: '#fbfdfb',
    paddingRight: '13px',
  },
  passwordInput: {
    flex: 1,
    minWidth: 0,
    padding: '14px 15px',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: '#1e3325',

  },
  showButton: {
    border: 'none',
    background: 'transparent',
    color: '#299451',
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  loginButton: {
    width: '100%',
    padding: '15px',
    border: 'none',
    borderRadius: '9px',
    background: '#278348',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 700,
    marginTop: '5px',
    boxShadow: '0 5px 14px rgba(39, 131, 72, 0.20)',
  },
  message: {
    textAlign: 'center' as const,
    fontSize: '13px',
    marginTop: '18px',
  },
  footer: {
    borderTop: '1px solid #edf1ed',
    marginTop: '30px',
    paddingTop: '20px',
    textAlign: 'center' as const,
    color: '#89968c',
    fontSize: '12px',
  },
  bottomText: {
    color: '#829287',
    fontSize: '12px',
    marginTop: '25px',
    position: 'relative' as const,
    zIndex: 1,
  },
};
