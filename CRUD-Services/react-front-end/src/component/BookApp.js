import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import BookList from './BookList'
import Book from './Book';

class BookApp extends Component {
    render() {
        return (
			  <Router>
                <>
                    <h1>Book Application</h1>
                    <Switch>
                        <Route path="/" exact component={BookList} />
                        <Route path="/books" exact component={BookList} />
                        <Route path="/books/:id" component={Book} />
                    </Switch>
                </>
            </Router>
        )
    }
}
export default BookApp