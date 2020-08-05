const db = require('../models');

const getCartByUser = async( id ) =>{
    const cartList = await db.cart.findAll({
        where: {
            userId: id
        },
        include: db.product,
    }).then( resp => resp );

    console.log( cartList );

    // const favoriteList = await db.favorite.findAll().then( resp => resp );

    return cartList;
}

module.exports = {
    getCartByUser
}