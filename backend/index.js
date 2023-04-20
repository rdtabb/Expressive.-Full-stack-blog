// ------------------------------------
// imported packages
// ------------------------------------

const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const crypt = require('bcrypt')
const saltrounds = 10
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

// ------------------------------------
// app config and middleware
// ------------------------------------

const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 240 * 1000
    }
}))

// ------------------------------------
// MySQL config
// ------------------------------------

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Qwertyader54321",
    database: "ExpressiveDB"
})

// ------------------------------------
// Endpoints
// ------------------------------------

// ...
// getposts GET
app.get('/userposts', (req, res) => {
    const id = req.session.user[0].user_id

    db.query(
        'SELECT * FROM posts WHERE user_id = 1;',
        id,
        (err, result) => {
            if (err) {
                res.send({
                    error: err,
                    id: id
                })
            } else {
                res.send(result)
            }
        }
    )
})

// ...
// logout DELETE
app.delete('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.send({
                    message: "Unable to logout"
                })
            } else {
                res.send({
                    message: "Successful logout"
                })
            }
        })
    }
})

// ...
// getusers GET
app.get('/getusers', (req, res) => {
    db.query(
        'SELECT * FROM users',
        (err, result) => {
            if (err) {
                console.error(err)
            } else {
                res.send(result)
            }
        }
    )
})

// ...
// register POST
app.post('/register', (req, res) => {
    const nameReg = req.body.nameReg
    const passwordReg = req.body.passwordReg

    crypt.hash(passwordReg, saltrounds,
            (err, hash) => {
                if (err) {
                    console.error(err)
                }
                db.query(
                    'INSERT INTO users (username, password) VALUES (?, ?)',
                    [nameReg, hash],
                    (err, result) => {
                        if (err) {
                            console.error(err)
                        } else {
                            res.send(result)
                        }
                    }
                )
            }
    )
})

// ...
// login POST
app.post('/login', (req, res) => {
    const name = req.body.usernameLog
    const password = req.body.passwordLog

    db.query(
        'SELECT * FROM users WHERE username = ?;',
        name,
        (err, result) => {
            if (err) {
                res.send({err})
            }

            if (result.length > 0) {
                crypt.compare(password, result[0].password,
                    (err, resp) => {
                        if (resp) {
                            req.session.user = result
                            res.send(result)
                        } else {
                            res.send({
                                message: "Wrond password/username"
                            })
                        }
                    }
                )
            } else {
                res.send({
                    message: "User does not exist"
                })
            }
        }
    )
})

// ...
// userdata GET
app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({
            auth: true,
            user: req.session.user
        })
    } else {
        res.send({
            auth: false
        })
    }
})

// ...
// addpost POST
app.post('/addpost', (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const id = req.session.user[0].id

    db.query(
        'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
        [id, title, content],
        (err, result) => {
            if (err) {
                console.error(err)
            } else {
                res.send(result)
            }
        }
    )
})

// ...
// getuserpost GET
app.get('/getuserpost', (req, res) => {
    const id = req.session.user[0].id

    db.query(
        'SELECT * FROM posts WHERE user_id = ?',
        id,
        (err, result) => {
            if (err) {
                console.error(err)
            } else {
                res.send(result)
            }
        }
    )
})


// ------------------------------------
// Listen
// ------------------------------------

app.listen('8005', () => {
    console.log('server is running on port 8005')
})