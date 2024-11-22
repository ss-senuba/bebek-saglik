
const jwt = require('jsonwebtoken');

const dogrula = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Erişim reddedildi' });
    }

    try {
      const decoded = jwt.verify(token, 'secret-key');
      req.kullanici = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token' });
    }
};
