const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');

/*admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://ayjale-dbeb9.firebaseio.com/'
});*/

var serviceAccount = require('../../ayjale-dbeb9-firebase-adminsdk-u1tpo-9665c8e447.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ayjale-dbeb9.firebaseio.com"
});

const db = admin.database();

router.get('/', (req, res) => {
    db.ref('contactos').once('value', (snapshot) =>{
        const data = snapshot.val();
        res.render('index', { contactos: data});
    });
    
});

router.post('/new-contact', (req, res) => {
    console.log(req.body);
    const newContacto = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone

    }
    db.ref('contactos').push(newContacto);
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contactos/'+req.params.id).remove();
    res.redirect('/');
    //console.log(req.params.id);
    //res.send('eliminado');
});

module.exports = router;