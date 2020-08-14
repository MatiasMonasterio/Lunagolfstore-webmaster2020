const db = require('../models');
const { Op , Sequelize } = require('sequelize');

const getProduct = async( id ) => {
    const productResponse = await db.product.findByPk( id )
                        .then( resp => resp );
    return productResponse;                    
}

const getRandomProducts = async() => {
    const productList = await db.product.findAll({
        order: [ Sequelize.fn( 'RAND' ) ],
        limit: 5
    }).then( resp => resp );

    return productList;
}

const getProductsByCategory = async( id, orderFilter, from ) => {

    let productList;
    let colum;
    let type;

    if( !orderFilter ) {
        console.log('Sin filtro de orden');

        productList = await db.product.findAll({
            where:{ categoryId: id },
            order: [ [ 'id', 'ASC' ] ],
            offset: from,
            limit: 12
        }).then( resp => resp );
    }
    else{

        if( orderFilter.includes('DESC') ) type = 'DESC';
        if( orderFilter.includes('ASC') ) type = 'ASC';
        if( orderFilter.includes('name') ) colum = 'name';
        if( orderFilter.includes('price') ) colum = 'price';
        if( orderFilter.includes('date') ) colum = 'date';

        productList = await db.product.findAll({
            where: { categoryId: id },
            order: [ [ colum, type ] ],
            offset: from,
            limit: 12
        }).then( resp => resp );
    }


    return productList;
}

const searchProduct = async( query ) => {
    const productList = await db.product.findAll({
        where:{
            [ Op.or ]: [
                {
                    name: { [ Op.like ]: `%${query}%` }
                },
                {
                    brand: { [ Op.like ]: `%${query}%` }
                }
            ]

        }
    }).then( resp => resp );

    return productList;
}

const getFeaturedProducts = async() => {
    const productList = await db.product.findAll({
        order: [ Sequelize.fn( 'RAND' ) ],
        limit: 5
    }).then( resp => resp );

    return productList;
}

const getDiscountProducts = async() => {
    const productList = await db.product.findAll({
        where: { discount : { [Op.ne]: 0 } },
        limit: 5
    })
    .then( resp => resp )

    return productList;
}

const getRecommendedProducts = async() => {
    const productList = await db.product.findAll({
        order: [ Sequelize.fn( 'RAND' ) ],
        limit: 5
    }).then( resp => resp );

    return productList;
}

module.exports = {
    getProduct,
    getProductsByCategory,
    searchProduct,
    getRandomProducts,
    getFeaturedProducts,
    getDiscountProducts,
    getRecommendedProducts
}