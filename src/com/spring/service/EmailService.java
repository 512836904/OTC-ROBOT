package com.spring.service;

import java.util.List;

import com.spring.dto.WeldDto;
import com.spring.model.Email;
import com.spring.page.Page;

public interface EmailService {
	/**
	 * 获取所有邮件信息
	 * @param str 拼接的where条件
	 * @return
	 */
	List<Email> getEmailAll(Page page,String str);
	
	/**
	 * 获取故障代码
	 * @param str 拼接的where条件
	 * @return
	 */
	List<Email> getErrorAll(Page page,String str);
	
	/**
	 * 获取所有故障代码
	 * @param str 拼接的where条件
	 * @return
	 */
	List<Email> getErrorShow(String str);
	
	/**
	 * 获取故障代码（导出）
	 * @param str 拼接的where条件
	 * @return
	 */
	List<Email> getErrorList(String str);
	
	/**
	 * 判断邮件地址是否存在
	 * @param femailaddress 邮件地址
	 * @return
	 */
	int getEmailAddressCount(String femailaddress);
	
	/**
	 * 判断故障代码是否存在
	 * @param femailaddress 邮件地址
	 * @return
	 */
	int getErrocount(String wid);
	
	/**
	 * 新增邮件
	 * @param email
	 * @return
	 */
	boolean addEmail(Email email);
	
	/**
	 * 新增故障代码
	 * @param email
	 * @return
	 */
	void addError(Email email);
	
	/**
	 * 修改故障代码
	 * @param email
	 * @return
	 */
	void updataError(Email email);
	
	/**
	 * 删除故障代码
	 * @param email
	 * @return
	 */
	void deleteError(Email email);
	
	/**
	 * 修改邮件
	 * @param email
	 * @return
	 */
	boolean editEmail(Email email);
	
	/**
	 * 删除邮件
	 * @param femailaddress
	 * @return
	 */
	boolean deleteEmail(String femailaddress);
	
	/**
	 * 获取所有邮件记录信息
	 * @param str 拼接的where条件
	 * @return
	 */
	List<Email> getEmailHistory(Page page, WeldDto dto);
}
