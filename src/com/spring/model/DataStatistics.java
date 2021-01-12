package com.spring.model;

import java.math.BigInteger;

public class DataStatistics {
	private BigInteger id;
	private BigInteger insid;
	private String name;
	private String insname;
	private int total;
	private int num;
	private String wireweight;
	private double speed;
	private double airflow;
	private double standbypower;
	private int machinenum;
	private String robotnum;
	private int junctionnum;
	private BigInteger worktime; 
	private double voltage;
	private double electricity;
	private String serialnumber;
	private String valuename;
	private String time;
	private double hour;
	private String welderno;
	private double wirefeedrate;
	private BigInteger frequencies;
	private BigInteger standbytime;
	private BigInteger powerconsumption;
	
	
	
	public double getWirefeedrate() {
		return wirefeedrate;
	}
	public void setWirefeedrate(double wirefeedrate) {
		this.wirefeedrate = wirefeedrate;
	}
	public double getHour() {
		return hour;
	}
	public void setHour(double hour) {
		this.hour = hour;
	}
	public String getWelderno() {
		return welderno;
	}
	public void setWelderno(String welderno) {
		this.welderno = welderno;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getValuename() {
		return valuename;
	}
	public void setValuename(String valuename) {
		this.valuename = valuename;
	}
	public String getSerialnumber() {
		return serialnumber;
	}
	public void setSerialnumber(String serialnumber) {
		this.serialnumber = serialnumber;
	}
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public BigInteger getInsid() {
		return insid;
	}
	public void setInsid(BigInteger insid) {
		this.insid = insid;
	}
	public String getInsname() {
		return insname;
	}
	public void setInsname(String insname) {
		this.insname = insname;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getWireweight() {
		return wireweight;
	}
	public void setWireweight(String wireweight) {
		this.wireweight = wireweight;
	}
	public double getSpeed() {
		return speed;
	}
	public void setSpeed(double speed) {
		this.speed = speed;
	}
	public double getAirflow() {
		return airflow;
	}
	public void setAirflow(double airflow) {
		this.airflow = airflow;
	}
	public double getStandbypower() {
		return standbypower;
	}
	public void setStandbypower(double standbypower) {
		this.standbypower = standbypower;
	}
	public int getMachinenum() {
		return machinenum;
	}
	public void setMachinenum(int machinenum) {
		this.machinenum = machinenum;
	}
	public String getRobotnum(){
		return robotnum;
	}
	public void setRobotnum(String robotnum) {
		this.robotnum = robotnum;
	}
	public int getJunctionnum() {
		return junctionnum;
	}
	public void setJunctionnum(int junctionnum) {
		this.junctionnum = junctionnum;
	}
	public BigInteger getWorktime() {
		return worktime;
	}
	public void setWorktime(BigInteger worktime) {
		this.worktime = worktime;
	}
	public double getVoltage() {
		return voltage;
	}
	public void setVoltage(double voltage) {
		this.voltage = voltage;
	}
	public double getElectricity() {
		return electricity;
	}
	public void setElectricity(double electricity) {
		this.electricity = electricity;
	}
	public BigInteger getFrequencies() {
		return frequencies;
	}
	public void setFrequencies(BigInteger frequencies) {
		this.frequencies = frequencies;
	}
	public BigInteger getStandbytime() {
		return standbytime;
	}
	public void setStandbytime(BigInteger standbytime) {
		this.standbytime = standbytime;
	}
	public BigInteger getPowerconsumption() {
		return powerconsumption;
	}
	public void SetPowerconsumption(BigInteger powerconsumption) {
		this.powerconsumption = powerconsumption;
	}
}
