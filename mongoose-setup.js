//File used for setting up mongoose
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/todos';
mongoose.connect(dbUrl);


// Close the Mongoose connection on Control+C
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected');
    process.exit(0);
}); });


//Create the Schema
var Schema = mongoose.Schema;
var photoSchema = new Schema({
  photoUrl:{
    type: String,
    required: true,
    unique: false
  },
  photoLibrary:{
    type: String,
    required: true,
    unique: false
  }
  // libraryKey:{
  //   type: String,
  //   required: true,
  //   unique: false
  // }
});

//Export the Schema for use in routers.
mongoose.exports = mongoose.model('Photo', photoSchema);
