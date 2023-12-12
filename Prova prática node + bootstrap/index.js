const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.use(express.static('public'))

//GET
app.get('/users/add', (req, res) => {
    res.render('userform')
    })
    
    app.post('/users/save', (req, res) => {
    const nameprod = req.body.name;
    const nameforn = req.body.name;
    const dataComp = req.body.dataComp;
    const valorcomp = req.body.valorcomp;
    const valorvend = req.body.valorvend;
    const categ = req.body.categ;
    const user = { name: nameprod, name: nameforn, dataComp: dataComp, valorcomp: valorcomp, valorvend: valorvend, categ: categ}
    res.render('viewuser', { user: user })
    
    })

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(' Server Started')
  })