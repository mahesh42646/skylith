const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Skylith', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Schemas
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const helpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, default: 'help' },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

const Contact = mongoose.model('Contact', contactSchema);
const Help = mongoose.model('Help', helpSchema);
const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, message: 'Contact saved successfully', data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post('/api/help', async (req, res) => {
  try {
    const help = new Help(req.body);
    await help.save();
    res.status(201).json({ success: true, message: 'Help request saved successfully', data: help });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET || 'Skylith-secret-key-change-in-production', (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Admin routes (protected with JWT)
app.get('/api/admin/contacts', authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/admin/help', authenticateToken, async (req, res) => {
  try {
    const helpRequests = await Help.find().sort({ createdAt: -1 });
    res.json({ success: true, data: helpRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/admin/contacts/:id', authenticateToken, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/admin/help/:id', authenticateToken, async (req, res) => {
  try {
    await Help.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Help request deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/help/:id', authenticateToken, async (req, res) => {
  try {
    const help = await Help.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, data: help });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Auth routes
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user exists, if not create default admin
    let user = await User.findOne({ username });
    
    if (!user) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash(password || 'admin123', 10);
      user = new User({
        username: username || 'admin',
        password: hashedPassword,
        role: 'admin',
      });
      await user.save();
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'Skylith-secret-key-change-in-production',
      { expiresIn: '24h' }
    );
    
    res.json({ success: true, token, user: { username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Protected admin routes
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const totalHelp = await Help.countDocuments();
    const pendingHelp = await Help.countDocuments({ status: 'pending' });
    
    res.json({
      success: true,
      data: {
        totalContacts,
        totalHelp,
        pendingHelp,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

