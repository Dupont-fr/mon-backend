const express = require('express')
const app = express()
app.use(express.json())
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const total = persons.length
  const date = new Date()

  response.send(`
    <p>phonebook has  info for${total} peoples</p>
    <p>${date}</p>
  `)
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  if (person) response.json(person)
  response.status(StatusCodes.NOT_FOUND).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.filter((person) => person.id !== id)
  if (person) return response.json(person)
  response.status(StatusCodes.NO_CONTENT).end()
})
const generateID = () => {
  return Math.floor(Math.random() * 100000)
}
app.post('/api/persons', (request, response) => {
  const body = request.body

  const existNumber = persons.some((person) => person.number === body.number)
  const existName = persons.some((person) => person.name === body.name)

  //verif existance du numero
  if (existNumber)
    return response
      .status(400)
      .json({ error: `${body.number} is already exist in the phonebook` })
  // verif nom
  if (existName)
    return response
      .status(400)
      .json({ error: `${body.name} is already exist in the phonebook` })

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateID(),
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
