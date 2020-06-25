// importation du module mongoose
const mongoose = require("mongoose");
var mongo_connection_string =
    process.env.MONGO_URI ||
    "mongodb+srv://admin:JpqgGmJ397HusUY2@cluster0-xduxk.mongodb.net/the_competitors_db?retryWrites=true&w=majority";

mongoose.connect(
    mongo_connection_string,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    (error) => {
        if (!error) {
            console.log("Successful connection to the_competitors_db.");
        } else {
            console.log(
                "Connection failed to the_competitors_db : " +
                    JSON.stringify(error, undefined, 2)
            );
        }
    }
);

module.exports = mongoose;
