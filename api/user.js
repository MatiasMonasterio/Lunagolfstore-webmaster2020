const db = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

const getAllUsers = async () => {
    const allUsers = await db.user.findAll()
        .then( resp => resp )

    return allUsers;
}

const getUser = async ( id ) => {
    const user = await db.user.findByPk( id )
        .then( resp => resp );

    return user
}

const getUserByEmail = async( query ) => {
    const results = await db.user.findAll({
        where:{
            email: { 
                [ Op.like ]: `${query}`,
            }
        },
        raw: true,
    })
        .then( resp => resp );

    // // const usuario = results.json().thne( resp => resp );
    // console.log('EL RESULTADO QUE QUIERO');
    // console.log( results );
    return results;
}

const createUser = async( user ) => {
    console.log('ingresa');
    console.log( user );

    const newUser = await db.user.create({
        name: user.name,
        lastname: user.lastname,
        // gender: user.gender,
        email: user.email,
        pass: user.pass
    });

    const getNewUser = await db.user.findByPk( newUser.id )
        .then( resp => resp );

    return getNewUser;
};

const encryptPassword = ( password ) => {
    return bcrypt.hashSync( password , bcrypt.genSaltSync(10));
};

const validatePassword = ( password, passwordDatabase ) => {
    // console.log(`Primer valor ${password}, segundo valor ${passwordDatabase}`);
    // console.log( passwordDatabase.length );
    // const prueba = encryptPassword(password);
    // console.log( prueba );
    // console.log(`Primer valor ${password}, Segundo valor ${passwordDatabase}`);
    // console.log( passwordDatabase );

    const respuests = bcrypt.compareSync( password, passwordDatabase ) // Esto deberia ser con una clase y como segundo parametro lo comparto con la clase
    console.log(respuests);

    return respuests;

}

const updateUserById = async( id, newUserData) => {
    const newDataUser = await db.user.update({
        name: newUserData.name,
        lastname: newUserData.lastname,
        gender: newUserData.gender,
        date: newUserData.date,
        telehpone: newUserData.telephone
    },
    {
        where: { id: id },
    });

    return newDataUser;
}

module.exports = {
    getAllUsers, 
    getUser,
    getUserByEmail,
    createUser,
    encryptPassword,
    validatePassword,
    updateUserById
}