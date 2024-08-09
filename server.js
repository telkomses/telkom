const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'telkomsel'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT id, role FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const { id, role } = results[0];
      res.json({ userId: id, role });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Endpoint untuk mengambil full_name berdasarkan userId
app.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = 'SELECT full_name FROM users WHERE id = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
        } else {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).send('User not found');
            }
        }
    });
});

app.get('/users', (req, res) => {
    const query = 'SELECT id, username, password, full_name, nik, vendor, role FROM users WHERE role = ?';
    
    db.query(query, ['user'], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
});

app.post('/register', (req, res) => {
  const { username, password, fullName, nik, vendor, role } = req.body;
  const query = 'INSERT INTO users (username, password, full_name, nik, vendor, role) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [username, password, fullName, nik, vendor, role], (err) => {
    if (err) {
      res.status(500).send('Registration failed');
    } else {
      res.status(200).send('User registered successfully');
    }
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/submit', upload.single('file'), (req, res) => {
  const {
    namaLop,
    unitBisnis,
    lokasi,
    program,
    ketKlarifikasi,
    namaWaspang,
    v4Checklist,
    userId,
    status,
  } = req.body;
  const file = req.file.filename;
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const query = 'INSERT INTO submissions (namaLop, unitBisnis, lokasi, program, ketKlarifikasi, namaWaspang, v4Checklist, file, user_id, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [namaLop, unitBisnis, lokasi, program, ketKlarifikasi, namaWaspang, v4Checklist, file, userId, status, createdAt], (err) => {
    if (err) throw err;
    res.send('Submission saved');
  });
});

app.get('/vendors', (req, res) => {
  const query = 'SELECT id, vendor FROM vendor';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/unit-bisnis', (req, res) => {
  const query = 'SELECT id, unit_bisnis FROM unit_bisnis';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/lokasi', (req, res) => {
  const query = 'SELECT id, lokasi FROM lokasi';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/program', (req, res) => {
  const query = 'SELECT id, program FROM program';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/programs', (req, res) => {
  const sql = 'SELECT id, program FROM program';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/ket-klarifikasi', (req, res) => {
  const query = 'SELECT id, ket_klarifikasi FROM ket_klarifikasi';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/submissions/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT * FROM submissions WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching submissions:', err);
      res.status(500).json({ error: 'Error fetching submissions' });
    } else {
      res.json(results);
    }
  });
});

app.get('/admin/overview', (req, res) => {
  let overviewData = {};

  const userQuery = 'SELECT COUNT(*) AS count FROM users';
  const totalSubmissionsQuery = 'SELECT COUNT(*) AS count FROM submissions';
  const pendingSubmissionsQuery = "SELECT COUNT(*) AS count FROM submissions WHERE status='Pending'";
  const rejectedSubmissionsQuery = "SELECT COUNT(*) AS count FROM submissions WHERE status='Rejected'";
  const approvedSubmissionsQuery = "SELECT COUNT(*) AS count FROM submissions WHERE status='Approved'";

  db.query(userQuery, (err, result) => {
    if (err) throw err;
    overviewData.users = result[0].count;

    db.query(totalSubmissionsQuery, (err, result) => {
      if (err) throw err;
      overviewData.totalSubmissions = result[0].count;

      db.query(pendingSubmissionsQuery, (err, result) => {
        if (err) throw err;
        overviewData.pendingSubmissions = result[0].count;

        db.query(rejectedSubmissionsQuery, (err, result) => {
          if (err) throw err;
          overviewData.rejectedSubmissions = result[0].count;

          db.query(approvedSubmissionsQuery, (err, result) => {
            if (err) throw err;
            overviewData.approvedSubmissions = result[0].count;

            res.json(overviewData);
          });
        });
      });
    });
  });
});

app.get('/admin/submissions', (req, res) => {
  const query = 'SELECT * FROM submissions';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching submissions:', err);
      res.status(500).json({ error: 'Error fetching submissions' });
    } else {
      res.json(results);
    }
  });
});

app.post('/admin/update-status/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = 'UPDATE submissions SET status = ? WHERE id = ?';

  db.query(query, [status, id], (err) => {
    if (err) {
      console.error('Error updating status:', err);
      res.status(500).send('Error updating status');
    } else {
      res.send('Status updated successfully');
    }
  });
});

app.post('/admin/upload-file/:id', upload.single('file'), (req, res) => {
  const { id } = req.params;
  const file = req.file.filename;
  const query = 'UPDATE submissions SET file = ? WHERE id = ?';

  db.query(query, [file, id], (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      res.status(500).send('Error uploading file');
    } else {
      res.send('File uploaded successfully');
    }
  });
});

app.post('/ket-klarifikasi', (req, res) => {
  const { ket_klarifikasi } = req.body;
  const query = 'INSERT INTO ket_klarifikasi (ket_klarifikasi) VALUES (?)';

  db.query(query, [ket_klarifikasi], (err) => {
    if (err) throw err;
    res.send('Ket Klarifikasi added successfully');
  });
});

app.get('/count-programs', (req, res) => {
  const query = `
    SELECT p.program, COUNT(s.program) AS count
    FROM program p
    LEFT JOIN submissions s ON p.program = s.program
    GROUP BY p.program
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error counting program:', err);
      return res.status(500).send('Error counting program');
    }
    res.send(results);
  });
});

app.get('/count-unit-bisnis', (req, res) => {
  const query = `
    SELECT u.unit_bisnis, COUNT(s.unitBisnis) AS count
    FROM unit_bisnis u
    LEFT JOIN submissions s ON u.unit_bisnis = s.unitBisnis
    GROUP BY u.unit_bisnis
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error counting program:', err);
      return res.status(500).send('Error counting program');
    }
    res.send(results);
  });
});

// Endpoint untuk mengedit data ket_klarifikasi berdasarkan ID
app.put('/ket-klarifikasi/:id', (req, res) => {
  const { id } = req.params;
  const { ket_klarifikasi } = req.body;
  
  const sql = 'UPDATE ket_klarifikasi SET ket_klarifikasi = ? WHERE id = ?';
  db.query(sql, [ket_klarifikasi, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.json({ message: 'Data berhasil diupdate' });
  });
});

// Endpoint untuk menambah data program
app.post('/programs', (req, res) => {
  const { program } = req.body;
  
  const sql = 'INSERT INTO program (program) VALUES (?)';
  db.query(sql, [program], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const newProgram = { id: result.insertId, program };
    res.status(201).json(newProgram);
  });
});

// Endpoint untuk menghapus data program berdasarkan ID
app.delete('/programs/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = 'DELETE FROM program WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.json({ message: 'Data berhasil dihapus' });
  });
});

// Endpoint untuk mengedit data program berdasarkan ID
app.put('/programs/:id', (req, res) => {
  const { id } = req.params;
  const { program } = req.body;
  
  const sql = 'UPDATE program SET program = ? WHERE id = ?';
  db.query(sql, [program, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.json({ message: 'Data berhasil diupdate' });
  });
});


// Endpoint untuk menambah data unit bisnis
app.post('/unit-bisnis', (req, res) => {
  const { unit_bisnis } = req.body;
  
  const sql = 'INSERT INTO unit_bisnis (unit_bisnis) VALUES (?)';
  db.query(sql, [unit_bisnis], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const newUnitBisnis = { id: result.insertId, unit_bisnis };
    res.status(201).json(newUnitBisnis);
  });
});

// Endpoint untuk mengedit data unit bisnis berdasarkan ID
app.put('/unit-bisnis/:id', (req, res) => {
  const { id } = req.params;
  const { unit_bisnis } = req.body;
  
  const sql = 'UPDATE unit_bisnis SET unit_bisnis = ? WHERE id = ?';
  db.query(sql, [unit_bisnis, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.json({ message: 'Data berhasil diupdate' });
  });
});

// Endpoint untuk menghapus data unit bisnis berdasarkan ID
app.delete('/unit-bisnis/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = 'DELETE FROM unit_bisnis WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.json({ message: 'Data berhasil dihapus' });
  });
});

// Endpoint untuk menambah data vendor
app.post('/vendors', (req, res) => {
  const { vendor } = req.body;
  
  const sql = 'INSERT INTO vendors (vendor) VALUES (?)';
  db.query(sql, [vendor], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const newVendor = { id: result.insertId, vendor };
    res.status(201).json(newVendor);
  });
});

// Endpoint untuk mengedit data vendor berdasarkan ID
app.put('/vendors/:id', (req, res) => {
  const { id } = req.params;
  const { vendor } = req.body;
  
  const sql = 'UPDATE vendors SET vendor = ? WHERE id = ?';
  db.query(sql, [vendor, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.json({ message: 'Data berhasil diupdate' });
  });
});

// Endpoint untuk menghapus data vendor berdasarkan ID
app.delete('/vendors/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = 'DELETE FROM vendors WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.json({ message: 'Data berhasil dihapus' });
  });
});


app.get('/vendor-counts', (req, res) => {
  const query = `
    SELECT v.vendor, COUNT(u.vendor) AS count
    FROM vendor v
    LEFT JOIN users u ON v.vendor = u.vendor
    GROUP BY v.vendor
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error counting vendor:', err);
      return res.status(500).send('Error counting vendor');
    }
    res.send(results);
  });
});

app.get('/count-ket-klarifikasi', (req, res) => {
  const query = `
    SELECT k.ket_klarifikasi, COUNT(s.ketKlarifikasi) AS count
    FROM ket_klarifikasi k
    LEFT JOIN submissions s ON k.ket_klarifikasi = s.ketKlarifikasi
    GROUP BY k.ket_klarifikasi
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error counting ket_klarifikasi:', err);
      return res.status(500).send('Error counting ket_klarifikasi');
    }
    res.send(results);
  });
});

app.put('/ket-klarifikasi/:id', (req, res) => {
  const { id } = req.params;
  const { ket_klarifikasi } = req.body;
  const query = 'UPDATE ket_klarifikasi SET ket_klarifikasi = ? WHERE id = ?';

  db.query(query, [ket_klarifikasi, id], (err) => {
    if (err) throw err;
    res.send('Ket Klarifikasi updated successfully');
  });
});

app.delete('/ket-klarifikasi/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM ket_klarifikasi WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) throw err;
    res.send('Ket Klarifikasi deleted successfully');
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
