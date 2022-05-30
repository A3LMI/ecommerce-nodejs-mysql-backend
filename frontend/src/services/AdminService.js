import http from "../config/http-common";

class AdminService {

    // Client
    getAllClients() {
        return http.get("http://localhost:8080/client");
    }

    adminLogIn(email, password) {
        return http.get("http://localhost:8080/admin/login/" + email + "/" + password);
    }

    getClientByID(id) {
        return http.get(`http://localhost:8080/client/id/${id}`);
    }

    numberOfClients() {
        return http.get("http://localhost:8080/client/count");
    }

    addClient(client) {
        return http.post("http://localhost:8080/client/", client);
    }
    
    updateClient(id, client) {
        return http.put(`http://localhost:8080/client/${id}`, client);
    }

    deleteClient(id) {
        return http.delete(`http://localhost:8080/client/${id}`);
    }

    // Category
    getAllCategories() {
        return http.get("http://localhost:8080/category");
    }

    getCategoryByID(id) {
        return http.get(`http://localhost:8080/category/id/${id}`);
    }

    numberOfCategories() {
        return http.get("http://localhost:8080/category/count");
    }

    addCategory(category) {
        return http.post("http://localhost:8080/category/", category);
    }
    
    updateCategory(id, category) {
        return http.put(`http://localhost:8080/category/${id}`, category);
    }

    deleteCategory(id) {
        return http.delete(`http://localhost:8080/category/${id}`);
    }

    // Product
    getAllProducts() {
        return http.get("http://localhost:8080/product");
    }

    getAllProductsMore() {
        return http.get("http://localhost:8080/product/all");
    }    

    getProductByID(id) {
        return http.get(`http://localhost:8080/product/id/${id}`);
    }

    numberOfProducts() {
        return http.get("http://localhost:8080/product/count");
    }

    addProduct(product) {
        return http.post("http://localhost:8080/product/", product);
    }
    
    updateProduct(id, product) {
        return http.put(`http://localhost:8080/product/${id}`, product);
    }

    deleteProduct(id) {
        return http.delete(`http://localhost:8080/product/${id}`);
    }

    // Order
    getAllOrders() {
        return http.get("http://localhost:8080/order");
    }

    getOrderByID(id) {
        return http.get(`http://localhost:8080/order/id/${id}`);
    }

    numberOfOrders() {
        return http.get("http://localhost:8080/order/count");
    }

    numberOfDeliveredOrders() {
        return http.get("http://localhost:8080/order/countDelivered");
    }

    numberOfNotDeliveredOrders() {
        return http.get("http://localhost:8080/order/countNotDelivered");
    }

    addOrder(order) {
        return http.post("http://localhost:8080/order/", order);
    }
    
    updateOrder(id, order) {
        return http.put(`http://localhost:8080/order/${id}`, order);
    }

    deleteOrder(id) {
        return http.delete(`http://localhost:8080/order/${id}`);
    }

    // Order Details
    getOrderDetailsByOrderID(id) {
        return http.get(`http://localhost:8080/order-details/orderID/${id}`);
    }

    numberOfOrderDetails(id) {
        return http.get(`http://localhost:8080/order-details/${id}/count`);
    }

    addOrderDetail(order) {
        return http.post("http://localhost:8080/order-details/", order);
    }
    
    updateOrderDetail(id, order) {
        return http.put(`http://localhost:8080/order-details/${id}`, order);
    }

    deleteOrderDetail(id) {
        return http.delete(`http://localhost:8080/order-details/${id}`);
    }

}
export default new AdminService();