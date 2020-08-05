export class Favorite{
    constructor(){
        this.deleteFavItemEvent();
    }

    deleteFavItemEvent(){
        console.log('inicio');
        const deleteButtonList = document.querySelectorAll('.favorite__product-delete');

        deleteButtonList.forEach( button => {
            button.addEventListener('click', async(e) => {
                const favoriteId = e.target.dataset.favoriteId;

                await deleteFavItemService( favoriteId );
                e.target.parentNode.remove();
            })
        })
    }
}


const deleteFavItemService = async( id ) => {
    const fav = await fetch('http://192.168.0.25:3000/api/delete-fav', {
        method: 'POST',
        body: JSON.stringify({ favoriteId: id }),
        headers:{ 'Content-Type': 'application/json' }
    })
    .then( resp => resp )
    .catch( err => err );

    return fav;
}
