const admin = require('firebase-admin');

module.exports = (req, res) => {
    let phone = req.body.phone;

    if (!phone) {
        return res.status(422).send({ error: 'Bad Input!' });
    }

    phone = String(phone).replace(/[^\d]/g, "");

    //Create a new user using their phone number as the id
    admin.auth().createUser({ uid: phone })
        .then(user => res.send(user))
        .catch(err => res.status(422).send({ error: err }));
}