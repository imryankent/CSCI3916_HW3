var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

//mongoose.connect(process.env.DB, { useNewUrlParser: true });
try {
    mongoose.connect( process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("connected"));
}catch (error) {
    console.log("could not connect");
}
mongoose.set('useCreateIndex', true);

//movie schema
var MovieSchema = new Schema({
    title: String,
    year: Number,
    genre: {
        type: String,
        enum: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller', 'Western']
    },
    actors: {
        "type": "array",
        "items": [{actorName: String, characterName: String}],
        "minItems": 3,
        "uniqueItems": true
    },
});

//return the model to server
module.exports = mongoose.model('Movie', MovieSchema);
