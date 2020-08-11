import { productCartItemUI, getProductServices, checkNoProductInCart } from './navbar.js';

export class Product{
    constructor(){
        if( localStorage.getItem('cart') ) this.cart = localStorage.getItem('cart').split(',');
        else this.cart = [];

        this.showModalEvent();
        this.closeModalEvent();
        this.addProductToCard();
        this.checkCart();
        this.storageEvent();
        this.favoriteEvent();
        this.checkFavoriteExist();
    }

    showModalEvent(){
        showModal.addEventListener('click', () => {
            modal.classList.add('fees-modal-show');
        });
    }

    closeModalEvent(){
        modal.addEventListener('click', (e) => {
            if( e.target.classList.contains('fees-modal__header-close') || e.target.classList.contains('fees-modal') ) {
                modal.classList.remove('fees-modal-show');
            }
        })
    }

    addProductToCard(){
        console.log( this.cart );
        addCardButton.addEventListener('click', async() => {
            const productId = addCardButton.dataset.productId
            this.cart.push( productId );

            addCardButton.disabled = true;
            addCardButton.innerHTML = 'Cargado <i class="fas fa-check"></i>';

            localStorage.setItem( 'cart' , this.cart );

            const productData = await getProductServices( productId );
            productCartItemUI( productData )
            checkNoProductInCart();
        });
    }

    checkCart(){
        const productId = addCardButton.dataset.productId;

        if( this.cart.indexOf(productId) !== -1 ){
            addCardButton.disabled = true;
            addCardButton.innerHTML = 'Cargado <i class="fas fa-check"></i>';
        }
        else{
            addCardButton.disabled = false;
            addCardButton.innerHTML = 'Agregar a Carrito';
        }
    }

    async storageEvent(){
        window.addEventListener('storage', () => {
            console.log('cargo');
            this.checkCart();
        });
    }


    favoriteEvent(){
        addFavorite.addEventListener('click', async() => {
            console.log('click');
            const productId =  addFavorite.dataset.productId;
            await addFaviriteService( productId );
            addFavorite.classList.add('fav-exist');
        })
    }

    checkFavoriteExist(){

        window.addEventListener('load', async() => {
            const productId = addCardButton.dataset.productId;
            const favorite = await getFavoriteExistService( productId );
    
            if( favorite === null || favorite.length === 0 ){
                console.log('no existe');
            }
            else {
                addFavorite.disabled = true;
                addFavorite.classList.add('fav-exist');
                console.log('existe');
            }
    
            console.log('corrio');
            console.log( favorite );
        })

    }

}

const addFaviriteService = async( id ) => {
    const addFavorite = await fetch('http://192.168.0.25:3000/api/add_favorite', {
        method: 'POST',
        body: JSON.stringify({ productId: id }),
        headers:{ 'Content-Type': 'application/json' }
    })
    .then( async resp => {
        if( resp.redirected ) window.location.href = resp.url;
        else return resp
    })
    .catch( err => err ); 

    return addFavorite;
}

const getFavoriteExistService = async( id ) => {
    const favoriteExist = await fetch('http://192.168.0.25:3000/api/check-fav', {
        method: 'POST',
        body: JSON.stringify({ productId: id }),
        headers:{ 'Content-Type': 'application/json' }
    })
    .then( async resp => {
        if( resp.redirected ) return null
        else return await resp.json();
    })
    .catch( err => err )

    return favoriteExist;
}