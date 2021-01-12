<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!-- <将整个页面的根路径设置为项目路径,包括下面的<base href="<%=basePath%>">。> -->


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>机器人生产数据</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/datagrid.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	
	<script type="text/javascript" src="resources/js/load.js"></script>
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
	<script type="text/javascript" src="resources/js/getTimeToHours.js"></script>
	<script type="text/javascript" src="resources/js//datastatistics/robotdata.js"></script>
  </head>
  
  <body>
    <div id="body">
		<div id="chartLoading" style="width:100%;height:100%;">
			<div id="chartShow" style="width:160px;" align="center"><img src="resources/images/load1.gif"/>数据加载中，请稍候...</div>
		</div>
	  	<div id="dg_btn">
			<div style="margin-bottom: 5px;">
				所属班组：
				<!-- select class="easyui-combobox" name="item" id="item" data-options="editable:false"></select-->
				<select class="easyui-combobox" id="item" data-options="editable:false"></select>
				<!--  select class="easyui-combobox" name="item" id="item" >
					<option value="OTC">OTC</option>
					<option value="ABB">ABB</option>
					<option value="KUKA">KUKA</option>
					<option value="YASKAWA">YASKAWA</option>
					<option value="FANUC">FANUC</option>
				</select-->
				时间：
				<input class="easyui-datetimebox" name="dtoTime1" id="dtoTime1">--
				<input class="easyui-datetimebox" name="dtoTime2" id="dtoTime2">
				<a href="javascript:search();" class="easyui-linkbutton" iconCls="icon-select" >搜索</a>
				<a href="javascript:exportToExcel();" class="easyui-linkbutton" iconCls="icon-export">导出</a>
			</div>
		</div>
	    <table id="dg" style="table-layout: fixed; width:100%;"></table>
    </div>
  </body>
</html>
