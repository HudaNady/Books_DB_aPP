import authors from './authors/authors.routes.js'
import books from './books/books.routes.js'
import connected from '../DB/conection.js'

function bootstrap(app,express){
    connected()
    app.use(express.json())
    app.use('/authors',authors)
    app.use('/books',books)
    app.use('*',(req,res)=>{
        return res.json({message:'not found'})
    })

}
export default bootstrap