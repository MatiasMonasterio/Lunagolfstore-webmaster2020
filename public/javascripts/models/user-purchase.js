export class Purchase {
    constructor(){
        this.showListEvent()
    }

    showListEvent(){
        const showButtonsList = document.querySelectorAll('.purchase__button');

        showButtonsList.forEach( element => {
            element.addEventListener('click', (e) => {
                let item;

                if(e.target.classList.contains('fas')) item = e.target.parentElement.parentElement;
                else item = e.target.parentElement

                item.classList.toggle('show-list');
            });
        });
    }
}