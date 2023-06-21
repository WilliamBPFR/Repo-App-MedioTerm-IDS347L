const express = require('express')
const bodyParser = require('body-parser')
const config = require('./../config')
//const vars = require('./../vars')
const dotenv = require('dotenv')
dotenv.config();
// const cron = require('node-cron')
const nodemailer = require('nodemailer')
const path = require('path')
const Reminder = require('./../db/database')
const app = express()
app.set('views', path.join(__dirname, 'vistas'))
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, './../vistas')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  console.log(req.method + ' : ' + req.url)
  next()
})

app.get('/', (req, res, next) => {
  res.redirect('index.html')
})

const port = config.PORT
console.log(port)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// Lógica para cerrar el servidor
function shutdown() {
  console.log('Cerrando el servidor HTTP...');
  server.close(() => {
    console.log('El servidor HTTP se ha cerrado correctamente.');
    process.exit(0); // Finalizar la ejecución del proceso
  });
}
process.on('SIGINT', shutdown);

app.get('/eliminar-recordatorio/:_id', async (req, res, next) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params._id)
    console.log(reminder)
    res.redirect('historial.html')
  } catch (err) {
    console.log(err)
    next(err)
  }
}
)

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

// Función para enviar el correo electrónico
async function sendEmail (asunto, mensaje, destinatario) {
  const mailOptions = {
    from: process.env.USER,
    to: destinatario,
    subject: asunto,
    text: mensaje
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error)
    } else {
      console.log('Correo electrónico enviado:', info.response)
    }
  })
}

app.post('/posted-new-reminder', async (req, res, next) => {
  // console.log(req.body);
  const reminder = new Reminder({})
  reminder.title = req.body.titulo
  reminder.email = req.body.email
  reminder.message = req.body.descripcion
  reminder.fecha = req.body.fecha
  if (req.body.id === undefined) {
    try {
      const product = await reminder.save()
      console.log(product)
      sendEmail(reminder.title, reminder.message, reminder.email)
    } catch (err) {
      console.log(err)
      next(err)
    }
  } else {
    reminder._id = req.body.id
    updateReminder(reminder)
  }
  res.redirect('historial.html')
})

async function updateReminder (reminder) {
  try {
    const product = await Reminder.findByIdAndUpdate(reminder._id, reminder)
    console.log(product)
  } catch (err) {
    console.log(err)
    // next(err)
  }
}
// Enviar los datos al cliente
app.get('/historial-data', async (req, res, next) => {
  try {
    const reminders = await Reminder.find({})
    res.json(reminders)
  } catch (err) {
    console.log(err)
    // next(err)
  }
})

app.get('/cargar-recordatorio/:_id', async (req, res, next) => {
  try {
    const reminders = await Reminder.findById(req.params._id)
    console.log("llegue")
    const encodedData = encodeURIComponent(JSON.stringify(reminders))
    const url = '/cargar-recordatorio/' + req.params._id;
    const redirectUrl = req.originalUrl.replace(url, '') 
    res.redirect('/'+redirectUrl + 'formulario.html?data=' + encodedData)
  } catch (err) {
    console.log(err)
    // next(err)
  }
})


/* app.route("/historial.html").get(async (req, res, next) => {
    try {
        const reminders = await Reminder.find({});
        console.log(reminders);
        res.render("historial", { reminders });
        const parentElement = document.getElementById('lista');

        const Data = document.map(value => value);
        Data.forEach(element => {
            const titulo = document.createElement("li");
            titulo.textContent = element.title;
            parentElement.appendChild(titulo);
        });
      } catch(err) {
        console.log(err);
        next(err);
      }
}); */

// TEXTO DE VISUALIZACION
/* app
  .route("/notes-add")
  .get((req, res, next) => {
    res.render("notes-add");
  })
  .post(async (req, res, next) => {
    console.log(req.body);
    const Note = new Notes({});

    Note.title = req.body.title;
    Note.description = req.body.description;
    //save notes first
    try {
      const product = await Note.save();
      console.log(product);
      res.redirect("/index");
    } catch(err) {
      console.log(err);
      next(err);
    }
  });

 // Esquema
  const ReminderSchema = mongooseClient.Schema({
    title: String,
    email: String,
    message: String,
    fecha: Date,
  }); */

  module.exports = app;