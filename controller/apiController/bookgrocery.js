const db = require('../../db/db.js');
const fetchdata = require('../apiController/fetchdata.js');
const {updatelogic} = require('../apiController/updatedata.js');

const bookgrocery = async (req, res) => {

    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty items array' });
    }

    // Fetch the available items from the database
    const bookeditems = await getAvailableItemsFromDatabase(items);
  
    res.json({ message: 'Order booked successfully', bookedItems: bookeditems });
};

// Sample function to fetch available items from the database
const getAvailableItemsFromDatabase = async (items) => {

    const itemsavailable =await fetchdata(1);
    const bookeditems = {};
    const createobj = {};
    itemsavailable.forEach((item)=> {
        createobj[item.name] = item;
    })
    items.forEach(item => {
        bookeditems[item.name] = createobj[item.name] ? ((createobj[item.name].qty > item.qty) ?
             item.qty : createobj[item.name].qty) : 0; 
    });
    await updateDatabaseWithBookedItems(createobj, [bookeditems]);
    return [bookeditems];
};

// Sample function to update the database with booked items
const updateDatabaseWithBookedItems = async (createobj, bookeditems) => {
    let resultArray = [];
        bookeditems.forEach(objectData => {
            for (const key in objectData) {
                if (objectData.hasOwnProperty(key)) {
                    let obj = {
                        name: key,
                        qty: createobj[key]?.qty >= objectData[key] ?  (createobj[key].qty - objectData[key]) : objectData[key]
                    };
                    resultArray.push(obj);
                }
            }
        });
    await updatelogic(resultArray);
};

module.exports = bookgrocery;