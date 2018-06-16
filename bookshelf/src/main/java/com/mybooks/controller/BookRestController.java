package com.mybooks.controller;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.mybooks.mapper.BooksMapper;
import com.mybooks.model.Book;

/**
 *
 * @author anyfeed
 */
@RestController
@RequestMapping("/bookshelf")
public class BookRestController {

	private BooksMapper booksMapper;

	public BookRestController(BooksMapper booksMapper) {
		this.booksMapper = booksMapper;
	}

	@GetMapping("/all")
	public List<Book> getAllBooks() {
		return booksMapper.getAllBooks();
	}

	@PostMapping("/sample")
	public String status() {
		return "OK";
	}

	@PostMapping("/search")
	List<Book> searchBooks(@RequestParam(value = "title") String title, @RequestParam(value = "author") String author,
			@RequestParam(value = "theme") String theme, @RequestParam(value = "publisher") String publisher,
			@RequestParam(value = "isbn") String isbn) {
		Book book = new Book(title, author, theme, publisher, isbn);
		return booksMapper.searchBooks(book);

	}

	@GetMapping("/counts")
	public int getCountsOfBooks() {
		return booksMapper.countOfBookRecords();
	}

	@GetMapping(value = { "/pages/{pg}/step/{st}" })
	List<Book> booksWithPaginator(@PathVariable(value = "pg") String pg, @PathVariable(value = "st") String st) {
		double step;
		int askPage, idFrom, idTo;
		// -------------------Валидность запрашиваемой страницы-----------------
		if (!pg.isEmpty() && pg.matches("\\d+")) {
			askPage = Integer.valueOf(pg);
		} else {
			askPage = 1;
		}
		// ----------------Валидность шага (количества записей на
		// странице)--------------
		if (!st.isEmpty() && st.matches("\\d+")) {
			step = Double.valueOf(st);
		} else {
			step = 1.0;
		}
		// ---------Проверка что значение запрашиваемой страницы не превышает
		// максимального значения----

		askPage = Integer.valueOf(pg);

		if (askPage > ((int) Math.ceil(booksMapper.countOfBookRecords() / step))) {
			askPage = ((int) Math.ceil(booksMapper.countOfBookRecords() / step));
		}
		step = Double.valueOf(st);

		idFrom = (int) (step * (askPage - 1));
		idTo = (int) (step);
		return booksMapper.getBooksForPaginator(idFrom, idTo);

	}

	@RequestMapping(value = "book/{id}", method = RequestMethod.GET)
	public Book findBook(@PathVariable(value = "id") String id) {
		Book curBook = null;
		if (!id.isEmpty() && id.matches("\\d+")) {
			curBook = booksMapper.findBook(Integer.valueOf(id));
		}
		return curBook;
	}

	@PostMapping("/add")
	void addNewBook(@RequestParam(value = "title") String title, @RequestParam(value = "author") String author,
			@RequestParam(value = "theme") String theme, @RequestParam(value = "publisher") String publisher,
			@RequestParam(value = "isbn") String isbn) {

		if (!title.isEmpty() && !author.isEmpty() && !theme.isEmpty() && !publisher.isEmpty() && !isbn.isEmpty()) {
			Book book = new Book(title, author, theme, publisher, isbn);
			booksMapper.addBook(book);
		}
	}

	@PostMapping("/edit")
	void editBook(@RequestParam(value = "id") String id, @RequestParam(value = "title") String title,
			@RequestParam(value = "author") String author, @RequestParam(value = "theme") String theme,
			@RequestParam(value = "publisher") String publisher, @RequestParam(value = "isbn") String isbn) {

		if (!id.isEmpty() && id.matches("\\d+") && !title.isEmpty() && !author.isEmpty() && !theme.isEmpty()
				&& !publisher.isEmpty() && !isbn.isEmpty()) {
			Book book = new Book(title, author, theme, publisher, isbn);
			book.setId(Integer.valueOf(id));
			booksMapper.update(book);
		}
	}

	@DeleteMapping(value = "/flush/{id}")
	public void deleteBook(@PathVariable(value = "id") String id) {
		if (!id.isEmpty() && id.matches("\\d+")) {
			booksMapper.deleteBook(Integer.valueOf(id));
		}
	}
}
