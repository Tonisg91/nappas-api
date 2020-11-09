const app = require('./app')
require('./configs/db.config')

app.listen(app.get('port'), () => {
    console.log('Listen on port' , app.get('port'))
})