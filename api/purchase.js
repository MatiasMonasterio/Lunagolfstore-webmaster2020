const db = require('../models');
const moment = require('moment');

const createPurchase = async( userId, data ) => {
    const dateTime = moment( new Date ).format( 'YYYY-MM-DD hh:mm:ss' );
    const dataPurchaseString = JSON.stringify( data );
    console.log( 'Creando elemento' );

    const newPurchase = await db.purchase.create({
        userId: userId,
        info: dataPurchaseString,
        date: dateTime
    });

    console.log( 'Elemento creado' );

    return newPurchase;
}

module.exports = {
    createPurchase
}