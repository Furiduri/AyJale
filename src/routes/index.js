const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');

/*admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://ayjale-dbeb9.firebaseio.com/'
});*/

var serviceAccount = require('../config/ayjale-dbeb9-firebase-adminsdk-u1tpo-9665c8e447.json');

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

//Rutas de AyJale!
//rutas talent
router.get('/api/talent', (req, res) => {
    db.ref('talento').once('value', (snapshot) =>{
        const data = snapshot.val();
        res.json(data);
    });
});
router.post('/api/talent/add', (req, res) => {
    console.log(req.body);
    const newContacto = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fecha_Nacimiento: req.body.fecha_Nacimiento,
        fecha_Creacion: req.body.fecha_Creacion

    }
    db.ref('talento').push(newContacto);
    res.json({ status: 'success' });
});
router.delete('/api/talent/delete/:id', (req, res) => {
    console.log(req.body);
    db.ref('talento').push(req.body);
    res.json({ status: 'success' });
});
router.delete('/api/talent/update/:id', (req, res) => {
    console.log(req.body);
    db.ref('talento').push(req.body);
    res.json({ status: 'success' });
});
//escuelas
router.get('/api/school', (req, res) => {
    db.ref('escuelas').once('value', (snapshot) =>{
        const data = snapshot.val();
        res.json(data);
    });
});
router.post('/api/school/add', (req, res) => {
    console.log(req.body);
    db.ref('escuelas').push(req.body);
    res.json({ status: 'success' });
});
router.delete('/api/school/delete/:id', (req, res) => {
    console.log(req.body);
    db.ref('escuelas').push(req.body);
    res.json({ status: 'success' });
});
router.delete('/api/school/update/:id', (req, res) => {
    console.log(req.body);
    db.ref('escuelas').push(req.body);
    res.json({ status: 'success' });
});
//empresas
router.get('/api/business', (req, res) => {
    db.ref('empresas').once('value', (snapshot) =>{
        const data = snapshot.val();
        res.json(data);
    });
});
router.post('/api/business/add', (req, res) => {
    console.log(req.body);
    db.ref('empresas').push(req.body);
    res.json({ status: 'success' });
});
router.delete('/api/business/delete/:id', (req, res) => {
    console.log(req.body);
    db.ref('empresas').push(req.body);
    res.json({ status: 'success' });
});
router.delete('/api/business/update/:id', (req, res) => {
    console.log(req.body);
    db.ref('empresas').push(req.body);
    res.json({ status: 'success' });
});
module.exports = router;