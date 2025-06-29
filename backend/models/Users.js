const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
        "name": { type: String, },
        "email": { type: String,},
        "password": { type: String,},
        "usertype": { type: String,},

    }
)
let usermodel = mongoose.model("users", schema)
module.exports = { usermodel }
