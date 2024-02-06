const express = require('express');
require('./db/config');
const User = require('./db/user')
const Product = require('./db/product');
const cors = require('cors');
const product = require('./db/product');

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';
const app = express();


app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save();
    result = result.toObject();
    delete result.password;

    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "sometging went wrong please try again letter" })
        }
        resp.send({ result, auth: token })
    });
})

app.post("/login", async (req, resp) => {

    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");

        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "sometging went wrong please try again letter" })
                }
                resp.send({ user, auth: token })
            });

        } else {
            resp.send({ result: 'user not found' });
        }
    } else {
        resp.send({ result: 'user not found' });
    }
})

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();


    resp.send(result)
});

app.get("/products", async (req, resp) => {
    let products = await product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: 'products not found' })
    }
});

app.delete("/product/:id", async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result)

});

app.get("/product/:id", async (req, resp) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result)
    } else {
        resp.send({ results: "no result found" })
    }
});

app.put("/product/:id", async (req, resp) => {
    const result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.get("/search/:key", verifyToken, async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }

        ]
    });
    resp.send(result)
});

function verifyToken(req, resp, next) {

    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        console.log("middleware called", token);
    } else {

    }

    next();
}

app.listen(5000);