const Mailchimp = require('mailchimp-api-v3');
const apiKey = 'e0825e4cef86c72a576d52f544859661-us17'
const mailchimp = new Mailchimp( apiKey );
const audienceId = '6870a9cc06'

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

const unsubscribe = ( email => {
    mailchimp.post(`/lists/${audienceId}/members`, {
        email_address: email,
        status: 'unsubscribed',
        tags: ["incomplete_purchase"]
    })
    .catch( err => err );
});

module.exports = addSubscriber;