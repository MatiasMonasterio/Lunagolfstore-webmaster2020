// DOM EVENTS
newslatterForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const emailAddress = newslatterInput.value;
    const mailSubscribe = await mailchimpPost( emailAddress );

    if( mailSubscribe ) {
        console.log('Funciono');
        newslatterForm.reset();
        newslatterForm.classList.remove('form-alert');
    }
    else{
        console.log('bardiando');
        newslatterForm.classList.add('form-alert');
    }
});


// MAILCHIMP SERVICE API
const mailchimpPost = async( email ) => {
    const localHost = window.location.origin;

    return await fetch(`${localHost}/subscribe`, {
        method: 'POST',
        body: JSON.stringify({email: email}),
        headers:{ 'Content-Type': 'application/json' }
    })
    .then( resp => {
        if( resp.ok === true && resp.status === 200 ) return true;
        else return false;
    })
    .catch( err => {
        console.log( `Hubo un error: ${err}` );
        return false;
    });

}