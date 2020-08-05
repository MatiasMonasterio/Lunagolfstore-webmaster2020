const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userApi = require('../api/user');
const addressApi = require('../api/address');
// const User = require('../models/user');

passport.serializeUser( (user, done) => {
    done(null, user.id )
}); // Forma de almacenar id del usuario en el navegador

passport.deserializeUser( async(id, done) => {
    const user = await userApi.getUser( id )
    //const user = await user.findById(id)  //buscar el usuario en la base de datos. Metodo de mongoose
    done(null, user);
});  // Busca si el usuario existe 

/*Estos dos metodos son para que al navegar entre diferentes pestañas no sea necesario volver a iniciar
la session ya que el id del usuario se almacena en el navegador y cuando se cambia de pestaña y es necesario
este dato para valida el segundo metodo lo busca en la base de datos. El callback done lo que hace es
devolver error null (sin errores) y el dato a utilizar. En el primero el id para almacenar y en el segundo
toda la informacion del usuario*/


passport.use('local-signup', new LocalStrategy({
    // usernameField: 'name',
    // userlastnameField: 'lastname',
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {

    // console.log( req.body );
    // console.log(`EL PROBLEMA ESTA ACA. NAME: ${name} LASTNAME: ${lastname} EMAIL: ${email} PASSWORD: ${password}`);

    const userExist = await userApi.getUserByEmail( email );
    // console.log( userExist.length  );
    // console.log( userExist );
    if( userExist.length !== 0 ) {
        return done(null, false);
    }

    const user = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: email,
        pass: userApi.encryptPassword( password )
    }
    const sendUser = await userApi.createUser( user )
    await addressApi.createBillignAddress( sendUser.id )
    await addressApi.createShippingAddress( sendUser.id )
    // const user = new User();
    // user.email = email;
    // user.password = user.encryptPassword(password) ;
    // await user.save(); // esto es de mongoose
    console.log('vamos wach');
    console.log( sendUser );
    done(null, sendUser);
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {

    // console.log( email, password );

    const user = await userApi.getUserByEmail( email );

    if( user.length === 0 ){
        console.log('usuario no existe');
        return done( null, false, req.flash('signinMessage', 'Correo no encontrado'));
    }

    console.log( user[0].pass );
    // console.log( userApi.validatePassword( password, user.pass ) );

    if( !userApi.validatePassword( password, user[0].pass ) ){
        console.log('La contraseña no coincide');
        return done(null, false, req.flash('signinMessage', 'Contraseña erronea'));
    }

    done( null, user[0] )
}))


function isAuthenticated(req, res, next) {
    if( req.isAuthenticated() ){
        return next();
    }
  
    res.redirect('/login');
  }

module.exports = {
    isAuthenticated
}