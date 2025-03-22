const router = require("express").Router();

const {getAll,getSingle,deleteProduct,updateProduct,postProduct} = require("../controllers/productController")


router.post("/",postProduct)
router.get("/",getAll)
router.get("/:id",getSingle)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)

module.exports=router