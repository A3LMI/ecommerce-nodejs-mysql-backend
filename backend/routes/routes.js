module.exports = app => {
    const client = require("../controllers/clientController.js");
    const category = require("../controllers/categoryController.js");
    const product = require("../controllers/productController.js");
    const order = require("../controllers/orderController.js");
    const orderDetails = require("../controllers/orderDetailsController.js");
    const cart = require("../controllers/cartController.js");
    const cart_item = require("../controllers/cartItemController.js");
    const carousel = require("../controllers/carouselController.js");
    const session = require("../controllers/sessionController.js");
    const review = require("../controllers/reviewController.js");

    var router = require("express").Router();
    
    /***** SESSION *****/
    // Get all sessions
    router.get("/session", session.getAll);

    // Get session by ID
    router.get("/session/id/:id", session.getByID);

    // Create session
    router.get("/session/new", session.create);
    
    // Update session
    router.put("/session/:id", session.updateID);
    
    // Delete a session by ID
    router.delete("/session/:id", session.delete);
    
    /***** CLIENT *****/
    // Log In
    router.put("/login/", client.logIn);
    
    // Get all clients
    router.get("/client", client.getAll);

    // Get client by ID
    router.get("/client/id/:id", client.getByID);

    // Get client by name
    router.get("/client/name/:name", client.getClientByName);

    // Get client by ID and password
    router.get("/client/:id/:password", client.getByIDAndPassword);    
    
    // Get number of clients
    router.get("/client/count", client.count);

    // Create client
    router.post("/client", client.create);

    // Update client by ID
    router.put("/client/:id", client.update);

    // Update client passsword by ID
    router.put("/client/:id/password/:password", client.updatePassword);

    // Delete client by ID
    router.delete("/client/:id", client.delete);

    /***** CATEGORY *****/
    // Get all categories
    router.get("/category", category.getAll);

    // Get category by ID
    router.get("/category/id/:id", category.getByID);
    
    // Get category by name
    router.get("/category/name/:name", category.getCategoryByName);

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

    // Get product by name
    router.get("/product/name/:name", product.getProductByName);

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

    // Get by date
    router.get("/order/date/:date", order.getByDate);

    // Get by date viewed
    router.get("/order/date/:date/viewed", order.getByDateViewed);

    // Get by date not viewed
    router.get("/order/date/:date/notViewed", order.getByDateNotViewed);
    
    // Get by date delivered
    router.get("/order/date/:date/delivered", order.getDelivered);

    // Get order by ID
    router.get("/order/id/:id", order.getByID);

    // Get order by client ID
    router.get("/order/clientID/:id", order.getByClientID);
    
    // Get number of orders
    router.get("/order/count", order.count);

    // Get number of delivered orders
    router.get("/order/countDelivered", order.countDelivered);

    // Get number of not delivered orders
    router.get("/order/countNotDelivered", order.countNotDelivered);

    // Create order
    router.post("/order/cartID/:cart_id", order.create);

    // Update order by ID
    router.put("/order/:id", order.update);

    // Update order by ID
    router.put("/order/:id/delivered", order.setOrderDelivered);

    // Update order by ID
    router.put("/order/:id/viewed", order.setViewed);
    
    // Delete order by ID
    router.delete("/order/:id", order.delete);

    /***** ORDER DETAILS *****/
    // Get order details by order
    router.get("/order-details/id/:id", orderDetails.getByID);

    // Get order details by order
    router.get("/order-details/orderID/:id", orderDetails.getByOrderID);

    // Get total by order ID
    router.get("/order-details/orderID/:id/total", orderDetails.getTotalByOrderID);
    
    // Get number of order details by order
    router.get("/order-details/orderID/:id/count", orderDetails.count);

    // Create order detail (add product to order)
    router.post("/order-details", orderDetails.create);

    // Update order detail
    router.put("/order-details/:id", orderDetails.update);

    // Update order detail : set delivered
    router.put("/order-details/:id/delivered", orderDetails.setDelivered);    
    
    // Delete order detail (delete product from order)
    router.delete("/order-details/:id", orderDetails.delete);

    /***** CART *****/
    // Get all carts
    router.get("/cart", cart.getAll);

    // Get cart by ID
    router.get("/cart/id/:id", cart.getByID);

    // Get cart by session ID
    router.get("/cart/session_id/:session_id", cart.getBySession);
    
    // Get number of carts
    router.get("/cart/count", cart.count);

    // Get number of Purchased carts
    router.get("/cart/countPurchased", cart.countPurchased);

    // Get number of not Purchased carts
    router.get("/cart/countNotPurchased", cart.countNotPurchased);

    // Create cart
    router.post("/cart", cart.create);
    
    // Delete cart by ID
    router.delete("/cart/:id", cart.delete);

    /***** CART ITEMS *****/
    // Get all carts items
    router.get("/cart-items/", cart_item.getAll);

    // Get cart items by ID
    router.get("/cart-items/id/:id", cart_item.getByID);

    // Get cart items by cart ID
    router.get("/cart-items/cartID/:cart_id", cart_item.getByCartID);
    
    // Get number of cart items by cart ID
    router.get("/cart-items/cartID/:cart_id/count", cart_item.count);

    // Create order item (add product to cart)
    router.post("/cart-items", cart_item.create);

    // Update cart item
    router.put("/cart-items/:id", cart_item.update);
    
    // Delete cart item (delete product from cart)
    router.delete("/cart-items/:id", cart_item.delete);

    /***** CAROUSEL *****/
    // Get all carousels
    router.get("/carousel", carousel.getAll);

    /***** REVIEW *****/
    // Get all reviews
    router.get("/review", review.getAll);
    
    app.use('/', router);
};