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

    getClientsCount() {
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

}
export default new AdminService();