
import ProductManager from "./managers/ProductManager.js";
import express from 'express';

const app = express();

const manager = new ProductManager ('./files/Productos.json');

app.use(express.urlencoded({extended: true}));

app.get('/products', async (req, res) => {
    const { title, price, stock } = req.query;
    res.send({title, price, stock});
})

app.get('/producto/:id', (req, res) => {
    const productId = Number(req.params.id); 
    const Producto = Producto.find( u => u.id === productId);
    res.send(Producto);
});


const env = async () => {
    const productos = await manager.getProducts();
    console.log(productos);

    const producto = {
            title: 'banana', 
            description: 'fruta',
            price:100,
            thumbnail: 'imagen', 
            stock: 8,
            code: 10001
    }

    const result = await manager.createProduct(producto);

    const productResult = await manager.getProducts();
    
    console.log(productResult);
}

env();