const Data = require('../model/itemSchema');

exports.getData = async(req,res) => {
    try {
        const items = await Data.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

exports.addData = async(req,res)=>{
    const item = new Data(req.body);

    try {

        const newItem = await item.save();
        res.status(201).json(newItem);

    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

exports.deleteData = async(req,res)=>{
    try {
        const item = await Data.findById(req.params.id);
        if(item==null){
            return res.status(404).json({message:"item not found"});
        }
        await item.deleteOne();
        res.json({message:"item Deleted"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}