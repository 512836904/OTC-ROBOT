package com.spring.model;

import java.math.BigInteger;

public class Email {
	private BigInteger fid;
	private String femailname;
	private String femailaddress;
	private String 	femailtype;
	private String femailtext;
	private String femailtime;
	
	private String ferror_num;
	private String ferror_reason;
	private String ferror_solution;
	private String fcutways;
	private String freset;
	private String fother_way;
	private String ferrordis;
	
	public BigInteger getFid() {
		return fid;
	}
	public void setFid(BigInteger fid) {
		this.fid = fid;
	}
	public String getFemailname() {
		return femailname;
	}
	public void setFemailname(String femailname) {
		this.femailname = femailname;
	}
	public String getFemailaddress() {
		return femailaddress;
	}
	public void setFemailaddress(String femailaddress) {
		this.femailaddress = femailaddress;
	}
	public String getFemailtype() {
		return femailtype;
	}
	public void setFemailtype(String femailtype) {
		this.femailtype = femailtype;
	}
	public String getFemailtext() {
		return femailtext;
	}
	public void setFemailtext(String femailtext) {
		this.femailtext = femailtext;
	}
	public String getFemailtime() {
		return femailtime;
	}
	public void setFemailtime(String femailtime) {
		this.femailtime = femailtime;
	}
	public String getFerror_num() {
		return ferror_num;
	}
	public void setFerror_num(String ferror_num) {
		this.ferror_num = ferror_num;
	}
	public String getFerror_reason() {
		return ferror_reason;
	}
	public void setFerror_reason(String ferror_reason) {
		this.ferror_reason = ferror_reason;
	}
	public String getFerror_solution() {
		return ferror_solution;
	}
	public void setFerror_solution(String ferror_solution) {
		this.ferror_solution = ferror_solution;
	}
	public String getFreset() {
		return freset;
	}
	public void setFreset(String freset) {
		this.freset = freset;
	}
	public String getFother_way() {
		return fother_way;
	}
	public void setFother_way(String fother_way) {
		this.fother_way = fother_way;
	}
	public String getFerrordis() {
		return ferrordis;
	}
	public void setFerrordis(String ferrordis) {
		this.ferrordis = ferrordis;
	}
	public String getFcutways() {
		return fcutways;
	}
	public void setFcutways(String fcutways) {
		this.fcutways = fcutways;
	}
	
}
