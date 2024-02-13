const jwt = require('jsonwebtoken');
const secretKey = 'thisisthesecretekeyforadmin';

const getsecretekey = async (req, res) => {
    const payload = {
        role: 'admin',
        password : '12345'
    };

    // Generate a JWT
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    res.json(token);
}
module.exports = getsecretekey;