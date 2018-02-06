const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())


morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :body :res[content-length] - :response-time ms'))


app.get('/', (req, res) => {
    res.send('<h1>Hello.</h1><div>Please use some other endpoint.</div>')
})

app.get('/info', (req, res) => {

    Person
        .count({})
        .then(count => {
            res.send(`puhelinluettelossa ${count} henkilön tiedot.<br/>${new Date()}`)
        })
    
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(person => {
            res.json(person.map(Person.format))
        })
        .catch(error => {
            console.log(error)
        })
})


app.get('/api/persons/:id', (req, res) => {

    Person
        .findOne({_id: req.params.id})
        .then(person => {
            if (!person) { // nothing found
                res.status(404).end()
            } else { // person found
                res.json(Person.format(person))
            }
        })
        .catch(error => { // invalid ObjectId
            console.log(error)
            res.status(404).end()
        }) 


    
})

app.delete('/api/persons/:id', (req, res) => {

    Person
        .deleteOne({_id: req.params.id})
        .then(result => { // successful deletion
            res.status(204).end()
        })
        .catch(error => { // not found
            res.status(404).end()
        })
    
})

app.put('/api/persons/:id', (req, res) => {
    
    Person
        .updateOne(
            { _id: req.params.id },
            req.body,
        )
        .then(result => { // successful update
            res.status(204).end()
        })
        .catch(error => { // not found
            res.status(404).end()
        })
    
})


app.post('/api/persons', (req, res) => {

    const newPerson = req.body

    if (!newPerson.name || !newPerson.phoneNumber) {
        return res
            .status(400)
            .json({ error: 'content missing' })
    } 

    const addPerson = new Person({
        name: newPerson.name,
        phoneNumber: newPerson.phoneNumber,
    })

    addPerson
        .save()
        .then(result => {
            res
                .json(Person.format(addPerson))
                .status(200);
        })
        .catch(error => {
            console.log(error)
            res
                .json({ error: 'Error occured.' })
                .status(500);
        })

})



const error = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
  }
  
app.use(error)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server started using TCP port ${PORT}`)
})
