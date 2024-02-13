const db = require('../../db/db.js');

const removeData = async (req, res) => {
    const { names } = req.body;

    // Check if the names array is provided and non-empty
    if (!names || !Array.isArray(names) || names.length === 0) {
        res.status(400).json({ error: 'Invalid or empty names array' });
        return;
    }

    // Perform the bulk DELETE query based on names
    await db.query('DELETE FROM grocery WHERE name IN (?)', [names], (deleteErr, deleteResult) => {
        if (deleteErr) {
            console.error('Error executing DELETE query:', deleteErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (deleteResult.affectedRows === 0) {
            res.status(404).json({ error: 'No records found for the provided names' });
            return;
        }
        res.json({ message: 'Records removed successfully', deletedNames: names });
    });
};

 module.exports = removeData;