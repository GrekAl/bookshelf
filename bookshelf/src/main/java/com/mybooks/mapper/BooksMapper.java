
package com.mybooks.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;

import com.mybooks.model.Book;

/**
 *
 * @author anyfeed
 */
@Mapper
public interface BooksMapper {

	@SelectProvider(type = SqlExtensions.class, method = "getAll")
	List<Book> getAllBooks();

	@SelectProvider(type = SqlExtensions.class, method = "getRecordsCounts")
	int countOfBookRecords();

	@SelectProvider(type = SqlExtensions.class, method = "getRecordsForPaginator")
	List<Book> getBooksForPaginator(int idFrom, int idTo);

	@SelectProvider(type = SqlExtensions.class, method = "searchIt")
	List<Book> searchBooks(Book book);

	@SelectProvider(type = SqlExtensions.class, method = "insertIt")
	@Options(useGeneratedKeys = true)
	void addBook(Book book);

	@SelectProvider(type = SqlExtensions.class, method = "updateIt")
	public void update(Book book);

	@SelectProvider(type = SqlExtensions.class, method = "findIt")
	Book findBook(int id);

	@SelectProvider(type = SqlExtensions.class, method = "deleteIt")
	void deleteBook(@Param("id") int id);

}
