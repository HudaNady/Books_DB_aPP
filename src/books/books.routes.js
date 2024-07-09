
import express from 'express'
import * as book from'./controllers/books.js'
const router=express.Router()
router.post('/addbook',book.addbook)
router.get('/allbooks',book.allbooks)
router.get('/filterbooks',book.filterbooks)
router.get('/:id',book.findById)
router.patch('/update/:id',book.updatebook)
router.delete('/delete/:id',book.deletebook)



export default router