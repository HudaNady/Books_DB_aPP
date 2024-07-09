import express from 'express'
import * as author from './controllers/authors.js'

const router=express.Router()
router.post('/addauthor',author.addauthor)
router.get('/allauthors',author.allauthors)
router.get('/filterauthors',author.filterauthors)
router.get('/:id',author.findById)
router.patch('/update/:id',author.updateauthor)
router.delete('/delete/:id',author.deleteauthor)


export default router