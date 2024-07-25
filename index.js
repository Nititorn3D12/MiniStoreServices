const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const apiv2Router = require('./routes/apiv2');
const apiproductRouter = require('./routes/apiproduct');
const apiproductv2Router = require('./routes/apiproductv2');
const { swaggerUI, swaggerSpes, swaggerSpecs } = require ('./swagger')
const https = require('https');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors({
origin: true,
credentials: true
}));

// app.get("/api/hello", (req, res) => {
// return res.status(200).send('<h1>Hello Server</h1>');
// });

app.use('/api/v1', apiRouter)
app.use('/api/v2', apiv2Router)
app.use('/api/product', apiproductRouter)
app.use('/api/productv2', apiproductv2Router)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

const ssl_options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
}

const secure_port = 8443;

const port = 8080;
app.listen(port, () => {
console.log("Server listening on port:" + port);
});

https.createServer(ssl_options, app).listen(secure_port, () => {
    console.log("HTTPS Server listening on port:" + secure_port);
});