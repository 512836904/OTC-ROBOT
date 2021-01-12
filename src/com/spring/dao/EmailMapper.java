package com.spring.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.dto.WeldDto;
import com.spring.model.Email;
import com.spring.model.Gather;

import tk.mybatis.mapper.common.Mapper;

public interface EmailMapper extends Mapper<Gather>{
	List<Email> getEmailAll(@Param("str")String str);
	
	List<Email> getErrorAll(@Param("str")String str);
	
	int getEmailAddressCount(@Param("femailaddress")String femailaddress);
	
	int getErrocount(@Param("wid")String wid);
	
	boolean addEmail(Email email);
	
	void addError(Email email);
	
	void updataError(Email email);
	
	void deleteError(Email email);
	
	boolean editEmail(Email email);
	
	boolean deleteEmail(@Param("femailaddress")String femailaddress);
	
	List<Email> getEmailHistory(@Param("dto") WeldDto dto);
}
