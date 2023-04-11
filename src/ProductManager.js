import fs from 'fs';
import { json } from 'stream/consumers';


export default class ProductManager {
    constructor (path) {
        this.path= path;
    }
      
    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8');
                console.log(data);
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
         
    }

    createProduct = async (producto) => {
       try {
        const products = await this.getProducts();

        if (products.length === 0) {
            producto.id = 1;
        } else {
            producto.id = products[products.length - 1].id + 1;
        }
        products.push(producto);

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

        return producto;

       } catch (error) {
           console.log(error);
       }

    }

    async getAll() {
        try {
          const products = await fs.readFile(this.ruta, 'utf-8');
          return JSON.parse(products);
        } catch (error) {
          console.log(error);
          return [];
        }
    }

    addProduct = (title, description, price, thumbnail, stock) => {
        const producto = {
            title, 
            description,
            price,
            thumbnail, 
            stock, 
            code: []
        };
        
        if (this.products.length === 0) {
            producto.id = 1;
        } else {
            producto.id = this.products[this.products.length - 1].id + 1;
        }
        
        this.products.push(producto);
    }
      

    getProductById = (idProducto) => {
        const productoIndex = this.products.findIndex(producto => producto.id === idProducto);

        if (productoIndex === -1) {
            console.log ('Not found');
            return;
        }

        const productoRegistrado = this.products[productoIndex].code.includes(idProducto);

        if (productoRegistrado) {
            console.log('Producto ya agregado');
            return;
        }

        this.products[productoIndex].code.push(idProducto);
    } 

}