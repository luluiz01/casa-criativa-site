const express = require("express")
const server = express()

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Curso de Programação",
        category: "Estudo",
        description: "Ideia de programar na quarentena",
        url: "http://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url: "http://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url: "http://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729021.svg",
        title: "Video-game",
        category: "Jogos",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url: "http://rocketseat.com.br"
    },
]

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//configurção do nunjucks
let nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})



//criei uma rota
// e caputuro o pedido do cliente para respodner 
server.get("/", function (req, res) {

    const reversedIdeias = [...ideas].reverse()

    const lastIdeas = []
    for (let idea of reversedIdeias) {
        if (lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    return res.render("index.html", { ideas: lastIdeas })

})

server.get("/ideias", function (req, res) {
    const reversedIdeias = [...ideas].reverse()
    return res.render("ideias.html", { ideas: reversedIdeias })

})

server.listen(3000)