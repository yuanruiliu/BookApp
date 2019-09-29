package com.crud.webservice.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.crud.webservice.model.Book;
import com.crud.webservice.service.IBookService;

@Service
public class BookServiceImpl implements IBookService {
	private static Long id = new Long(0);
	private static List<Book> books = new ArrayList<Book>();
	static {
		books.add(new Book(id++, "book0", "author0"));
		books.add(new Book(id++, "book1", "author1"));
		books.add(new Book(id++, "book2", "author2"));
		books.add(new Book(id++, "book3", "author3"));
		books.add(new Book(id++, "book4", "author4"));
		books.add(new Book(id++, "book5", "author5"));
	}
	  
	@Override
	public List<Book> findAll() {
		return books;
	}
	
	@Override
	public Book findById(Long id) {
		return books.stream().filter(b -> b.getId()==id).limit(1).collect(Collectors.toList()).get(0);
	}
	
	@Override
	public Book deleteById(Long id) {
		Book book = this.findById(id);

		if (book == null) {
			books.remove(book);
			return book;
		}
		
		return null;
	}
	
	@Override
	public Book save(Book book) {
		if (book.getId() == -1 || book.getId() == 0) {
			book.setId(id++);
			books.add(book);
		} else {
			this.deleteById(book.getId());
			books.add(book);
		}
		return book;
	}
}
