const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send("running server ......")
})


// listen on port 5000
app.listen(port, ()=>{
    console.log("listening on port", port);
})