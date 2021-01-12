package com.spring.service;

import java.math.BigInteger;
import java.util.List;

import com.spring.model.WeldingMachine;
import com.spring.page.Page;

public interface WeldingMachineService {
	
	/**
	 * 查询所有焊机信息:分页
	 */
	List<WeldingMachine> getWeldingMachineAll(Page page,BigInteger parent,String str);
	List<WeldingMachine> getRobot(Page page,BigInteger parent,String str);
	List<WeldingMachine> getcatWeldingMachineAll(Page page,BigInteger parent,String str);
	List<WeldingMachine> AllMachine(Page page,BigInteger parent);
	List<WeldingMachine> getRobotMachine(BigInteger parent);
	List<WeldingMachine> getRobotShow(BigInteger parent);
	List<WeldingMachine> getWeldRobot(BigInteger parent);
	/**
	 * 查询所有焊机信息
	 */
	List<WeldingMachine> getWeldingMachine(String str);
	
	/**
	 * 查询所有机器人信息
	 */
	List<WeldingMachine> getRobots(String str);
	
	/**
	 * 新增设备
	 */
	void addWeldingMachine(WeldingMachine wm);
	
	/**
	 * 新增机器人
	 */
	void addRobotWeld(WeldingMachine wm);
	
	/**
	 * 新增机器人
	 */
	void addRobot(WeldingMachine wm);
	
	/**
	 * 更新绑定设备
	 */
	void upweld(WeldingMachine wm);
	
	/**
	 * 获取设备组织机构
	 */
	List<WeldingMachine> getmachineins(BigInteger machin_id);
	
	/**
	 * cat新增焊机
	 */
	void addcatmachine(WeldingMachine wm);
	
	/**
	 * 修改设备
	 */
	void editWeldingMachine(WeldingMachine wm);
	
	/**
	 * 修改机器人信息
	 */
	void editRobot(WeldingMachine wm);
	
	/**
	 * 删除绑定的设备号
	 */
	void uodateOldCheck(BigInteger wid);
	
	/**
	 * cat修改焊机
	 */
	void editcatmachine(WeldingMachine wm);
	
	/**
	 * 查询所有焊机型号信息
	 */
	List<WeldingMachine> findAllweldmachine();
	
	List<WeldingMachine> findlweldmachinetype(BigInteger statusId);
	/**
	 * 厂商焊机型号绑定
	 */
	void addfactoryType(WeldingMachine wm);
	
	/**
	 * 删除旧厂商焊机型号绑定
	 */
	void deletefactory(BigInteger statusId);
	
	/**
	 * 删除旧机器人焊机型号绑定
	 */
	void deleteoldweld(BigInteger wid);
	
	/**
	 * 删除设备
	 * @param wid
	 */
	void deleteWeldingChine(BigInteger wid);
	
	/**
	 * cat删除设备
	 * @param wid
	 */
	void deletecatmachine(BigInteger wid);
	
	/**
	 * cat删除设备
	 * @param wid
	 */
	void deleteRobot(BigInteger wid);
	
	/**
	 * 删除对应的工艺记录
	 */
	void deleteHistory(BigInteger wid);
	/**
	 * 根据焊机编号查找id
	 * @return
	 */
	BigInteger getWeldingMachineByEno(String eno);
	
	/**
	 * 判断焊机编号是否存在
	 * @param eno
	 * @return
	 */
	int getEquipmentnoCount(String eno);
	
	/**
	 * 判断采集序号是否存在
	 * @param gatherid
	 * @return
	 */
	int getGatheridCount(BigInteger itemid,String gather);
	
	/**
	 * 根据id查找记录
	 * @param wid
	 * @return
	 */
	WeldingMachine getWeldingMachineById(BigInteger wid);
	
	/**
	 * 根据项目名称获取项目id
	 * @param name
	 * @return
	 */
	BigInteger getInsframeworkByName(String name);
	
	/**
	 * 获取某厂商下的焊机总数
	 * @param mid 厂商id
	 * @return
	 */
	BigInteger getMachineCountByManu(BigInteger mid,BigInteger id);
	List<WeldingMachine> getAllMachine();
	/**
	 * 根据组织机构获取对应焊机
	 */
	List<WeldingMachine> getMachineByIns(BigInteger id);
	
	/**
	 * 获取所有焊机及其对应的采集模块
	 * @return
	 */
	List<WeldingMachine> getMachineGather();
	
	/**
	 * 获取厂商对应的焊机型号
	 */
	List<WeldingMachine> getcatMachineModel(int type);
	
	/**
	 * 获取焊机及其对应的设备型号
	 */
	List<WeldingMachine> getMachineModel();
}