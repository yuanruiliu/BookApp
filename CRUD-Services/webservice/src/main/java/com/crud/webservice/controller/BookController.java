package com.crud.webservice.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.crud.webservice.model.Book;
import com.crud.webservice.service.IBookService;


@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class BookController {
	
	@Autowired
	private IBookService bookService;
	
	@GetMapping(value = "book")
	public List<Book> getBooks() {
		return bookService.findAll();
	}
	
	@RequestMapping(value = "book")
	public Book getBook(@PathVariable Long id) {
		return bookService.findById(id);
	}

	@DeleteMapping("/book/{id}")
	public ResponseEntity<Void> deleteBook(@PathVariable Long id) {

		Book book = bookService.deleteById(id);

		if (book != null) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}

	@PutMapping("/book/{id}")
	public ResponseEntity<Book> updateBook( @PathVariable Long id,
			@RequestBody Book book) {

		Book courseUpdated = bookService.save(book);

		return new ResponseEntity<Book>(book, HttpStatus.OK);
	}

	@PostMapping("/book")
	public ResponseEntity<Void> createBook(@RequestBody Book book) {

		Book newBook = bookService.save(book);

		// Location
		// Get current resource url
		/// {id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newBook.getId())
				.toUri();

		return ResponseEntity.created(uri).build();
	}
}
