import Book from "../../../DB/models/Book.js"

export const addbook=async(req,res)=>{
    try{
        const book=await Book.insertMany(req.body)
        return res.status(201).json({message:'done',book})
    }catch(err){
        res.status(500).json({message:'catch err',err:err.message})
    }
}
export const allbooks=async(req,res)=>{
    try{
        ///pagination
        const {page=1,limit=8}=req.query
        const books=await Book.find().populate('author').skip((page-1)*limit).limit(limit)
        const totalBooks =await Book.countDocuments()
        const pages=Math.ceil(totalBooks/limit)
        return res.status(200).json({message:'done',books,currentPage:page,pages})
    }catch(err){
        res.status(500).json({message:'catch err',err:err.message})
    }
}
export const findById=async(req,res)=>{
    try{
        const book=await Book.findById(req.params.id).populate("author")
        return res.status(200).json({message:'done',book})
    }catch(err){
        res.status(500).json({message:'catch err',err:err.message})
    }
}
export const updatebook=async(req,res)=>{
    try{
        const book=await Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).json({message:'done',book})
    }catch(err){
        res.status(500).json({message:'catch err',err:err.message})
    }
}
export const deletebook=async(req,res)=>{
    try{
        const book=await Book.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:'done',book})
    }catch(err){
        res.status(500).json({message:'catch err',err:err.message})
    }
}
////filterbooks
export const filterbooks = async (req, res) => {
    try{
        const {page = 1,limit = 8,titleSearch = ""} = req.query
        const filter = {}
        if (titleSearch) {
            filter.title = { $regex: new RegExp(titleSearch, "i") }
        }
        const books = await Book.find(filter).populate('author').skip((page - 1) * limit).limit(limit).exec()
        const totalBooks = await Book.countDocuments(filter)
        const totalPages = Math.ceil(totalBooks / limit)
        return res.json({books, currentPage: page, totalPages })
    }catch (err) {
        res.status(500).json({ message: "catch err",err:err.message });
    }
}
