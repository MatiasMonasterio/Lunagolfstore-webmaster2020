const db = require('../models');
const moment = require('moment');

const createPurchase = async( userId, data ) => {
    const dateTime = moment( new Date ).format( 'YYYY-MM-DD hh:mm:ss' );
    const dataPurchaseString = JSON.stringify( data );

    const newPurchase = await db.purchase.create({
        userId: userId,
        info: dataPurchaseString,
        date: dateTime
    });

    return newPurchase;
}

const getPurchasesByUserId = async( userId ) => {
    const purchaseList = await db.purchase.findAll({
        where: { userId: userId },
        order: [ [ 'date', 'DESC' ] ],
        raw: true
    })
    .then( resp => resp );

    return purchaseList;
}

module.exports = {
    createPurchase,
    getPurchasesByUserId
}