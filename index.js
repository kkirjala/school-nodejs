const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())


let persons = [
    {
      "name": "Arto Hellas",
      "phoneNumber": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "phoneNumber": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "phoneNumber": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "phoneNumber": "040-123456",
      "id": 4
    }
  ]


app.get('/', (req, res) => {
    res.send('<h1>Hello.</h1><div>Please use some other endpoint.</div>')
})

app.get('/info', (req, res) => {   
    res.send(`puhelinluettelossa ${persons.length} henkilön tiedot.<br/>${new Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)    
})

app.get('/api/persons/:id', (req, res) => {
    const lookupId = Number(req.params.id)
    const person = persons.find(person => person.id === lookupId)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
    
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server started using TCP port ${PORT}`)
})