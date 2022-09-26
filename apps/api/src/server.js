'use strict'

const { postRoute, commentRoute, userRoutes, signinRoute } = require('./api/routes')
const { express } = require('./config')
const { morgan, cors, helmet, cookieParser } = require('./config/Utils')
const app = express()


//-TODO: 
//- add cors policy
//- add refresh token route and controller 
//- compare users using refresh token


app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000', 'https://401-whiteboard.netlify.app'],
    credentials: true,
}))
app.use(morgan('tiny'))
app.use(helmet({
    contentSecurityPolicy: false,
}))
app.use(express.json())


app.use(postRoute)
app.use(commentRoute)
app.use(userRoutes)
app.use(signinRoute)

function radio(port) {
    app.listen(port, (req, res) => {
        console.log(`Diamond City Radio at ${port}`)
    })
}

app.get('/', (req, res) => {
    res.status(200).send('Hey Mom!')
})



module.exports = { radio, app }