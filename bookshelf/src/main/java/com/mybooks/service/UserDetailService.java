package com.mybooks.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.mybooks.mapper.UsersMapper;
import com.mybooks.model.User;

/**
 *
 * @author anyfeed
 */
@Service
public class UserDetailService implements UserDetailsService {

	private final UsersMapper usersMapper;

	public UserDetailService(UsersMapper usersMapper) {
		this.usersMapper = usersMapper;
	}

	@Override
	public UserDetails loadUserByUsername(String webUser) throws UsernameNotFoundException {
		User user = usersMapper.getUsersLogin(webUser);
		return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(),
				getAuthorities(user));
	}

	public Collection<? extends GrantedAuthority> getAuthorities(User user) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		String roleType;
		if (user.isAdmin()) {
			roleType = "ROLE_ADMIN";
		} else {
			roleType = "ROLE_USER";
		}
		SimpleGrantedAuthority sGA = new SimpleGrantedAuthority(roleType);
		authorities.add(sGA);
		return authorities;

	}

}
