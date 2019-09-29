import axios from 'axios'
const API_URL = 'http://localhost:8080'
const BOOK_API_URL = `${API_URL}/book`
class Service {
    retrieveAllBooks() {
        return axios.get(`${BOOK_API_URL}`);
    }
	
	retrieveBook(id) {
        return axios.get(`${BOOK_API_URL}/{id}`);
    }

    deleteBook(id) {
        return axios.delete(`${BOOK_API_URL}/{id}`);
    }

    updateBook(id, book) {
		console.log(book);
        return axios.put(`${BOOK_API_URL}/${id}`, book);
    }

    createBook(book) {
		console.log(book);
        return axios.post(`${BOOK_API_URL}`, book);
    }
}
export default new Service()