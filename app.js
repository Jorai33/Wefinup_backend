// MongoDB Connection : mongodb+srv://jorai:<password>@cluster0-jbxop.mongodb.net/test?retryWrites=true

// Imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();  

//const Thing = require("./models/thing");
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

// GET Route
app.use("/api/projets", (req, res, next) => {

  const projets = [
    {
      _id : "1516515gsgd",
      nom : "Refonte ancienne bâtisse",
      dateDemandeFinancement : "22/05/2019",
      etatProjet : "Demande acceptée"
    },
    
    {
      _id : "156121fef",
      nom : "Achat piscine communale",
      dateDemandeFinancement : "18/04/2019",
      etatProjet : "Demande en attente de validation"
    }
  ];

  res.status(200).json(projets);
  
  
  
  
  
  // Projet.find().then((projets) => {
  //   res.status(200).json(projets);
  // }).catch((erreur) => {
  //   res.status(201).json({
  //     error: erreur
  //   });
  // });


});

module.exports = app;