const Mailchimp = require('mailchimp-api-v3');
const md5 = require('md5');
const apiKey = 'e0825e4cef86c72a576d52f544859661-us17'
const mailchimp = new Mailchimp( apiKey );
const audienceId = '6870a9cc06';



// Agregar un nuevo subscriptor
const addSubscriber = ((req, res) => {
    const email = req.body.email;

    mailchimp.post(`/lists/${audienceId}/members`, {
        email_address: email,
        status: 'subscribed',
        tags: ["incomplete_purchase"]
    })
    .then( () => res.redirect('/') )
    .catch( err => res.status(400).send(err) );
});

// Eliminar subscripccion
const unsubscribe = ( email => {
    mailchimp.post(`/lists/${audienceId}/members`, {
        email_address: email,
        status: 'unsubscribed',
        tags: ["incomplete_purchase"]
    })
    .catch( err => err );
});

// Verificar si el usuario se encuetra subscripto o no
const chechSubscription = ( async(email) => {
    const hashEmail = md5( email.toLowerCase() );
    return await mailchimp.get(`/lists/${audienceId}/members/${hashEmail}`)
        .then( resp => {
            if(resp.status === 'subscribed' ) return true;
            else false
        })
        .catch( err => err )
});




module.exports = {
    addSubscriber,
    chechSubscription
}