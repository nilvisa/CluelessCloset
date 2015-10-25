// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1507548549565705', // your App ID
        'clientSecret'  : '4794dec2bd9cab8d1d4f3085a72475d8', // your App Secret
        'callbackURL'   : 'http://localhost:1995/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:1995/auth/google/callback'
    }

};