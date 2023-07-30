import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import cors from 'cors';
import { Firebase } from './firebase.js';
const firebase = new Firebase();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const port = process.env.PORT ?? 3000;
const environment = process.env.ENVIRONMENT ?? 'sandbox';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
app.post('/create_order', (req, res) => {
    create_order(JSON.parse(req.body.orderContent), req, res);
});
app.post('/complete_order', (req, res) => {
    get_access_token()
        .then(access_token => {
        fetch(endpoint_url + '/v2/checkout/orders/' + req.body.order_id + '/' + req.body.intent, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(res => res.json())
            .then(json => {
            res.send(json);
        }); //Send minimal data to client
    })
        .catch(err => {
        console.warn(err);
        res.status(500).send(err);
    });
});
//PayPal Developer YouTube Video:
//How to Retrieve an API Access Token (Node.js)
//https://www.youtube.com/watch?v=HOkkbGSxmp4
function get_access_token() {
    const auth = `${client_id}:${client_secret}`;
    const data = 'grant_type=client_credentials';
    return fetch(endpoint_url + '/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
        },
        body: data
    })
        .then(res => res.json())
        .then(json => {
        // @ts-ignore
        return json.access_token;
    });
}
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
async function create_order(order_data, req, res) {
    console.log(order_data);
    let totalPrice = 0;
    for (const cartItem of order_data) {
        totalPrice += await firebase.getProductPrice(cartItem.product.id);
    }
    ;
    console.log(totalPrice);
    totalPrice = Math.round(totalPrice * 100) / 100;
    post_order(totalPrice, req, res);
}
function post_order(order_price, req, res) {
    get_access_token()
        .then(access_token => {
        let order_data_json = {
            'intent': req.body.intent.toUpperCase(),
            'purchase_units': [{
                    'amount': {
                        'currency_code': 'EUR',
                        'value': order_price
                    }
                }]
        };
        const data = JSON.stringify(order_data_json);
        fetch(endpoint_url + '/v2/checkout/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: data
        })
            .then(res => res.json())
            .then(json => {
            res.send(json);
        }); //Send minimal data to client
    })
        .catch(err => {
        console.warn(err);
        res.status(500).send(err);
    });
}
//# sourceMappingURL=index.js.map