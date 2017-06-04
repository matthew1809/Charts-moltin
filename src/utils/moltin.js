const moltin = require('@moltin/sdk');
const config = require('../config');

var exports = module.exports = {};

const Moltin = moltin.gateway({
   client_id: config.client_id,
   client_secret: config.client_secret,
 });

exports.GetProducts = function() {
  return Moltin.Products.All()
 };

exports.GetCategories = function() {
  return Moltin.Categories.All()
}

exports.GetBrands = function() {
  return Moltin.Brands.All()
}

exports.GetFile = function(ID) {
  return Moltin.Files.Get(ID)
}

exports.AddCart = function(ID) {
  return Moltin.Cart.AddProduct(ID)
}

exports.GetCartItems = function() {
  return Moltin.Cart.Items()
}

exports.GetOrders = function() {
  return Moltin.Orders.All()
}
