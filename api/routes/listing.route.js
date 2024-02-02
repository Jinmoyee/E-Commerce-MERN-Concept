import express from 'express'
import { createListing } from '../controller/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create/:id', verifyToken, createListing)

export default router