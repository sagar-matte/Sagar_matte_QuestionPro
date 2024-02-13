const db = require('../../db/db.js');

const fetchdata = async (req, res) => {
    if (req && res) {
        // Called as a route handler
        db.query('SELECT * FROM grocery', (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json(result);
        });
    } else {
        // Called as a standalone function
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM grocery', (err, result) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                    return;
                }
                const formattedResult = result.map(row => ({ ...row }));
                resolve(formattedResult);
                
            });
        });
    }
};

module.exports =  fetchdata;

