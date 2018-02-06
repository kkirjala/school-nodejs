const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

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
    res.send(`puhelinluettelossa ${persons.length} henkilön tiedot.<br/>${new Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)    
})

// find person either by id (primary) or by name (case-insensitive)
findPerson = (searchTerm) => {

    if (!isNaN(searchTerm)) {
        return persons
            .find(person => person.id === searchTerm)
    } else {
        return persons
            .find(person => person.name.toLowerCase() === searchTerm.toLowerCase())
    }
}

app.get('/api/persons/:id', (req, res) => {

    const person = findPerson(Number(req.params.id))

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
    
})

app.delete('/api/persons/:id', (req, res) => {

    const lookupPerson = findPerson(Number(req.params.id))

    if (lookupPerson) {
        persons = persons
            .filter(person => person.id !== lookupPerson.id)
        res.status(204).end()
    } else {
        res.status(404).end()
    }
    
})


app.post('/api/persons', (req, res) => {

    const newPerson = req.body

    if (!newPerson.name || !newPerson.phoneNumber) {
        return res
            .status(400)
            .json({ error: 'content missing' })
    } else if (findPerson(newPerson.name)) {
        return res
            .status(422)
            .json({ error: 'name must be unique' })
    }

    const addPerson = {
        name: newPerson.name,
        phoneNumber: newPerson.phoneNumber,
        id: Math.floor(Math.random() * 1000000)
    }

    persons = persons.concat(addPerson)

    res.json(addPerson)
    res.status(200);

})



const error = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
  }
  
app.use(error)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server started using TCP port ${PORT}`)
})
