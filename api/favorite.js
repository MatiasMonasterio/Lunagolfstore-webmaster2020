const db = require('../models');
const { Op } = require('sequelize');

const getFavoriteListByUser = async( id ) =>{
    const favoriteList = await db.favorite.findAll({
        where: {
            userId: id
        },
        include: db.product,
    }).then( resp => resp );

    return favoriteList;
}

const addFavorite = async( productId, userId ) => {
    const newFavorite = await db.favorite.create({
        userId: userId,
        productId: productId
    });

    return newFavorite;
}

const getOneFavorite = async( productId, userId ) => {
    const favExist = await db.favorite.findAll({
        where: {
            [Op.and]: [
                {productId: productId},
                { userId: userId }
            ]
        }
    })
    .then( resp => resp );

    return favExist;
}

const deleteFavoriteById = async( favoriteId ) => {
    const favorite = await db.favorite.destroy({
        where: { id: favoriteId }
    })
    .then( resp => resp );

    return favorite;
}

module.exports = {
    getFavoriteListByUser,
    addFavorite,
    getOneFavorite,
    deleteFavoriteById
}