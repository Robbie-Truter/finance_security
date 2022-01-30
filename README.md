# finance_security
cd server
npm start

## cd client
npm start

We display stock,market data and crypto data to our clients who have registered an account with us.

Upon registration we request users to input their account details and confirm how often they wish to receive emails with market data, stock & crypto updates.

We also ask users to confirm if they consider themselves to be technical users or non-technical users. 

We collect stock and crypto data from Third party APIs, we then convert this data that is in JSON format to a more readable format using React.

The user inputs confirmed upon registration will determine how often this data will be sent to them.

This gets stored on the database.

While logged in, users can also be redirected to news websites where the data originally comes from.

Non technical users will not be able to view market data, stock and cryptocurrencies on the website but will be getting crypto data updates via email as often as they request based on input asked during registration.

Technical users will be able to view all market data, stocks and crypto data on the website & get emails as often as requested based on input asked during registration.

