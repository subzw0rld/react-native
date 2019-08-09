const admin = require('firebase-admin');

module.exports = (req, res) => {
    let phone = req.body.phone;
    let code = req.body.code;

    if (!phone || !code) {
        return res.status(422).send({ error: 'You must provide a phone number and a code!' });
    }

    phone = String(phone).replace(/[^\d]/g, "");
    code = parseInt(code);

    admin.auth().getUser(phone)
        .then(() => {
            const ref = admin.database().ref('users/' + phone);

            ref.on('value', snapshot => {
                ref.off();
                const user = snapshot.val();

                if (user.code !== code || !user.codeValid) {
                    return res.status(422).send({ error: 'Code not valid!' });
                }

                ref.update({ codeValid: false });
                admin.auth().createCustomToken(phone)
                    .then(token => res.send({ token: token }));
            });
        })
        .catch(() => res.status(422).send({ error: err }));
}