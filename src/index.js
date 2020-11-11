const app = require('./app');

app.listen(app.get('port'));

console.log('se', app.get('port'));
