const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("dotenv").config()
const cookieParser=require("cookie-parser");
app.use(cookieParser())
require("./config/db")
const port = process.env.PORT
const UserRoute=require("./routes/user.route")
const ProjectRoutes=require("./routes/project.route")
const PaymentRoute=require("./routes/payment.route")
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: ' Freelancing_Project_management  API',
        version: '1.0.0',
        description: 'API for managing Freelancing_Project_management',
    },
    servers: [
        {
            url: 'http://localhost:3000/api', // Replace with your API base URL
        },
    ],
};
// Options for Swagger JSDoc
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/user.route.js', './routes/project.route.js','./routes/payment.route.js'], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth",UserRoute)
app.use("/api/v1/project",ProjectRoutes)
app.use("/api/v1/payment",PaymentRoute)
app.get("/",(req,res)=>{
    res.send("<center><h1>Freelancing_Project_Management All apis</h1><br>Get All Apis Use My Link <a href=https://github.com/Kotak111/Freelancing_Project_Management target=_blank>Repository :- Freelancing_Project_Management</a></center>")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))