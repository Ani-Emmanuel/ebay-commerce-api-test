const express = require('express');
const path = require('path');
const Ebay = require('ebay-node-api');
require("dotenv").config()

const app = express();
app.use([express.json(), express.urlencoded({ extended: true })]);

let ebay = new Ebay({
	clientID: process.env.ClientID,
	env: 'SANDBOX', // optional default = 'PRODUCTION'
	headers: {
		// optional
		'X-EBAY-C-MARKETPLACE-ID': 'EBAY_GB' // For Great Britain https://www.ebay.co.uk
	}
});

// const ebay = new Ebay({
// 	clientID: process.env.ClientID,
// 	clientSecret: process.env.ClientSecret,
// 	body: {
// 		grant_type: 'client_credentials',
// 		scope: 'https://api.ebay.com/oauth/api_scope'
// 	}
// });

app.get('/products', async (req, res) => {
	try {
		const products = await ebay.findItemsAdvanced({
			keywords: 'iphone'
		});
		res.send(products);
	} catch (error) {
		res.send(error);
	}
});

app.get('/inventory', async (req, res) => {
	try {
		const inventory = await ebay.findItemsIneBayStores({
			storeName: 'Iphone',
			SoldItemsOnly: true,
			MinPrice: '5.00',
			MaxPrice: '800.00'
		});
		res.send([]);
	} catch (error) {
		res.send(error);
	}
});
app.listen(8000, () => console.log('we are live'));
