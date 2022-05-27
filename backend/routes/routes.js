module.exports = app => {
    const client = require("../controllers/clientController.js");
    const category = require("../controllers/categoryController.js");
    const product = require("../controllers/productController.js");

    var router = require("express").Router();

    /***** CLIENT *****/
    // Get all clients
    router.get("/client/login/:email/:password", client.logIn);

    // Get all clients
    router.get("/client", client.getAll);

    // Get client by ID
    router.get("/client/id/:id", client.getByID);
    
    // Get number of clients
    router.get("/client/count", client.count);

    // Create a client
    router.post("/client", client.create);

    // Update a client by ID
    router.put("/client/:id", client.update);
    
    // Delete a client by ID
    router.delete("/client/:id", client.delete);

    /***** CATEGORY *****/
    // Get all categories
    router.get("/category", category.getAll);

    // Get category by ID
    router.get("/category/id/:id", category.getByID);

    // Get category by level
    router.get("/category/level/:level", category.getByLevel);
    
    // Get number of clients
    router.get("/category/count", category.count);

    // Create a category
    router.post("/category", category.create);

    // Update a category by ID
    router.put("/category/:id", category.update);
    
    // Delete a category by ID
    router.delete("/category/:id", category.delete);

    /***** PRODUCT *****/
    // Get all products
    router.get("/product", product.getAll);

    // Get product by ID
    router.get("/product/id/:id", product.getByID);
    
    // Get number of products
    router.get("/product/count", product.count);

    // Create a product
    router.post("/product", product.create);

    // Update a product by ID
    router.put("/product/:id", product.update);
    
    // Delete a product by ID
    router.delete("/product/:id", product.delete);
    
    app.use('/', router);
};