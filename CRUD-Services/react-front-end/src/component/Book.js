import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Service from '../service/Service'

class Book extends Component {
	constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
			author: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {
        if (this.state.id === -1) {
            return
        }

        Service.retrieveBook(this.state.id)
            .then(response => this.setState({
                title: response.data.title,
				author: response.data.author
        }))
    }
    
	validate(values) {
        let errors = {}
        if (!values.title) {
            errors.description = 'Enter Title'
        }
		if (!values.author) {
            errors.description = 'Enter Author'
        }

        return errors

    }
	
	onSubmit(values) {
		console.log(values);
        let book = {
            id: this.state.id,
            description: values.title,
            author: values.author
        }

        if (this.state.id === -1) {
            Service.createBook(book)
                .then(() => this.props.history.push('/books'))
        } else {
            Service.updateBook(this.state.id, book)
                .then(() => this.props.history.push('/books'))
        }
    }
	
    render() {
        let { id, title, author } = this.state

        return (
            <div>
                <h3>Book</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, title, author }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />                                    
									<fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Title</label>
                                        <Field className="form-control" type="text" name="title" />
                                    </fieldset>
									<fieldset className="form-group">
                                        <label>Author</label>
                                        <Field className="form-control" type="text" name="author" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}
export default Book