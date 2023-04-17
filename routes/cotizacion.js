const { Router } = require("express");
const express = require('express');
const bodyParser = require('body-parser');


const cotizacionRouter = Router()
cotizacionRouter.use(bodyParser.json())

cotizacionRouter.get('/',(req,res)=>{
    res.send('holaaaaa')
})


module.exports =cotizacionRouter