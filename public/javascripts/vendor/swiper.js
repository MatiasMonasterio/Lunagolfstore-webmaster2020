const swiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 600,
    spaceBetween: 100,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  });


const productSwiper = new Swiper('.product-swiper', {
  init: false,
  spaceBetween: 30,
  speed: 200,
  cubeEffect: {
    slideShadows: true,
    shadow: true,
    shadowOffset: 20,
    shadowScale: 0.94
  },
});

export class SwiperClass{
  constructor(){
    this.checkViewportWidth();
    this.windowsResizeEvent();
  }

  windowsResizeEvent(){
    window.addEventListener('resize', this.checkViewportWidth )
  }

  checkViewportWidth(){
    let viewportWidth = window.innerWidth;
  
    if( viewportWidth <= 767 ) {
      
      if( productSwiper.length === undefined) productSwiper.init();
      else{
        productSwiper.forEach( element => {
          element.init();
        })
      }
    }
  }


}

// window.addEventListener('resize', checkViewportWidth )

// function checkViewportWidth(){
//   let viewportWidth = window.innerWidth;

//   if( viewportWidth <= 767 ) {
    
//     if( productSwiper.length === undefined) productSwiper.init();
//     else{
//       productSwiper.forEach( element => {
//         element.init();
//       })
//     }
//   }
// }

// checkViewportWidth();

