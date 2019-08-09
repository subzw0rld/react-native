const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = (req, res) => {
    let phone = req.body.phone;

    if (!phone) {
        return res.status(422).send({ error: 'You must provide a phone number!' });
    }

    phone = String(phone).replace(/[^\d]/g, "");

    admin.auth().getUser(phone)
        .then(userRecord => {
            const code = Math.round((Math.random() * 8999 + 1000));
            twilio.messages.create({
                body: `Your code is ${code}`,
                to: phone,
                from: '+12139734716'
            }, (err) => {
                if (err) { return res.status(422).send(); }

                admin.database().ref('users/' + phone)
                    .update({ code: code, codeValid: true }, () => {
                        res.send({ success: true });
                    });
            });
        })
        .catch(err => res.status(422).send({ error: err }));
}