package com.crud.webservice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.crud.webservice.model.Book;

@Service
public interface IBookService {
	
	public List<Book> findAll();

	public Book findById(Long id);

	public Book deleteById(Long id);

	public Book save(Book book);

}
