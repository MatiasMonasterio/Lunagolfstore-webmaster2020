let numberFlag = 0;

export class Products{

    filtersGroups = document.querySelectorAll('.filter__section');

    constructor(){
        console.log('inicio');
        this.showCategoriesEvent();
        this.showFilterEvent();
        this.closeFilterEvent();
        this.showFilterGroupsResponsive();
        this.showSelectResponsive();
        this.closeSelectResponsive();
        this.selectFormOption();
        this.testFunction();
        this.filterButtonEvent();
        this.testFunctionForProducts();
        this.loadMoreProductsEvent();
    }

    showCategoriesEvent(){
        showCategories.addEventListener('click', () => {
            navMobile.classList.toggle('show-categories');
        });
    };

    showFilterEvent(){
        showFilter.addEventListener('click', () => {
            filter.classList.add('filter-show')
        })
    }

    closeFilterEvent(){
        closeFilter.addEventListener('click', () => {
            filter.classList.remove('filter-show')
        })
    }

    showFilterGroupsResponsive(){
        this.filtersGroups.forEach( element => {
            element.addEventListener('click', (e) => {
                if( e.target.classList.contains('filter__section-title-icon') ) e.target.parentElement.click();
        
                if( e.target.classList.contains('filter__section-title') ){
                    const listElement = e.target.parentElement;
                    listElement.classList.toggle('show-list');
                }
            })
        });
    }

    showSelectResponsive(){
        showSelect.addEventListener('click', () => {
            selectMobile.classList.add('select-mobile-show');
        });
    }

    closeSelectResponsive(){
        closeSelect.addEventListener('click', () => {
            selectMobile.classList.remove('select-mobile-show');
        })
    }

    selectFormOption(){
        const optionsList = document.querySelectorAll('.products-main__list-option');

        optionsList.forEach( element => {
            element.addEventListener('click', () => {
                console.log('entro');
                orderForm.submit();
            })
        });

        const path = window.location.search;
        console.log( window.location );
        switch( path ){
            case '?order=priceDESC':
                selectList.selectedIndex = 1;
                break;
            case '?order=priceASC':
                selectList.selectedIndex = 2;
                break;
            case '?order=nameDESC':
                selectList.selectedIndex = 4;
                break;
            case '?order=nameASC':
                selectList.selectedIndex = 3;
                break;
            case '?order=dateDESC':
                selectList.selectedIndex = 5;
                break;
            case '?order=dateASC':
                selectList.selectedIndex = 6;
                break;
            default:
                selectList.selectedIndex = 0;
                break
        }

        const selectOption = selectList.selectedIndex;

        selectList.addEventListener('click', () => {
            if( selectList.selectedIndex !== selectOption ){

                if( selectList.selectedIndex === 0 ) orderForm.reset();
                else orderForm.submit();
            }
        })
    }


    testFunction(){
        const filterList = document.querySelectorAll('.filter__section-list');

        filterList.forEach( element => {
            if( element.childElementCount > 7 ) element.nextElementSibling.classList.add('show-button-filter')
        })
    }

    filterButtonEvent(){
        const filterButtonList = document.querySelectorAll('.filter__button');

        filterButtonList.forEach( filterButton => {
            filterButton.addEventListener('click', () => {

                if( filterButton.innerHTML !== 'Ver menos' ) filterButton.innerHTML = 'Ver menos';
                else filterButton.innerHTML = 'Ver más'
                
                filterButton.previousElementSibling.classList.toggle('show-all-filteritems');
            })
        });
    }


    async testFunctionForProducts(){
        const categoryId = checkCategoryId();
        const filter = window.location.search;

        const response = await productServices( categoryId, filter );
        console.log( response );

        response.forEach( element => {
            crearCardUI( element );
        });
    }


    loadMoreProductsEvent(){
        const categoryId = checkCategoryId();
        const filter = window.location.search;

        moreProducts.addEventListener('click', async() => {
            numberFlag = numberFlag + 12;
            const newProductsList = await productServices( categoryId, filter, numberFlag );
            console.log( newProductsList );
            newProductsList.forEach( element =>  crearCardUI( element ) )
        });
    }

}




const productServices = async( categoryId, filter, from ) => {
    // console.log( categoryId, filter, from );
    const localHost = window.location.origin;

    const productList = await fetch(`${localHost}/products/get-data-by-category`, {
        method: 'POST',
        body: JSON.stringify({ 
            categoryId: categoryId,
            filter: filter,
            from: from 
        }),
        headers:{ 'Content-Type': 'application/json' }
    })
    .then( async(resp) => await resp.json() )
    .catch( err => err ); 

    return productList;
}

const checkCategoryId = () => {
    const categoryPath = window.location.pathname;

    switch( categoryPath ){
        case '/products/palos-sets':
            return 1;
        case '/products/pelotas':
            return 2;
        case '/products/bolsos':
            return 3;
        case '/products/carros':
            return 4;
        case '/products/ropa-accesorios':
            return 5;
        default:
            return false;
    }
}

const crearCardUI = ( element ) => {

    const container = document.createElement('a');
    container.href = `/product/${element.id}`;
    container.classList.add('card');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('card__image-container');

    const image = document.createElement('img');
    image.src = element.image;
    image.name = element.name;
    image.classList.add('card__image');

    const bodyCardContainer = document.createElement('div');
    bodyCardContainer.classList.add('card__body');

    const title = document.createElement('h3');
    title.classList.add('card__body-title');
    title.innerHTML = `${element.brand} | ${element.name}`;

    const price = document.createElement('p');
    price.classList.add('card__body-price');
    price.innerHTML = `$ ${element.price}`;

    container.appendChild( imageContainer );
    container.appendChild( bodyCardContainer );

    imageContainer.appendChild( image );

    bodyCardContainer.appendChild( title );
    bodyCardContainer.appendChild( price );

    productCardContainer.appendChild( container )
}





// DEFINICION DE VARIABLES
// const filtersGroups = document.querySelectorAll('.filter__section');


/***************************** DOM EVENST **********************/

// Mostrar menu de navegacion para categorias
// showCategories.addEventListener('click', () => {
//     navMobile.classList.toggle('show-categories');
// });

// showFilter.addEventListener('click', () => {
//     filter.classList.add('filter-show')
// })

// closeFilter.addEventListener('click', () => {
//     filter.classList.remove('filter-show')
// })

// Mostrar items de filtors
// filtersGroups.forEach( element => {
//     element.addEventListener('click', (e) => {
//         if( e.target.classList.contains('filter__section-title-icon') ) e.target.parentElement.click();

//         if( e.target.classList.contains('filter__section-title') ){
//             const listElement = e.target.parentElement;
//             listElement.classList.toggle('show-list');
//         }
//     })
// });


// showSelect.addEventListener('click', () => {
//     selectMobile.classList.add('select-mobile-show');
// });

// closeSelect.addEventListener('click', () => {
//     selectMobile.classList.remove('select-mobile-show');
// })