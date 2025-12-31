'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [contacts, setContacts] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);
  const [stats, setStats] = useState({ totalContacts: 0, totalHelp: 0, pendingHelp: 0 });
  const [activeTab, setActiveTab] = useState('contacts');
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchData(savedToken);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', data.token);
        fetchData(data.token);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed. Make sure the server is running.');
    }
  };

  const fetchData = async (authToken) => {
    try {
      const [contactsRes, helpRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/contacts', {
          headers: { 'Authorization': `Bearer ${authToken}` },
        }),
        fetch('http://localhost:5000/api/admin/help', {
          headers: { 'Authorization': `Bearer ${authToken}` },
        }),
        fetch('http://localhost:5000/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${authToken}` },
        }),
      ]);

      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setContacts(contactsData.data || []);
      }

      if (helpRes.ok) {
        const helpData = await helpRes.json();
        setHelpRequests(helpData.data || []);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.data || {});
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setToken('');
    setContacts([]);
    setHelpRequests([]);
  };

  const deleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setContacts(contacts.filter(c => c._id !== id));
      }
    } catch (error) {
      alert('Failed to delete contact');
    }
  };

  const deleteHelp = async (id) => {
    if (!confirm('Are you sure you want to delete this help request?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/admin/help/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setHelpRequests(helpRequests.filter(h => h._id !== id));
      }
    } catch (error) {
      alert('Failed to delete help request');
    }
  };

  const updateHelpStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/help/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setHelpRequests(helpRequests.map(h => h._id === id ? { ...h, status } : h));
      }
    } catch (error) {
      alert('Failed to update status');
    }
  };

  if (!isAuthenticated) {
    return (
      <div 
        className="d-flex align-items-center justify-content-center min-vh-100"
        style={{ background: 'var(--gradient-primary)' }}
      >
        <div className="glass rounded-4 p-5" style={{ width: '100%', maxWidth: '400px', background: 'rgba(255, 255, 255, 0.95)' }}>
          <h2 className="text-center mb-4 gradient-text">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderRadius: '10px' }}
              />
            </div>
            <button type="submit" className="btn btn-gradient w-100">
              Login
            </button>
          </form>
          <p className="text-center mt-3 small text-muted">
            Default: admin / admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light-bg)', paddingTop: '20px' }}>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="gradient-text">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-outline-gradient">
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm glass" style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px' }}>
              <div className="card-body text-center p-4">
                <h3 className="gradient-text mb-2">{stats.totalContacts}</h3>
                <p className="mb-0" style={{ color: 'var(--text-light)' }}>Total Contacts</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm glass" style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px' }}>
              <div className="card-body text-center p-4">
                <h3 className="gradient-text mb-2">{stats.totalHelp}</h3>
                <p className="mb-0" style={{ color: 'var(--text-light)' }}>Total Help Requests</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm glass" style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px' }}>
              <div className="card-body text-center p-4">
                <h3 className="gradient-text mb-2">{stats.pendingHelp}</h3>
                <p className="mb-0" style={{ color: 'var(--text-light)' }}>Pending Requests</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('contacts')}
              style={{ 
                color: activeTab === 'contacts' ? 'var(--light-purple)' : 'var(--text-light)',
                borderColor: activeTab === 'contacts' ? 'var(--light-purple)' : 'transparent'
              }}
            >
              Contacts ({contacts.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'help' ? 'active' : ''}`}
              onClick={() => setActiveTab('help')}
              style={{ 
                color: activeTab === 'help' ? 'var(--light-purple)' : 'var(--text-light)',
                borderColor: activeTab === 'help' ? 'var(--light-purple)' : 'transparent'
              }}
            >
              Help Requests ({helpRequests.length})
            </button>
          </li>
        </ul>

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="card border-0 shadow-sm glass" style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px' }}>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone || 'N/A'}</td>
                        <td>{contact.subject}</td>
                        <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            onClick={() => deleteContact(contact._id)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {contacts.length === 0 && (
                  <p className="text-center text-muted py-4">No contacts yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Help Requests Tab */}
        {activeTab === 'help' && (
          <div className="card border-0 shadow-sm glass" style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px' }}>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {helpRequests.map((help) => (
                      <tr key={help._id}>
                        <td>{help.name}</td>
                        <td>{help.email}</td>
                        <td style={{ maxWidth: '300px' }}>{help.message}</td>
                        <td>
                          <select
                            value={help.status}
                            onChange={(e) => updateHelpStatus(help._id, e.target.value)}
                            className="form-select form-select-sm"
                            style={{ width: 'auto' }}
                          >
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td>{new Date(help.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            onClick={() => deleteHelp(help._id)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {helpRequests.length === 0 && (
                  <p className="text-center text-muted py-4">No help requests yet</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

