// MongoDB Connection : mongodb+srv://jorai:<password>@cluster0-jbxop.mongodb.net/test?retryWrites=true

// Imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const Projet = require ("./models/projet");
// connect() method returns a Promise
mongoose.connect("mongodb+srv://jorai:qhs90f9yHz5nCN3k@cluster0-jbxop.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })
  .then(() => {

    console.log("Connection to MongoDB Atlas succeeded !");
  })
  .catch((erreur) => {
    console.log("Connexion to MongoDB Atlas failed");
    console.error(erreur);
  });



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.post("/api/projets", (req, res, next) => {
  const projet = new Projet({
    nom: req.body.nom,
    etatProjet: req.body.etatProjet,
    
  });

  projet.save().then(

    () => {
      res.status(201).json({
        message: "Projet créé avec succès !"
      })
    }
  ).catch((erreur) => {
    res.status(400).json({
      error: erreur
    })
  });


});

// GET Route with get() method to GET requests to this endpoint avec thingID passé en paramètre
app.get("/api/projets/:id", (req, res, next) => {

  Projet.findOne({
    _id: req.params.id
  }).then((projet) => {
    res.status(200).json(projet);
  }).catch((erreur) => {
    res.status(404).json({
      error: erreur
    });

  });
});


// PUT Route to modify existing object
app.put("/api/projets/:id", (req, res, next) => {

  const projet = new Projet({
    _id: req.params.id, // we take the id in parameters to avoid the creation of a new one which would create a mistake
    nom: req.body.nom,
    etatProjet: req.body.etatProjet
  })
  
  Projet.updateOne({_id: req.params.id}, projet)
  .then(()=> {
    res.status(201).json({
      message : "Projet updated successfully"
    });    
  }).catch((erreur) => {
    res.status(400).json({
      error : erreur
    });
  });
});

app.delete("/api/projets/:id", (req, res, next) => {
  Projet.deleteOne({ _id : req.params.id }).then(
    () => {
      res.status(200).json({
        message : "Deleted !"
      });
      }).catch((erreur) => {
        res.status(400).json({
          error : erreur
        });
      });
});

// GET Route
app.use("/api/projets", (req, res, next) => {

  
  Projet.find().then((projets) => {
    res.status(200).json(projets);
  }).catch((erreur) => {
    res.status(201).json({
      error: erreur
    });
  });


});

module.exports = app;







