import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "../controller/category.controller.js";
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "../controller/product.controller.js";
import { blacklisted, createCustomer, deleteCustomer, getCustomer, updateCustomer } from "../controller/customer.controller.js";


export const category = Router();
export const product = Router();
export const customer = Router();
export const blacklist = Router();

category
    .get("/category", getAllCategory)
    .get("/category/:id", getCategory)
    .post("/category/add", createCategory)
    .put("/category/:id", updateCategory)
    .delete("/category/:id", deleteCategory);

product
    .get("/product", getAllProduct)
    .get("/product/:id", getProduct)
    .post("/product/add", createProduct)
    .put("/product/:id", updateProduct)
    .delete("/product/:id", deleteProduct);

customer
    .get("/customer/:id", getCustomer)
    .post("/customer/add",createCustomer)
    .put("/customer/:id", updateCustomer)
    .delete("/customer/:id", deleteCustomer);

blacklist
    .get("/blaclisted", blacklisted);