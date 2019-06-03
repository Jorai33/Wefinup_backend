const mongoose = require("mongoose");

const projetSchema = mongoose.Schema({

nom : { type : String, required : true},
etatProjet : { type : String, required : true }  ,
dateDemandeFinancement : { type : String }

});

// exporting that schema as a Mongoose model, making it available for our Express app
module.exports = mongoose.model("Projet", projetSchema);