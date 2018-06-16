package com.mybooks;

import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@MapperScan("com.mybooks.mapper")
public class BookshelfApplication extends SpringBootServletInitializer {

	private final Logger logger = LoggerFactory.getLogger(BookshelfApplication.class);

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(BookshelfApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(BookshelfApplication.class, args);
	}

}
