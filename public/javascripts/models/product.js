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

            if( this.cart.indexOf( productId ) !== -1 ) return;

            this.cart.push( productId );

            addCardButton.innerHTML = 'Producto Cargado!';
            localStorage.setItem( 'cart' , this.cart );

            const productData = await getProductServices( productId );
            productCartItemUI( productData )
            checkNoProductInCart();
        });
    }

    checkCart(){
        const productId = addCardButton.dataset.productId;
        if( this.cart.indexOf(productId) !== -1 ) addCardButton.innerHTML = 'Producto Cargado!';
    }

    async storageEvent(){
        window.addEventListener('storage', () => {
            console.log('cargo');
            this.checkCart();
        });
    }


    favoriteEvent(){
        addFavorite.addEventListener('click', async() => {
            const productId =  addFavorite.dataset.productId;
            await addFaviriteService( productId )
                .then(( res ) => {
                    if( !res.redirected ) addFavorite.classList.toggle('fav-exist')
                });
        })
    }

    checkFavoriteExist(){

        window.addEventListener('load', async() => {
            const productId = addCardButton.dataset.productId;
            const favorite = await getFavoriteExistService( productId );
    
            if( favorite === null || favorite.length === 0 ) console.log('no existe');
            else addFavorite.classList.add('fav-exist')
        })

    }

}

const addFaviriteService = async( id ) => {
    const localHost = window.location.origin;

    const addFavorite = await fetch(`${localHost}/api/add_favorite`, {
        method: 'POST',
        body: JSON.stringify({ productId: id }),
        headers:{ 'Content-Type': 'application/json' }
    })
    .then( resp => {
        if( resp.redirected ) window.location.href = resp.url;
        else return resp
    })
    .catch( err => err ); 

    return addFavorite;
}

const getFavoriteExistService = async( id ) => {
    const localHost = window.location.origin;

    const favoriteExist = await fetch(`${localHost}/api/check-fav`, {
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