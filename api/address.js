const db = require('../models');

const createBillignAddress = async( id ) => {
    const newBillingAddress = await db.billingAddress.create({
        street: null,
        number: null,
        city: null,
        location: null,
        postal_code: null,
        userId: id
    });

    return newBillingAddress;
};

const getBillingAddressByUser = async( id ) => {
    const addressList = await db.billingAddress.findOne({
        where: {
            userId: id
        }
    }).then( resp => resp );

    return addressList;
};

const updateBillingAddress = async( id, DataAddress ) => {
    const newDataAddress = await db.billingAddress.update({
        street: DataAddress.street,
        number: DataAddress.number,
        city: DataAddress.city,
        location: DataAddress.location,
        postal_code: DataAddress.postal_code,
    },
    {
        where: { userId: id}
    });

    return newDataAddress;
}

const createShippingAddress = async( id ) => {
    const newBillingAddress = await db.shippingAddress.create({
        street: null,
        number: null,
        city: null,
        location: null,
        postal_code: null,
        userId: id
    });

    return newBillingAddress;
};

const getShippingAddressByUser = async( id ) => {
    const addressList = await db.shippingAddress.findOne({
        where: {
            userId: id
        }
    }).then( resp => resp );

    return addressList;
};

const updateShippingAddress = async( id, DataAddress ) => {
    const newDataAddress = await db.shippingAddress.update({
        street: DataAddress.street,
        number: DataAddress.number,
        city: DataAddress.city,
        location: DataAddress.location,
        postal_code: DataAddress.postal_code,
    },
    {
        where: { userId: id}
    });

    return newDataAddress;
};

module.exports = {
    createBillignAddress,
    getBillingAddressByUser,
    updateBillingAddress,
    createShippingAddress,
    getShippingAddressByUser,
    updateShippingAddress,

}