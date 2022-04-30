const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require('jsonwebtoken');



/*-------------------BASE DE DADOS CONFIG----------------------------*/
// Criar conexão
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "voto_eletronico",
});

// Conexão ao mysql
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL Conectado");
});


/*-------------------------------------------------------------------*/

//da allow à crossplatform, frontend com a backend
//da trace a todos os objetos enviados pela front end
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}))
/*------------------------------------------------EVENTOS------------------------------------------------------*/
app.get("/eventos", (req, res) => {
    db.query("SELECT * FROM eventos", (err, result) => {
        res.send(result)

    })
})

//associa o evento ao tipo de documento que o user tem
app.get("/eventos/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM eventos WHERE dataFim >= CURRENT_DATE AND tipoDocumento = ?", id, (err, result) => {
        res.send(result)
    })
})
/*------------------------------------------------EVENTOS EXPIRADOS ------------------------------------------------------*/
app.get("/eventosexpirados", (req, res) => {
    db.query("SELECT * FROM `eventos` WHERE dataFim <= CURRENT_DATE", (err, result) => {
        res.send(result)
    })
})
app.get("/resultados/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT c.id, c.nome, COUNT(*) AS votosContagem FROM votacoes as v LEFT JOIN candidatos as c ON c.id=v.id_candidato WHERE v.id_evento=? GROUP BY v.id_candidato ORDER BY votosContagem DESC", id, (err, result) => {
        res.send(result)
    })
})
/*------------------------------------------------VOTOS EM EVENTOS------------------------------------------------------*/
app.get("/candidatoseventos/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        "SELECT * FROM candidatos WHERE id_evento=?", id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }

        })
})



/*--------------------------------------------ASSOCIAÇAO DO CANDIDATO E UTILIZADOR AO VOTO E BLOCK --------------------------------------------*/
app.post("/votoefetuado", (req, res) => {
    const id_candidato = req.body.id_candidato;
    const idevento = req.body.id_evento;
    const id_utilizador = req.body.id_utilizador;
    db.query("SELECT COUNT(*) AS votodoutilizador FROM votacoes WHERE id_evento = ? AND id_utilizador = ?", [idevento, id_utilizador], (err, votacao) => {
        
        if (votacao[0].votodoutilizador == 0) {
            res.send({ message: "votoaberto" })

            db.query("INSERT INTO votacoes ( id_candidato, id_evento, id_utilizador) VALUES (?,?,?)", [id_candidato, idevento, id_utilizador], (err, result) => {
                if (err) {
                    console.log(err);
                }
            })
        } else {
            res.send({ message: "votofechado" })
        }
    })
})

/*------------------------------------------------LOGIN: AUTENTICAÇAO------------------------------------------------------*/
app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
})

/*------------------------------------------------LOGIN: CONEXÃO À BD E CRIAÇÃO DO TOKEN------------------------------------------------------*/
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(
        "SELECT * FROM utilizadores WHERE email = ?;",
        email,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        const id = result[0].id;
                        const token = jwt.sign({ id }, "jwtSecret", {
                            expiresIn: 300,
                        })
                        req.session.user = result;
                        res.json({ auth: true, token: token, result: result });
                    } else {
                        res.json({ auth: false, message: "E-mail/password incorreta" });

                    }
                });
            } else {
                res.json({ auth: false, message: "Não existe esse e-mail" });

            }
        }
    );
});

/*-----------------------------------ATUALIZAR PASSWORD------------------------------- */
app.post("/novapassword/:id", (req, res) => {
    const id = req.params.id;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query(
            "UPDATE utilizadores SET password=? WHERE id=?",
            [hash, id], (err, result) => {
                if (err) {
                    console.log(err)
                }
            }

        )
    })
})

/**/
app.listen("3001", () => {
    console.log("Servidor começou na porta 3001");
});
