'use strict'

const cors = require('cors')
const postRoute = require('./api/routes/posts/post.routes')
const { express } = require('./config')
const app = express()

app.use(cors())
app.use(express.json())
app.use(postRoute)

function radio(port) {
    app.listen(port, (req, res) => {
        console.log(`Diamond City Radio at ${port}`)
    })
}

app.get('/', (req, res) => {
    res.status(200).send('Hey Mom!')
})



module.exports = { radio, app }