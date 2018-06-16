
package com.mybooks.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.mybooks.service.UserDetailService;

/**
 *
 * @author anyfeed
 */
@EnableWebSecurity
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailService userDetailsService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());

	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.authorizeRequests().antMatchers("/css/**", "/fonts/**", "/images/**", "/js/**").permitAll()
				.antMatchers(HttpMethod.POST, "/bookshelf/search/**").hasAnyRole("ADMIN", "USER")
				.antMatchers(HttpMethod.GET, "/bookshelf/pages/**/step/**", "/bookshelf/book/{id}", "/bookshelf/all", "/bookshelf/counts").hasAnyRole("ADMIN", "USER")
				.antMatchers(HttpMethod.POST, "/bookshelf/add/**", "/bookshelf/edit/**", "/bookshelf/sample/**").hasAnyRole("ADMIN")
				.antMatchers(HttpMethod.DELETE, "/bookshelf/flush/**").hasRole("ADMIN")
				.anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/login").defaultSuccessUrl("/", true).permitAll()
                .and()
                .logout().permitAll();
};
				//.logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login");
	

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
