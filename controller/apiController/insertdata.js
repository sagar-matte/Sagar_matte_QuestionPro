const db = require('../../db/db.js');

const insertdata = async (req, res) => {
    // Extract data from the request body
    const items = req.body;

    // Check if the items array is provided and non-empty
    if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: 'Invalid or empty items array' });
        return;
    }

    // Construct an array of data objects
    const groceryDataArray = items.map(item => {
        const { name, price, qty } = item;

        // Check if all required fields are present for each item
        if (!name || !price || !qty) {
            res.status(400).json({ error: 'Missing required fields in one or more items' });
            return null;  // Returning null for items with missing fields
        }

        return {
            name: name,
            price: price,
            qty: qty
        };
    });

    const validGroceryDataArray = groceryDataArray.filter(Boolean);

    // Check if there are any valid items left
    if (validGroceryDataArray.length === 0) {
        res.status(400).json({ error: 'No valid items to insert' });
        return;
    }

    // Perform the bulk INSERT query
    await db.query('INSERT INTO grocery (name, price, qty) VALUES ?', [validGroceryDataArray.map(item => [item.name, item.price, item.qty])], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Insert successful', insertedData: validGroceryDataArray });
    });
};

module.exports = insertdata;