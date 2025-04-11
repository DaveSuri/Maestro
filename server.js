const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');

const app = express();
const port = process.env.PORT || 3000;

// --- Middleware ---
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// --- Mock Database ---
// In a real app, this would be replaced with actual database models
const mockDatabase = {
  classes: [
    { id: 1, name: 'Guitar Basics', level: 'Beginner', startTime: '2025-04-08T18:00:00Z', instructorName: 'Priya S.', spotsAvailable: 5, instrument: 'Guitar' },
    { id: 2, name: 'Piano Chords', level: 'Intermediate', startTime: '2025-04-08T19:00:00Z', instructorName: 'Amit K.', spotsAvailable: 3, instrument: 'Piano' },
    { id: 3, name: 'Advanced Guitar Solos', level: 'Advanced', startTime: '2025-04-08T20:00:00Z', instructorName: 'Priya S.', spotsAvailable: 2, instrument: 'Guitar' },
  ],
  bookings: [],
};

// --- Error Handling Middleware ---
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
};

// --- Authentication Middleware (Mock) ---
const authenticateUser = (req, res, next) => {
  // In a real app, verify JWT token here
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  // Mock user authentication
  req.user = { id: 1, name: 'Test User' };
  next();
};

// --- Validation Middleware ---
const validateBooking = [
  body('userId').isInt().withMessage('User ID must be an integer'),
  body('classId').isInt().withMessage('Class ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// --- API Routes ---
// GET /classes - Fetches classes with filtering
app.get('/classes', (req, res, next) => {
  try {
    let filteredClasses = [...mockDatabase.classes];

    // Apply filters
    if (req.query.instrument) {
      filteredClasses = filteredClasses.filter(c => 
        c.instrument.toLowerCase() === req.query.instrument.toLowerCase()
      );
    }
    if (req.query.level) {
      filteredClasses = filteredClasses.filter(c => 
        c.level.toLowerCase() === req.query.level.toLowerCase()
      );
    }
    if (req.query.instructor) {
      filteredClasses = filteredClasses.filter(c => 
        c.instructorName.toLowerCase().includes(req.query.instructor.toLowerCase())
      );
    }

    res.json({
      success: true,
      data: filteredClasses,
      count: filteredClasses.length
    });
  } catch (error) {
    next(error);
  }
});

// POST /bookings - Create a booking
app.post('/bookings', authenticateUser, validateBooking, (req, res, next) => {
  try {
    const { userId, classId } = req.body;

    // Find the class
    const classToBook = mockDatabase.classes.find(c => c.id === classId);
    if (!classToBook) {
      return res.status(404).json({ 
        error: 'Class not found' 
      });
    }

    // Check availability
    if (classToBook.spotsAvailable <= 0) {
      return res.status(400).json({ 
        error: 'Class is fully booked' 
      });
    }

    // Create booking
    const booking = {
      id: mockDatabase.bookings.length + 1,
      userId,
      classId,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    // Update database
    mockDatabase.bookings.push(booking);
    classToBook.spotsAvailable--;

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
});

// GET /bookings - Get user's bookings
app.get('/bookings', authenticateUser, (req, res, next) => {
  try {
    const userBookings = mockDatabase.bookings.filter(
      booking => booking.userId === req.user.id
    );

    res.json({
      success: true,
      data: userBookings
    });
  } catch (error) {
    next(error);
  }
});

// --- Error Handling ---
app.use(errorHandler);

// --- Start Server ---
app.listen(port, () => {
  console.log(`MAESTRO API listening at http://localhost:${port}`);
}); 