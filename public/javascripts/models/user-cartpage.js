import { getProductServices, updateLocalStorage } from './navbar.js';

export class Cart{
    constructor(){
        this.getLocalStorage();
        this.deleteItemEvent();
        this.finishBuyingEvent();
    }

    getLocalStorage(){
        if( localStorage.getItem('cart') === null || localStorage.getItem('cart').length === 0 ) {
            cartView.classList.add('no-product');
            return;
        }

        const cart = localStorage.getItem('cart').split(',');

        cart.forEach( async (id, index) => {
            const product = await getProductServices( id );
            creatProductItemUI( product );
            
            if( index === (cart.length - 1) ) finalPriceCalculator();
        });

    }

    deleteItemEvent(){
        productList.addEventListener('click', (e) => {
            if(e.target.classList.contains('fa-trash')){
                const productId = e.target.dataset.productId;
                deleteProductLocalStorage( productId )

                e.target.parentElement.remove();
                totalPriceCalculator();

                if( productList.children.length === 1 ) cartView.classList.add('no-product');
            }
        })
    }

    finishBuyingEvent(){
        finishBuying.addEventListener('click', () => {
            const productsList = document.querySelectorAll('.product-list__row');
            const totalPriceNumber = totalPrice.innerText;
            let productsDataPurchases = []

            productsList.forEach( (element, index) => {
                if( index !== 0 ){
                    const items = element.children;

                    const purchasesDataProduct = {
                        id: items[4].dataset.productId,
                        name: items[0].lastChild.innerText,
                        unitPrice: items[1].innerText,
                        quantity: items[2].value,
                        finalPrice: items[3].innerText
                    }

                    productsDataPurchases.push( purchasesDataProduct );
                }
            });

            const purchases = {
                products: productsDataPurchases,
                total: totalPriceNumber
            }

            sendPurchasesServices( purchases );
        });
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
    unitPrice.dataset.dataPrice = product.price;
    unitPrice.innerHTML = `$ ${parseInt(product.price)}`

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
    finalPrice.classList.add('product-list__final-price');
    finalPrice.dataset.priceValue = product.price;
    finalPrice.innerHTML = `$ ${product.price * 1}`

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



const finalPriceCalculator = () => {
    const selectList = document.querySelectorAll('.product-list__select');

    selectList.forEach( element => {
        element.addEventListener('change', (e) => {
            const finalPrice = e.target.nextElementSibling;
            const unitPrice = parseInt(e.target.previousElementSibling.dataset.dataPrice);
            const finalPriceVar = unitPrice * e.target.value;
            
            finalPrice.innerHTML = `$ ${finalPriceVar}`;
            finalPrice.dataset.priceValue = finalPriceVar.toString();

            totalPriceCalculator();
        });
    });

    totalPriceCalculator();
}


const totalPriceCalculator = () => {
    const priceList = document.querySelectorAll('.product-list__final-price');
    let total = 0;

    priceList.forEach( price => {
        total = total + parseInt(price.dataset.priceValue);
        totalPrice.innerHTML = `TOTAL: $ ${total}`;
    });
}

const sendPurchasesServices = async( purchasesData ) => {
    const localHost = window.location.origin;
    return await fetch(`${localHost}/api/add-purchase`, {
        method: 'POST',
        body: JSON.stringify({ data: purchasesData }),
        headers:{ 'Content-Type': 'application/json' }
    })
    .then( resp => {
        if( resp.status === 200 && resp.redirected ) {
            localStorage.removeItem('cart');
            window.location.href = resp.url;
        }
        else console.log( resp );
    })
    .catch( err => console.log( err ) );
}