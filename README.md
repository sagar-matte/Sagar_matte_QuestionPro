with below url and payload you can execute and check the output of the API's
In this implementation, MySQL is utilized to store details about grocery items. The table structure is defined as follows: 

CREATE TABLE `sys_config` (
  `variable` varchar(128) NOT NULL,
  `value` varchar(128) DEFAULT NULL,
  `set_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `set_by` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`variable`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


1. User Types:
   The system supports two types of users: administrators (admin) and regular users.

2. Admin Permissions:
   Administrators have the authority to fetch, update, delete, and modify grocery data.

3. User Permissions:
   users can fetch and book multiple or single grocery items. However, they do not have the privilege to add,      	modify, or delete any items in the database.

4.Booking Process:
     When a user books or purchases an item, the quantity of that item will be reduced in the database. If the available quantity for a particular item is less than the user's requested quantity, only the available items will be accessible to the user.


5.Endpoints:

Below are the details of the endpoints:

1. http://localhost:7000/api/fetchdata

2. http://localhost:7000/api/getsecretekey - 
   
   parameter 1. Authorization =  key: Authorization
		               value : "thisisthesecretekeyforadmin"
             2.  body =  {"role": "admin",
        		"password" : "12345"}


3. http://localhost:7000/api/insertdata
  
   parameter 1. Authorization =  key: Authorization
		               value : the token which was created from getsecretekey

             2. body = [{
   		 "name": "chairs",
		 "price": 500,
	         "qty":5
		 },
		{
		  "name": "tables",
		  "price": 5000,
		  "qty":5
		}]


4. http://localhost:7000/api/updateData
	
    parameter 1. Authorization =  key: Authorization
		               value : the token which was created from getsecretekey
              2.
 		[{
		    "name": "cholks",
		    "price": 300,
		    "qty": 5
		 },{
		    "name": "pen",
		    "price": 500,
		    "qty": 100
		}]


5. http://localhost:7000/api/removedata
   
   parameter 1. Authorization =  key: Authorization
		               value : the token which was created from getsecretekey

	{"names": ["pen", "pencil"]} = this is an example only


6. http://localhost:7000/api/bookgrocery
 
   parameter:  {
     "items": [
      { "name": "guitars", "qty": 2}
      ]
    }

