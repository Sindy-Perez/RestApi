const { Router} = require("express");
const router = Router();
const _ =  require("underscore");

const movies = require("../ejemplo.json");

router.get("/", (req,res) =>{
    res.json(movies);
});

router.post("/", (req, res) => {
    const { title, director, years, rating } = req.body;
    if (title && director && years && rating){
        const id = movies.length + 1;
        const newMovie ={...req.body, id};
        movies.push(newMovie);
        res.json(movies);
    }else{
        res.status(500).json({error: "Hubo un error."});
    }
    res.send("recibido");
});

router.put("/:id", (req, res) =>{
    const { id } = req.params;
    const { title, director, years, rating } = req.body;
    if (title && director && years && rating){
        _.each(movies, (movie, i) => {
            if (movie.id == id) {
                movie.title = title;
                movie.director = director;
                movie.years = years;
                movie.rating = rating;
            }
        });
        res.json(movies);
    }else{
        res.status(500).json({error: "Hubo un error."});
    }
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    _.each(movies, (movie, i) =>{
        if (movie.id ==id){
            movies.splice(i, 1);
        }
    });
    res.send(movies);
});

module.exports = router;