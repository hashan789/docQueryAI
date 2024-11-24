const express = require('express');
const app = express();
const cors = require('cors');
const azureRoutes = require("./routes/azureAiModel");

app.use(express.json())
app.use(cors())

app.use("/api/azure_data",azureRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));



