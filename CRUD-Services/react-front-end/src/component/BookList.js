import React, {Component} from 'react';
import Service from '../service/Service'

class BookList extends Component {
	constructor(props) {
        super(props)
        this.state = {
            books: [],
            message: null
        }
        this.getBooks = this.getBooks.bind(this)
		this.deleteBook = this.deleteBook.bind(this)
        this.updateBook = this.updateBook.bind(this)
        this.addBook = this.addBook.bind(this)
    }
    componentDidMount() {
        this.getBooks();
    }
    
	getBooks() {
        Service.retrieveAllBooks()
            .then(
                response => {
                    console.log(response);
                    this.setState({ books: response.data })
                }
            )
    }
	
	deleteBook(id) {
        Service.deleteCourse(id)
            .then(
                response => {
                    this.setState({ message: `Delete Successful` })
                    this.getAllBooks()
                }
            )

    }

    addBook() {
        this.props.history.push(`/books/-1`)
    }

    updateBook(id) {
        console.log('update book' + id)
        this.props.history.push(`/books/${id}`)
    }
	
    render() {
        return (
            <div className="container">
                <h3>All Books</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
								<th>Author</th>
								<th>Update</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.books.map(
                                    book =>
                                        <tr key={book.id}>
                                            <td>{book.id}</td>
                                            <td>{book.title}</td>
											<td>{book.author}</td>
											<td><button className="btn btn-success" onClick={() => this.updateBook(book.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteBook(book.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
							</tbody>
                    </table>
					<div className="row">
                        <button className="btn btn-success" onClick={this.addBook}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default BookList