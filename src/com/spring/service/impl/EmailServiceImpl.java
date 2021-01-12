package com.spring.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.EmailMapper;
import com.spring.dto.WeldDto;
import com.spring.model.Email;
import com.spring.model.WeldingMachine;
import com.spring.page.Page;
import com.spring.service.EmailService;

@Service
@Transactional
public class EmailServiceImpl implements EmailService {
	@Autowired
	private EmailMapper em;
	
	@Override
	public List<Email> getEmailAll(Page page,String str) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return em.getEmailAll(str);
	}

	@Override
	public List<Email> getErrorAll(Page page,String str) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return em.getErrorAll(str);
	}
	
	@Override
	public List<Email> getErrorShow(String str) {
		return em.getErrorAll(str);
	}
	
	@Override
	public List<Email> getErrorList(String str) {
		return em.getErrorAll(str);
	}
	
	@Override
	public int getEmailAddressCount(String femailaddress) {
		return em.getEmailAddressCount(femailaddress);
	}

	@Override
	public int getErrocount(String wid) {
		return em.getErrocount(wid);
	}
	
	@Override
	public boolean addEmail(Email email) {
		return em.addEmail(email);
	}

	@Override
	public void addError(Email email) {
		em.addError(email);
	}
	
	@Override
	public void updataError(Email email) {
		em.updataError(email);
	}
	
	@Override
	public void deleteError(Email email) {
		em.deleteError(email);
	}
	
	@Override
	public boolean editEmail(Email email) {
		return em.editEmail(email);
	}

	@Override
	public boolean deleteEmail(String femailaddress) {
		return em.deleteEmail(femailaddress);
	}

	@Override
	public List<Email> getEmailHistory(Page page, WeldDto dto) {
		PageHelper.startPage(page.getPageIndex(), page.getPageSize());
		return em.getEmailHistory(dto);
	}
	
}
