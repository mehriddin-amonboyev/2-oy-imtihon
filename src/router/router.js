import { Router } from "express";
import { blacklist, category, customer, product } from "./all.router.js";


export const router = Router();

router
    .use(category)
    .use(product)
    .use(customer)
    .use(blacklist);