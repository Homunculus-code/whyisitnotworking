const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('build'))  

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('yo');
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    let id = request.params.id;
    let filteredPersons = persons.filter(person => person.id == id)
    if (!filteredPersons.id){
        return response.status(400).json({ 
            error: 'content missing' 
          })
    }
    response.json(filteredPersons);
})

app.get('/info', (request, response) => {
    let n = persons.length;
    let timestamp = new Date();
    let displayString = `Phonebook has info for ${n} people <br/>`;
    response.send(displayString + timestamp);
})

app.delete('/api/persons/:id', (request, response) => {
    let id = request.params.id;
    persons = persons.filter(person => person.id != id);
    response.status(204).end();
})

app.post('/api/persons/', (request, response) => {
    const body = request.body;
    const newObject = {
        id: Math.max(...persons.map(person => person.id)) + 1,
        name: body.name,
        number: body.number
    }
    persons = persons.concat(newObject);
    response.json(newObject);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
