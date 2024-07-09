import Author from "../../../DB/models/Author.js";

export const addauthor=async(req,res)=>{
    try{
        const author=await Author.insertMany(req.body)
        return res.status(201).json({message:'done',author})
    }catch(err){
        res.status(500).json({message:'catch err',err})
    }
}
export const findById=async(req,res)=>{
    try{
        const author=await Author.findById(req.params.id).populate('books')
        return res.status(200).json({message:'done',author})
    }catch(err){
        res.status(500).json({message:'catch err',err:err.message})
    }
}
export const allauthors=async(req,res)=>{
    try{
        const {page=1,limit=8}=req.query
        const authors=await Author.find().populate({path: 'books'}).skip((page-1)*limit).limit(limit)
        const totalAuthors =await Author.countDocuments()
        const pages=Math.ceil(totalAuthors/limit)
        return res.status(200).json({message:'done',authors,currentPage:page,pages})
    }catch(err){
        res.status(500).json({message:'catch err',err:err.message})
    }
}
export const updateauthor=async(req,res)=>{
    try{
        const author=await Author.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).json({message:'done',author})
    }catch(err){
        res.status(500).json({message:'catch err',err:err.message})
    }
}
export const deleteauthor=async(req,res)=>{
    try{
        const author=await Author.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:'done',author})
    }catch(err){
        res.status(500).json({message:'catch err',err:err.message})
    }
}

export const filterauthors = async (req, res) => {
    try{
        const {page = 1,limit = 8,nameSearch  = "",bioSearch = ""} = req.query
        const filter = {}
        if (nameSearch ) {
            filter.name = { $regex: new RegExp(nameSearch, "i") }
        }
        if (bioSearch) {
        filter.bio = { $regex: new RegExp(bioSearch, "i") }
        }
        const authors=await Author.find(filter).populate('books').skip((page-1)*limit).limit(limit)
        const totalAuthors =await Author.countDocuments(filter)
        const pages=Math.ceil(totalAuthors/limit)
        return res.status(200).json({message:'done',authors,currentPage:page,pages})
    }catch (err) {
        res.status(500).json({ message: "catch err",err:err.message });
    }
}