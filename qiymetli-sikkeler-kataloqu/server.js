
// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');
// const multer = require('multer'); 
// const path = require('path');
// const app = express();

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'qiymetli_sikkeler'
// });

// db.connect((err) => {
//   if (err) {
//     console.log('Verilənlər bazası bağlantısında səhv baş verdi:', err);
//     return;
//   }
//   console.log('Verilənlər bazası ilə uğurlu bağlantı!');
// });

// app.use(express.json());

// app.use(cors());

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); 
//   }
// });
// const upload = multer({ storage: storage });

// app.post('/add-coin', upload.single('file'), (req, res) => {
//   const { name, value } = req.body;
//   const image_url = req.file ? `/uploads/${req.file.filename}` : null; 

//   const query = 'INSERT INTO coins (name, value, image_url) VALUES (?, ?, ?)';
//   db.query(query, [name, value, image_url], (err, result) => {
//     if (err) {
//       console.error('Xəta baş verdi:', err);
//       return res.status(500).send('Xəta baş verdi, coin əlavə olunmadı.');
//     }
//     res.status(200).send('Yeni sikkə uğurla əlavə edildi!');
//   });
// });

// app.get('/coins', (req, res) => {
//   const query = 'SELECT * FROM coins';
//   db.query(query, (err, result) => {
//     if (err) {
//       console.error('Xəta baş verdi:', err);
//       return res.status(500).send('Xəta baş verdi, sikkələr alınmadı.');
//     }
//     res.json(result);  
//   });
// });

// app.listen(3001, () => {
//   console.log('Server 3001 portunda işləyir!');
// });





const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path');
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'qiymetli_sikkeler'
});

db.connect((err) => {
  if (err) {
    console.log('Verilənlər bazası bağlantısında səhv baş verdi:', err);
    return;
  }
  console.log('Verilənlər bazası ilə uğurlu bağlantı!');
});

app.use(express.json());

app.use(cors());

// Multer konfiqurasiyası
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage: storage });

// Yeni sikkə əlavə etmək üçün POST sorğusu
app.post('/add-coin', upload.single('file'), (req, res) => {
  const { name, value } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null; 

  const query = 'INSERT INTO coins (name, value, image_url) VALUES (?, ?, ?)';
  db.query(query, [name, value, image_url], (err, result) => {
    if (err) {
      console.error('Xəta baş verdi:', err);
      return res.status(500).send('Xəta baş verdi, coin əlavə olunmadı.');
    }
    res.status(200).send('Yeni sikkə uğurla əlavə edildi!');
  });
});

// Bütün sikkələri almaq üçün GET sorğusu
app.get('/coins', (req, res) => {
  const query = 'SELECT * FROM coins';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Xəta baş verdi:', err);
      return res.status(500).send('Xəta baş verdi, sikkələr alınmadı.');
    }
    res.json(result);  
  });
});

// İstifadəçinin tək bir sikkəsinin məlumatlarını yeniləmək üçün PUT sorğusu
app.put('/coins/:coinId', (req, res) => {
  const { coinId } = req.params; // URL-dən coinId alırıq
  const { name, value } = req.body; // Yenilənmiş məlumatları bədəndən alırıq

  // Yenilənmiş məlumatlarla UPDATE sorğusunu icra edirik
  const query = 'UPDATE coins SET name = ?, value = ? WHERE id = ?';
  db.query(query, [name, value, coinId], (err, result) => {
    if (err) {
      console.error('Xəta baş verdi:', err);
      return res.status(500).send('Xəta baş verdi, məlumat yenilənmədi.');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Sikkə tapılmadı!');
    }
    res.status(200).send('Sikkə uğurla yeniləndi!');
  });
});

app.listen(3001, () => {
  console.log('Server 3001 portunda işləyir!');
});
