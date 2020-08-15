// Definicion de constantes por ID (Es inecesario o buena practica?)
const   navbar = document.querySelector('#navbar'),
        sidenav = document.querySelector('#sidenav'),
        searchForm = document.querySelector('#searchForm'),
        searchInput = document.querySelector('#searchInput'),
        menuShow = document.querySelector('#menuShow'),
        userMenu = document.querySelector('#userMenu');

export class Navbar{

    checkNavbarScrolled(){
        if( window.scrollY !== 0 ) navbar.classList.add('navbar-scrolled');
    }
    navbarScrolled( scrolled ){
        if( scrolled ) navbar.classList.add('navbar-scrolled')
        else navbar.classList.remove('navbar-scrolled');
        console.log('dale');
    }
    openSearchFormDesktop(){
        navbar.classList.add('show-search');
        searchInput.focus();
    }
    closeSearchFormDesktop(){
        navbar.classList.remove('show-search')
    }
    openNavMobile(){
        sidenav.classList.add('sidenav-show');
    }
    closeNavMobie(){
        sidenav.classList.remove('sidenav-show');
        setTimeout( () => { sidenav.classList.remove('user-menu-show'); }, 200)
    }
    openUserMenuMobile(){
        sidenav.classList.toggle('user-menu-show');
    }
}

// Definicion de clase para usarse
const navbarObject = new Navbar;
navbarObject.checkNavbarScrolled();

// Eventos DOM para usar metodos
searchForm.addEventListener( 'click', navbarObject.openSearchFormDesktop );
searchInput.addEventListener( 'blur', navbarObject.closeSearchFormDesktop );
menuShow.addEventListener( 'click', navbarObject.openNavMobile );
userMenu.addEventListener( 'click', navbarObject.openUserMenuMobile );
sidenav.addEventListener( 'click', (e) => {
    if( e.target.classList.contains('sidenav-show')) navbarObject.closeNavMobie();
});

window.addEventListener('scroll', () => {
    const scrollPositionY = window.scrollY;

    if( scrollPositionY >= 10 ) navbar.classList.add('navbar-scrolled')
    else navbar.classList.remove('navbar-scrolled');
})













// load cart

export const productCartItemUI = ( element ) => {
    const productItem = document.createElement('li');
    productItem.classList.add('buy__dropdown-item');
    productItem.classList.add('product-buy')
    productItem.dataset.productId = element.id;

    const image = document.createElement('img');
    image.classList.add('product-buy__image');
    image.src = element.image;
    image.alt = element.name;

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('product-buy__body');

    const title = document.createElement('h4');
    title.classList.add('product-buy__body-title');
    title.innerHTML = `${element.brand} | ${element.name}`;

    const price = document.createElement('p');
    price.classList.add('product-buy__body-price');
    price.innerHTML = `$ ${element.price}`;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('product-buy__button');

    const buttonIcon = document.createElement('i');
    buttonIcon.classList.add('fas');
    buttonIcon.classList.add('fa-trash');
    buttonIcon.classList.add('product-buy__button-icon');

    productItem.appendChild(image);
    productItem.appendChild(infoContainer);
    productItem.appendChild(deleteButton);

    infoContainer.appendChild(title);
    infoContainer.appendChild(price)

    deleteButton.appendChild(buttonIcon);

    cartList.appendChild( productItem );
}

let cart;


export const getProductServices = async( id ) => {
    const localHost = window.location.origin;

    const product = await fetch(`${localHost}/api/product`, {
        method: 'POST',
        body: JSON.stringify({productId: id}),
        headers:{ 'Content-Type': 'application/json' }
    })
    .then( resp => resp )
    .catch( err => err );

    return await product.json();
}

export const checkNoProductInCart = () => {
    console.log( cartList );
    const productCount = cartList.childElementCount;

    accountant.innerHTML = productCount;
    accountantMobile.innerHTML = productCount;

    if( productCount === 0 ) accountantMobile.classList.add('cart-count');
    else accountantMobile.classList.remove('cart-count');

    if ( productCount === 0 ) cartContainer.classList.add('no-product-cart');
    else cartContainer.classList.remove('no-product-cart');
}


if( localStorage.getItem('cart') ) {
    cart = localStorage.getItem('cart').split(',');

    cart.forEach( async id => {
        const product = await getProductServices(id)
        productCartItemUI( product );
        checkNoProductInCart();
    });

}
else checkNoProductInCart();


cartList.addEventListener('click', (e) => {
    // if( e.target.classList.contains('fa-trash') || e.target.classList.contains('product-buy__button') ){
    if( e.target.classList.contains('fa-trash') ){
        cart = localStorage.getItem('cart').split(',');
        console.log( cart );
        const item = e.target.parentNode.parentNode
        const productId = item.dataset.productId;

        const i = cart.indexOf( productId )
        console.log( i );
        cart.splice( i, 1 );


        localStorage.setItem('cart', cart);
        item.remove();

        checkNoProductInCart();
    };
});


export const updateLocalStorage = ( index ) => {
    cartList.childNodes[index + 1].remove();
    checkNoProductInCart();
}






