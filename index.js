const express = require("express")
const app = express()
const cors = require('cors')
const usersRouter = require('./routes/usersRouter')
const authRouter = require('./routes/authRouter')
const productsRouter = require('./routes/productsRoute')
const categoriesRouter = require('./routes/categoriesRouter')
const cartsRouter = require('./routes/cartsRouter')
const pool = require("./config/db")
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)
app.use('/carts', cartsRouter)

pool
	.connect()
	.then(() => {
		console.log('Connection to PostgreSQL closed');
	})
	.catch((err) => {
		console.error('Error closing connection', err);
	});

app.listen(3000, ()=>{
    console.log("Server running on http://localhost:3000")
})