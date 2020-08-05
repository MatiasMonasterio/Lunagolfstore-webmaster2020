export class Contact {

    constructor(){
        console.log('inicio');
        this.showMap1();
        this.showMap2();
    }

    map1Url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.043002704564!2d-58.81106968459122!3d-34.62835356630932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9418498fb525%3A0x1fea5c3f445e79e7!2sDriving%20Moreno!5e0!3m2!1ses!2sar!4v1594762202891!5m2!1ses!2sar';
    map2URl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.7351988139835!2d-58.84134178459242!3d-34.585566264045376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9437abeabf2b%3A0xd3205ac9847354cf!2sClub%20de%20Campo%20San%20Diego!5e0!3m2!1ses!2sar!4v1595565960917!5m2!1ses!2sar';

    showMap1(){
        map1.addEventListener('click', (e) => {
            map1.classList.add('contact-map__button-active');
            map2.classList.remove('contact-map__button-active');
            if( iframeMap.src !== this.map1Url ) iframeMap.src = this.map1Url
        });
    }

    showMap2(){
        map2.addEventListener('click', (e) => {
            map2.classList.add('contact-map__button-active');
            map1.classList.remove('contact-map__button-active');
            if( iframeMap.src !== this.map2URl ) iframeMap.src = this.map2URl
        });
    }
}



// const map1Url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.043002704564!2d-58.81106968459122!3d-34.62835356630932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9418498fb525%3A0x1fea5c3f445e79e7!2sDriving%20Moreno!5e0!3m2!1ses!2sar!4v1594762202891!5m2!1ses!2sar';
// const map2URl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.7351988139835!2d-58.84134178459242!3d-34.585566264045376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9437abeabf2b%3A0xd3205ac9847354cf!2sClub%20de%20Campo%20San%20Diego!5e0!3m2!1ses!2sar!4v1595565960917!5m2!1ses!2sar';

// map1.addEventListener('click', (e) => {
//     map1.classList.add('contact-map__button-active');
//     map2.classList.remove('contact-map__button-active');
//     if( iframeMap.src !== map1Url ) iframeMap.src = map1Url
// });

// map2.addEventListener('click', (e) => {
//     map2.classList.add('contact-map__button-active');
//     map1.classList.remove('contact-map__button-active');
//     if( iframeMap.src !== map2URl ) iframeMap.src = map2URl
// })