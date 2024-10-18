const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://jalon:12345o@clustermern.gijjz.mongodb.net/Marketplace', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB.'))
.catch(err => console.log('Cannot connect to MongoDB.', err));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
});

require('./routes/product.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
