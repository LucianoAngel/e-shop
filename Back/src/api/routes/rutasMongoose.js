require('../config//dbMongoose');

const express = require('express');

const router = express.Router();

const {  createUser, createPerson, loginUser, findExpenses, findProducts, updateClient, findBills, createExpense, createCompany, createManyProducts, findClients, logout, createProduct, createBill, sendSession, deleteClient, deleteProduct, updateProduct, aggACaja, findCaja, updateFactura } = require('../controllers/funcionalidadMongoose');

// const { authTaller } = require('../controllers/auth');

// Crear Usuario
router.post('/createuser', createUser);
// Login
router.post('/loginuser', loginUser);
// crear cliente
router.post('/createperson', createPerson);
// crear cliente compañia
router.post('/createcompany', createCompany);
// buscar clientes y compañias
router.get('/findclients', findClients);
// eliminar clientes y compañias
router.delete('/deleteclient/:id', deleteClient);
// actualizar clientes y compañias
router.put('/updateclient/:id', updateClient);
// actualizar factura
router.put('/updatefactura/:id', updateFactura);
// crear producto
router.post('/createproduct', createProduct);
// crear muchos productos
router.post('/createmanyproducts', createManyProducts);
// crear caja
router.post('/aggacaja', aggACaja);
// crear factura de gasto
router.post('/createexpense', createExpense);
// buscar caja
router.get('/findcaja', findCaja);
// buscar facturas de gastos
router.get('/findexpenses', findExpenses);
// eliminar producto
router.delete('/deleteproduct/:id', deleteProduct);
// actualizar producto
router.put('/updateproduct/:id', updateProduct);
// buscar producto
router.get('/findproducts', findProducts);
// crear una factura
router.post('/createbill', createBill);
// buscar facturas
router.get('/findbills', findBills);
// enviar nombre de persona en session
router.get('/session', sendSession);
// salir de la session
router.get('/logout', logout);

module.exports = router;