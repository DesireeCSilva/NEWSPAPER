import express from "express";
import { getAllPosts, deletePost, addNewPost, editPost, getOnePost } from "../controllers/NewsController";
import { auth } from '../middlewares/authMiddleware'
import { validatePost } from "../validators/newsValidator";

const router = express.Router() 

router.get('/', auth, getAllPosts);

router.delete('/:id', auth, deletePost);

router.post('/', auth, validatePost ,addNewPost);

router.put('/:id', auth, validatePost, editPost);

router.get('/:id', auth, getOnePost);

export default router;