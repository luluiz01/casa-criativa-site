const express = require("express")
const server = express()

const db = require("./db")

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

//configurção do nunjucks
let nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

//criei uma rota
// e caputuro o pedido do cliente para respodner 
server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send(`"Erro no banco de dados! ${err}`)
        }
        const reversedIdeias = [...rows].reverse()

        const lastIdeas = []
        for (let idea of reversedIdeias) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })
    })


})

server.get("/ideias", function (req, res) {
    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send(`"Erro no banco de dados! ${err}`)
        }
        const reversedIdeias = [...rows].reverse()

        return res.render("ideias.html", { ideas: reversedIdeias })

    })
})


server.post("/", function (req, res) {
    //Inserir dado na table
    const query = (`INSERT INTO ideas  (image, title, category, description, link) VALUES (?,?,?,?,?);`)

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            return (res.send("Erro no banco de dados! "))
        }

        return res.redirect("/ideias")
    });

})

server.listen(3000)