const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Kullanıcı kaydı (Register)
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Tüm alanlar gereklidir' });
  }

  try {
    // E-posta zaten kayıtlı mı kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-posta zaten kullanımda' });
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Kullanıcıyı veritabanına kaydet
    await newUser.save();
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

// Kullanıcı girişi (Login)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-posta ve şifre gereklidir' });
  }

  try {
    // Kullanıcıyı e-posta ile bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Geçersiz kimlik bilgileri' });
    }

    // Şifreyi karşılaştır
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz kimlik bilgileri' });
    }

    // JWT token oluştur
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,  // Gizli anahtar çevresel değişkenden alınır
      { expiresIn: '1h' }  // Token 1 saat sonra geçersiz olur
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};
