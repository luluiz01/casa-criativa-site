const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')


db.serialize(function () {
    // criar tabela
  /*   db.run(`
           CREATE TABLE IF NOT EXISTS ideas(
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               image TEXT,
               title TEXT,
               category TEXT,
               description TEXT,
               link TEXT
           );
       `) */

    //Inserir dado na table
   /*  const query = (`INSERT INTO ideas  (image, title, category, description, link) VALUES (?,?,?,?,?);`)

    const values = [
        "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        "Curso de Programação",
        "Estudo",
        "Ideia de programar na quarentena",
        "http://rocketseat.com.br"
    ]

    db.run(query, values, function (err) {
        if (err) return console.log(err)

        console.log(this)
    }); */

    //Deletar dado na table
    /*    db.run(`DELETE FROM ideas WHERE id = ?`, [1], function (err) {
           if (err) return console.log(err)
   
           console.log(`${this} deletado com sucesso!`)
       }) */

    //Consultar dado na table
    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) return console.log(err)

        console.log(rows)
    })







})

module.exports = db