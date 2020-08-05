import { getProductServices, updateLocalStorage } from './navbar.js';

export class Cart{
    constructor(){
        this.getLocalStorage();
        this.deleteItemEvent();
    }

    getLocalStorage(){

        const cart = localStorage.getItem('cart').split(',');
        cart.forEach( async id => {
            const product = await getProductServices( id );
            creatProductItemUI( product );
        })
    }

    deleteItemEvent(){
        productList.addEventListener('click', (e) => {
            if(e.target.classList.contains('fa-trash')){
                const productId = e.target.dataset.productId;
                deleteProductLocalStorage( productId )

                e.target.parentElement.remove();
            }
        })
    }
}


const creatProductItemUI = ( product ) => {
    const row = document.createElement('div');
    row.classList.add('product-list__row');

    const productInfoContainer = document.createElement('div');
    productInfoContainer.classList.add('product-list__product');
    productInfoContainer.classList.add('product-list__row-item');

    const image = document.createElement('img');
    image.classList.add('product-list__image');
    image.src = product.image;
    image.alt = product.name;

    const name = document.createElement('a');
    name.classList.add('product-list__name');
    name.href = `/product/${product.id}`;
    name.innerHTML = `${product.brand} | ${product.name}`;

    const unitPrice = document.createElement('p');
    unitPrice.classList.add('product-list__row-item');
    unitPrice.classList.add('product-list__price');
    unitPrice.innerHTML = `$ ${product.price}`

    const quantity = document.createElement('select');
    quantity.classList.add('product-list__row-item');
    quantity.classList.add('product-list__select');

    for(let i = 0; i < product.stock; i++){
        const option = document.createElement('option');
        option.value = i + 1;
        option.innerHTML = i + 1;

        quantity.appendChild( option );
    }

    const finalPrice = document.createElement('p');
    finalPrice.classList.add('product-list__row-item');
    finalPrice.classList.add('product-list__price');

    const trasher = document.createElement('i');
    trasher.classList.add('fas');
    trasher.classList.add('fa-trash');
    trasher.classList.add('product-list__row-item');
    trasher.classList.add('product-list__icon');
    trasher.dataset.productId = product.id;


    row.appendChild(productInfoContainer);
    row.appendChild(unitPrice);
    row.appendChild(quantity);
    row.appendChild(finalPrice);
    row.appendChild(trasher);

    productInfoContainer.appendChild(image);
    productInfoContainer.appendChild(name)



    productList.appendChild(row);
}


const deleteProductLocalStorage = ( id ) => {
    const cart = localStorage.getItem('cart').split(',');
    const position = cart.indexOf( id );

    cart.splice( position, 1 );
    localStorage.setItem('cart', cart);

    updateLocalStorage( position );
}