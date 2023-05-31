const express = require('express');
const { tokenVerify } = require('../config/encrypt');
const {uploader} = require('../config/uploader');
const { checkUser } = require('../config/validator');
const { registerProduct, getAllMenu, filterMenu, createTransaction, getAllTransactions, getSpecUserTrans, filterProductList, updateProduct, deleteMenu, createReport, getAllReport } = require('../controller/productController');
const { login, createAccount, keepLogin, getUserData, getAllUser } = require('../controller/userController');
const route = express.Router();


route.get('/users', tokenVerify, getUserData);
route.get('/products/menu', getAllMenu);
route.get('/transaction', getAllTransactions);
route.get('/users/all', getAllUser);
route.post('/report/all', getAllReport);
route.post(`/users`, login);
route.post(`/products-list/filter`, filterProductList);
route.post(`/users/keep-login`, tokenVerify , keepLogin);
route.post(`/users/regis`, checkUser, createAccount);
route.post('/transaction', getSpecUserTrans);
route.post('/products/filter', filterMenu);
route.post('/transaction/create', createTransaction);
route.post('/report', createReport);
route.patch('/products',tokenVerify, uploader('/productPicture', 'PRODUCTIMG').array('images', 1), updateProduct);
route.post('/products',tokenVerify, uploader('/productPicture', 'PRODUCTIMG').array('images', 1), registerProduct);
route.patch('/products/delete', deleteMenu);

module.exports = route

//uploader('/imgProfile', 'IMGPROFILE').array('images', 1)