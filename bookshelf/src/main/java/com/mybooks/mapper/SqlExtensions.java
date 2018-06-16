/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mybooks.mapper;

import org.apache.ibatis.jdbc.SQL;

import com.mybooks.model.Book;

/**
 *
 * @author anyfeed
 */
public class SqlExtensions {

	public String getAll() {
		return new SQL().SELECT("id, title, author, theme, publisher, isbn").FROM("bookshelf.books").ORDER_BY("id ASC")
				.toString();
	}

	public String findIt() {
		return new SQL().SELECT("id, title, author, theme, publisher, isbn").FROM("bookshelf.books").WHERE("id=#{id}")
				.ORDER_BY("id ASC").toString();
	}

	public String insertIt() {
		return new SQL().INSERT_INTO("bookshelf.books")
				.VALUES("title, author, theme, publisher, isbn", "#{title}, #{author}, #{theme}, #{publisher}, #{isbn}")
				.toString();
	}

	public String updateIt() {
		return new SQL().UPDATE("bookshelf.books").SET("title = #{title}", "author = #{author}", "theme = #{theme}",
				"publisher = #{publisher}", "isbn = #{isbn}").WHERE("id=#{id}").ORDER_BY("id ASC").toString();
	}

	public String deleteIt() {
		return new SQL().DELETE_FROM("bookshelf.books").WHERE("id=#{id}").toString();
	}

	public String searchIt(Book book) {

		String preSql = "SELECT * FROM bookshelf.books WHERE ";
		String halfSql = "";

		if (!book.getTitle().isEmpty()) {
			halfSql += "title ='" + book.getTitle() + "'";
		}
		if (!book.getAuthor().isEmpty()) {
			if (!halfSql.isEmpty()) {
				halfSql += " AND author ='" + book.getAuthor() + "'";
			} else {
				halfSql += "author ='" + book.getAuthor() + "'";
			}
		}
		if (!book.getTheme().isEmpty()) {
			if (!halfSql.isEmpty()) {
				halfSql += " AND theme ='" + book.getTheme() + "'";
			} else {
				halfSql += "theme ='" + book.getTheme() + "'";
			}
		}
		if (!book.getPublisher().isEmpty()) {
			if (!halfSql.isEmpty()) {
				halfSql += " AND publisher ='" + book.getPublisher() + "'";
			} else {
				halfSql += "publisher ='" + book.getPublisher() + "'";
			}
		}
		if (!book.getIsbn().isEmpty()) {
			if (!halfSql.isEmpty()) {
				halfSql += " AND isbn ='" + book.getIsbn() + "'";
			} else {
				halfSql += "isbn ='" + book.getIsbn() + "'";
			}
		}
		if (!halfSql.isEmpty()) {
			preSql += halfSql + ";";

		} else {
			preSql += "1 = 1";
		}

		return preSql;

	}

	public String getRecordsCounts() {
		return new SQL().SELECT("count(*)").FROM("bookshelf.books").toString();
	}

	public String getRecordsForPaginator(int idFrom, int idTo) {

		String preSql = "SELECT * FROM bookshelf.books ";
		String halfSql = "";

		halfSql += "OFFSET '" + idFrom + "'";
		halfSql += " LIMIT  '" + idTo + "'";
		if (!halfSql.isEmpty()) {
			preSql += halfSql + ";";

		} else {
			preSql += "1 = 1";
		}

		return preSql;
	}

}
