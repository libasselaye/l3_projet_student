// importation du module mongoose
const mongoose = require("mongoose");
var mongo_connection_string =
    process.env.MONGO_URI || "mongodb://localhost:27017/the_competitors_db";

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
