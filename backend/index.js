const connectTomongo =require('./db');
const express = require('express')



connectTomongo();
const app = express()
const port = 3000

///to parse the req body
app.use(express.json())



// app.get('/', (req, res) => {
//   res.send('Hello suphal!')
// })


////////// available routes ////////
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})