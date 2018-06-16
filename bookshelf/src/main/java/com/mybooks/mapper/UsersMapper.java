
package com.mybooks.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.mybooks.model.User;

/**
 *
 * @author anyfeed
 */
@Mapper
public interface UsersMapper {
	@Select("SELECT * FROM bookshelf.users WHERE login = #{login}")
	User getUsersLogin(@Param("login") String login);
}
