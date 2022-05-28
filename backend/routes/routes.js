module.exports = app => {
    const client = require("../controllers/clientController.js");
    const category = require("../controllers/categoryController.js");
    const product = require("../controllers/productController.js");
    const order = require("../controllers/orderController.js");
    const orderDetails = require("../controllers/orderDetailsController.js");

    var router = require("express").Router();

    /***** CLIENT *****/
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
    
    // Get number of categories
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

    // Get all products v2
    router.get("/product/all", product.getAllMore);

    // Get product by ID
    router.get("/product/id/:id", product.getByID);
    
    // Get number of products
    router.get("/product/count", product.count);

    // Create product
    router.post("/product", product.create);

    // Update product by ID
    router.put("/product/:id", product.update);
    
    // Delete product by ID
    router.delete("/product/:id", product.delete);

    /***** ORDER *****/
    // Get all orders
    router.get("/order", order.getAll);

    // Get order by ID
    router.get("/order/id/:id", order.getByID);
    
    // Get number of orders
    router.get("/order/count", order.count);

    // Get number of delivered orders
    router.get("/order/countDelivered", order.countDelivered);

    // Get number of not delivered orders
    router.get("/order/countNotDelivered", order.countNotDelivered);

    // Create order
    router.post("/order", order.create);

    // Update order by ID
    router.put("/order/:id", order.update);
    
    // Delete order by ID
    router.delete("/order/:id", order.delete);

    /***** ORDER DETAILS *****/
    // Get order details by order
    router.get("/order-details/orderID/:id", orderDetails.getByOrderID);
    
    // Get number of order details by order
    router.get("/order-details/orderID/:id/count", orderDetails.count);

    // Create order detail (add product to order)
    router.post("/order-details", orderDetails.create);

    // Update order detail
    router.put("/order-details/:id", orderDetails.update);
    
    // Delete order detail (delete product from order)
    router.delete("/order-details/:id", orderDetails.delete);
    
    app.use('/', router);
};