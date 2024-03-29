<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>故障管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/datagrid.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
<!-- 	<script type="text/javascript" src="resources/js/insframework/insframeworktree.js"></script> -->
	<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
	<script type="text/javascript" src="resources/js/errorcode/errorcode.js"></script>
	<script type="text/javascript" src="resources/js/search/search.js"></script>
	
  </head>
  
  <body>
  	<div id="body">
	  	<div class="functiondiv">
			<div  style="float: left;">
				<label>故障代码：</label>
				<input class="easyui-textbox" name="error_code" id="error_code" />
				<a href="javascript:addError()" class="easyui-linkbutton" iconCls="icon-newadd">新增</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:importclick();" class="easyui-linkbutton" iconCls="icon-import">导入</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:exportErrors();" class="easyui-linkbutton" iconCls="icon-export">导出</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:Search();" class="easyui-linkbutton" iconCls="icon-select" >查找</a>
			</div>
		</div>
		<div id="importdiv" class="easyui-dialog" style="width:300px; height:200px;" closed="true">
			<form id="importfm" method="post" class="easyui-form" data-options="novalidate:true" enctype="multipart/form-data"> 
				<div>
					<span><input type="file" name="file" id="file"></span>
					<input type="button" value="上传" onclick="importWeldingMachine()" class="upButton"/>
				</div>
			</form>
		</div>
	    <table id="dg" style="table-layout: fixed; width:100%;"></table>
	    
	    <!-- 自定义多条件查询 -->
	    <div id="searchdiv" class="easyui-dialog" style="width:800px; height:400px;" closed="true" buttons="#searchButton" title="自定义条件查询">
	    	<div id="div0">
		    	<select class="fields" id="fields"></select>
		    	<select class="condition" id="condition"></select>
		    	<input class="content" id="content"/>
		    	<select class="joint" id="joint"></select>
		    	<a href="javascript:newSearchEmail();" class="easyui-linkbutton" iconCls="icon-add"></a>
		    	<a href="javascript:removeSerach();" class="easyui-linkbutton" iconCls="icon-remove"></a>
	    	</div>
	    </div>
	    <div id="searchButton">
			<a href="javascript:searchEmail();" class="easyui-linkbutton" iconCls="icon-ok">查询</a>
			<a href="javascript:close();" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>
	    <!-- 添加修改 -->
		<div id="dlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#dlg-buttons">
			<form id="fm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
				<div class="fitem">
					<lable>故障代码</lable>
					<input class="easyui-textbox" name="ferror_num" id="ferror_num" data-options="required:true"/>
				</div>
				<div class="fitem">
					<lable>故障原因</lable>
					<input type="hidden" id="oldemail"/>
					<input class="easyui-textbox" name="ferror_reason" id="ferror_reason" data-options="required:true"/>
				</div>
				<div class="fitem">
					<lable>故障排查</lable>
					<input class="easyui-textbox" name="ferror_solution" id="ferror_solution" data-options="required:true"/>
				</div>
				<div class="fitem">
					<lable>解决方式</lable>
					<input class="easyui-textbox" name="fcutways" id="fcutways" data-options="required:true"/>
				</div>
				<div class="fitem">
					<lable>故障重置</lable>
					<input class="easyui-textbox" name="freset" id="freset" data-options="required:true"/>
				</div>
				<div class="fitem">
					<lable>其它解决方式</lable>
					<input class="easyui-textbox" name="fother_way" id="fother_way" data-options="required:true"/>
				</div>
				<div class="fitem">
					<lable>故障复位</lable>
					<input class="easyui-textbox" name="ferrordis" id="ferrordis" data-options="required:true"/>
				</div>
			</form>
		</div>
		<div id="dlg-buttons">
			<a href="javascript:saveError();" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
			<a href="javascript:$('#dlg').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		
		<!-- 删除 -->
		<div id="rdlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#remove-buttons">
			<form id="rfm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
				<div class="fitem">
					<lable>故障代码</lable>
					<input class="easyui-textbox" name="ferror_num" id="ferror_num" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>故障原因</lable>
					<input type="hidden" id="oldemail"/>
					<input class="easyui-textbox" name="ferror_reason" id="ferror_reason" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>故障排查</lable>
					<input class="easyui-textbox" name="ferror_solution" id="ferror_solution" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>解决方式</lable>
					<input class="easyui-textbox" name="fcutways" id="fcutways" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>故障重置</lable>
					<input class="easyui-textbox" name="freset" id="freset" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>其它解决方式</lable>
					<input class="easyui-textbox" name="fother_way" id="fother_way" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>故障复位</lable>
					<input class="easyui-textbox" name="ferrordis" id="ferrordis" readonly="readonly"/>
				</div>
			</form>
		</div>
		<div id="remove-buttons">
			<a href="javascript:remove();" class="easyui-linkbutton" iconCls="icon-ok">删除</a>
			<a href="javascript:$('#rdlg').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
	</div>
  </body>
</html>
