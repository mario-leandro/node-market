const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    try{
        // Conexão com a API
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;
        res.render('products', { products });
    }

    catch (error) {
        console.log(error);
    }
});

let cart = [];

app.post('/carrinho', async (req, res) => {
    const produto = await parseInt(req.body.Comprado);
    const response = await axios.get(`https://fakestoreapi.com/products/${produto}`);
    const productCart = response.data;
    cart.push(productCart);
    res.redirect('/carrinho');
})

app.get('/carrinho', async (req, res) => {
    res.render('carrinho', { cart });
});

app.post('/remover', (req, res) => {
    const itemRemovido = parseInt(req.body.removido);
    const removidoIndex = cart.findIndex(item => item.id === itemRemovido);
    if (removidoIndex !== -1) {
        cart.splice(removidoIndex, 1);
    }

    res.redirect('/carrinho');
});

app.get('/eletronicos', async (req, res) => {
    try{
        const response = await axios.get('https://fakestoreapi.com/products/category/electronics');
        const products_elet = response.data;
        res.render('products_elet', { products_elet });
    }
    catch (error) {
        console.log(error);
    }
})

app.get('/joia', async (req, res) => {
    try{
        const response = await axios.get('https://fakestoreapi.com/products/category/jewelery');
        const products_joia = response.data;
        res.render('products_joia', { products_joia });
    }
    catch (error) {
        console.log(error);
    }
})

app.get('/vestuario', async (req, res) => {
    try{
        const responseMen = await axios.get("https://fakestoreapi.com/products/category/men's%20clothing");
        const responseWomen = await axios.get("https://fakestoreapi.com/products/category/women's%20clothing")
        const products_men = responseMen.data;
        const products_women = responseWomen.data;
        const vestuario = [...products_men, ...products_women]
        res.render('products_vest', { vestuario });
    }
    catch (error) {
        console.log(error)
    }
})

app.get("/vestuario/men", async (req, res) => {
    try{
        const response = await axios.get("https://fakestoreapi.com/products/category/men's%20clothing");
        const products_men = response.data;
        res.render('products_men', { products_men });
    }
    catch (error) {
        console.log(error)
    }
});

app.get("/vestuario/women", async (req, res) => {
    try{
        const response = await axios.get("https://fakestoreapi.com/products/category/women's%20clothing");
        const products_women = response.data;
        res.render('products_women', { products_women })
    }
    catch (error) {
        console.log(error)
    }
})

// Login e cadastro
app.get("/cadastro", async (req, res) => {
    
})


app.listen(3000, () => {
    console.log("Server ON");
})