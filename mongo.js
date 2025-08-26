const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument ')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://dupontdjeague:${password}@cluster0.t2xncq8.mongodb.net/Persons?retryWrites=true&w=majority&appName=Cluster0`
//Cela signifie que vous pouvez faire des requêtes avec des champs qui ne sont pas définis dans votre schéma Mongoose, et Mongoose ne rejettera pas ces champs.
mongoose.set('strictQuery', false)
mongoose.connect(url)
//definir les entite que l'on aura grace  shema
const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})
//model permet la creation d'un modele ou collection dans la base de donnees
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  //creation d'une nouvelle personne
  const person = new Person({
    name,
    number,
  })
  person.save().then((result) => {
    console.log(`added ${name} ${number}  to phonebook`)
    mongoose.connection.close()
  })
}
