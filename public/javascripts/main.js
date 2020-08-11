import './models/navbar.js';
import './models/newslatter.js';
import { Contact } from './models/contact.js';
import { Products } from './models/products.js';
import { SwiperClass } from './vendor/swiper.js';
import { Product } from './models/product.js';
import { Cart } from './models/user-cartpage.js';
import { Favorite } from './models/user-favoritepage.js';

const path = window.location.pathname;
console.log( path );


switch( path ){
    case '/':
        new SwiperClass;
        break;
    case '/products/palos-sets':
    case '/products/pelotas':
    case '/products/bolsos':
    case '/products/carros':
    case '/products/ropa-accesorios':
        new Products;
        break;
    case '/contact':
        new Contact;
        break;
    case '/user/cart':
        new Cart;
        break;
    case '/user/favorite':
        new Favorite;
        break;
    default:
        break;
}

if( path.includes('/product/') ){
    new Product;
    new SwiperClass;
}


// import './vendor/swiper.js';
// import './models/products.js';
// import './models/product.js';
// import './models/contact.js';

// 

