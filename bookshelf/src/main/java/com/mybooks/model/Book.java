/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mybooks.model;

import java.io.Serializable;

/**
 *
 * @author anyfeed
 */

public class Book implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6452180756525848171L;
	int id;
	String title;
	String author;
	String theme;
	String publisher;
	String isbn;

	public Book() {
	}

	public Book(String title, String author, String theme, String publisher, String isbn) {
		this.title = title;
		this.author = author;
		this.theme = theme;
		this.publisher = publisher;
		this.isbn = isbn;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	@Override
	public String toString() {
		return "Book{" + "id=" + id + ", title=" + title + ", author=" + author + ", theme=" + theme + ", publisher="
				+ publisher + ", isbn=" + isbn + '}';
	}

}
