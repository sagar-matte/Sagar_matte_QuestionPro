const db = require('../../db/db.js');

const updateData = async (req, res) => {
    const itemsToUpdate = req.body;
    try {
        const results = await updatelogic(itemsToUpdate);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

function updatelogic(itemsToUpdate) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(itemsToUpdate) || itemsToUpdate.length === 0) {
            reject({ error: 'Invalid or empty items array' });
            return;
        }

        const updatePromises = itemsToUpdate.map(item => {
            const { name, price, qty } = item;

            if (!name) {
                return Promise.reject({ error: 'Missing name parameter' });
            }

            // Construct the dynamic data object for update
            const updatedData = {};

            if (price || price == 0) {
                updatedData.price = price;
            }

            if (qty || qty == 0) {
                updatedData.qty = qty;
            }

            // Update data based on name
            return new Promise((resolve, reject) => {
                db.query(`UPDATE grocery SET ? WHERE name = ?`, [updatedData, name], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error('Error executing UPDATE query:', updateErr);
                        reject({ error: 'Internal Server Error' });
                        return;
                    }

                    if (updateResult.affectedRows === 0) {
                        resolve({ error: `Data not found for the provided name: ${name}` });
                        return ;
                    }

                    resolve({ message: `Update successful for ${name}`, updatedData });
                });
            });
        });

        // Wait for all update promises to complete
        Promise.all(updatePromises)
        .then(results => {
            resolve(results);
        })
        .catch(error => {
            console.error(error);
            reject({ error: 'Internal Server Error' });
        });
    });
}

module.exports ={updateData, updatelogic};