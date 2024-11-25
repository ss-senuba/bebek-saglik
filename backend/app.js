const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth_routes = require('../backend/src/routes/auth-routes'); // Auth routes burada tanımlanmalı

require("dotenv").config();

const app = express();

app.use(cors());  // CORS'u tüm istekler için izin verir

// Middleware
app.use(express.json()); // JSON verilerini işlemek için
app.use(bodyParser.json()); // Body Parser middleware

// MongoDB bağlantısı
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("MongoDB'ye başarıyla bağlanıldı"))
  .catch((error) => console.error("MongoDB bağlantı hatası:", error));

// API route'larını kullanma
app.use("/api/auth", auth_routes);

// Ana test route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Bebeğim Care API'sine hoş geldiniz!" });
});

// Sunucuyu başlat
const port = process.env.PORT || 3000; // Eğer .env'den PORT yoksa 3000 portunu kullanır
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
