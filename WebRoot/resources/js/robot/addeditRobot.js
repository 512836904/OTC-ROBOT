$(function(){
	typeCombobox();
	InsframeworkCombobox();
	manuCombobox();
	statusRadio();
	//gatherCombobox();
	machineModel();
	//wmDatagrid();
	$("#iId").combobox({
        onChange:function(){  
        	itemid = $("#iId").combobox("getValue");
        	wmDatagrid();
        	//gatherCombobox();
//        	if(selectRow!=null){
//    			var str = $("#gid").html();
//    			str += "<option value=\"" + selectRow.gid + "\" >"  
//    			        + selectRow.gatherId + "</option>";
//    			$("#gid").html(str);
//    			$("#gid").combobox();
//    			$("#gid").combobox("select", selectRow.gid);
//        	}
        } 
     });
	$('#dlg').dialog( {
		onClose : function() {
			$('#iId').combobox('clear');
			$('#manuno').combobox('clear');
			$('#tId').combobox('clear');
			$('#gid').combobox('clear');
			$("#fm").form("disableValidation");
		}
	})
	$("#fm").form("disableValidation");
})


var url = "";
var flag = 1;
var itemid = "";
function addWeldingMachine(){
	flag = 1;
	$('#fm').form('clear');
	$('#dlg').window( {
		title : "新增机器人",
		modal : true
	});
	$('#dlg').window('open');
	InsframeworkCombobox();
	var itemid =  $('#iId').combobox('getValue');
	wmDatagrid1();
	var isnetworkingId = document.getElementsByName("isnetworkingId");
	var statusId = document.getElementsByName("statusId");
	isnetworkingId[0].checked =  'checked';
	statusId[0].checked =  'checked';
	url = "weldingMachine/addRobot";
}

function editWeldingMachine(){
	flag = 2;
	$('#fm').form('clear');
	var row = $('#weldingmachineTable').datagrid('getSelected');
	selectRow = row;
	if (row) {
		$('#dlg').window( {
			title : "修改机器人设备",
			modal : true
		});
		$('#dlg').window('open');
		$('#valideno').val(row.equipmentNo);
		$('#validgid').val(row.gatherId);
		$('#validinsf').val(row.iId);
		$('#fm').form('load', row);
		var itemid =  $('#iId').combobox('getValue');
		wmDatagrid();
		url = "weldingMachine/editRobot?wid="+row.id;
	}
}

//提交
function saveWeldingMachine(){
	var tid = $('#tId').combobox('getValue');
	var iid = $('#iId').combobox('getValue');
	//var gatherId = $('#gid').combobox('getValue');
	var manuno = $('#manuno').combobox('getValue');
	var sid = $("input[name='statusId']:checked").val();
	var isnetworking = $("input[name='isnetworking']:checked").val();
	var model = $('#model').combobox('getValue');
	var messager = "";
	var url2 = "";
	var rows = $('#tt').datagrid('getSelections');
	var str="";
		for(var i=0; i<rows.length; i++){
			str += rows[i].id+",";
		}
	if(flag==1){
		messager = "新增成功！";
		url2 = url+"?tId="+tid+"&iId="+iid+"&sId="+sid+"&isnetworking="+isnetworking+"&manuno="+manuno+"&model="+model+"&str="+str;
	}else{
		messager = "修改成功！";
		url2 = url+"&tId="+tid+"&iId="+iid+"&sId="+sid+"&isnetworking="+isnetworking+"&manuno="+manuno+"&model="+model+"&str="+str;
	}
	$('#fm').form('submit', {
		url : url2,
		onSubmit : function() {
			return $(this).form('enableValidation').form('validate');
		},
		success : function(result) {
			if(result){
				var result = eval('(' + result + ')');
				if (!result.success) {
					$.messager.show( {
						title : 'Error',
						msg : result.errorMsg
					});
				}else{
					$.messager.alert("提示", messager);
					$('#dlg').dialog('close');
					$('#weldingmachineTable').datagrid('reload');
					//$('#ro').datagrid('reload');
//					var url = "weldingMachine/goWeldingMachine";
//					var img = new Image();
//				    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
//				    url = img.src;  // 此时相对路径已经变成绝对路径
//				    img.src = null; // 取消请求
//					window.location.href = encodeURI(url);
					$("#valideno").val("");
					$("#validgid").val("");
					$("#valideid").val("");
				}
			}
			
		},  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    } 
	});
}
function change(){
	$("#iId").combobox({
		onChange : function(newValue,oldValue){
		var itemid =  $('#iId').combobox('getValue');
		wmDatagrid();
		}
		});
}
function wmDatagrid(){
	var urls="";
	var row = $('#weldingmachineTable').datagrid('getSelected');
	if(flag==1){
		urls="weldingMachine/getWeldmachine?itemid="+itemid;
	}else{
		urls="weldingMachine/getAllRole1?id="+row.id+"&itemid="+itemid;
	}
	$("#tt").datagrid( {
		fitColumns : true,
		height : '250px',
		width : '80%',
		idField : 'id',
		url : urls,
		rownumbers : false,
		showPageList : false,
		checkOnSelect:true,
		selectOnCheck:true,
		columns : [ [ {
		    field:'ck',
			checkbox:true
		},{
			field : 'id',
			title : 'id',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		},{
			field : 'equipmentNo',
			title : '焊机编号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'failnum',
			title : '设备绑定状态',
			width : 150,
			halign : "center",
			align : "left",
			formatter: function(value,row,index){
					var str = "";
					if(row.check==0){
						str += '<a id="no" class="easyui-linkbutton"/>';
					}
					if(row.check==1){
						str += '<a id="yes" class="easyui-linkbutton"/>';
					}
					return str;
				}
		}]],
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
		},
		onBeforeLoad:function(data){
			 $('#tt').datagrid('clearChecked');
		},
		onLoadSuccess:function(data){
			 if(data){
				 $.each(data.rows, function(index, item){
					 if(item.symbol==1){
				         $('#tt').datagrid('checkRow', index);
					 }
					 if(item.failnum==0){
						 $("a[id='no']").linkbutton({text:'未绑定设备',plain:true,iconCls:'icon-help'});
					 }
				 })
			 }
			 if($("#no").length!=0){
					$("a[id='no']").linkbutton({text:'未绑定设备',plain:true,iconCls:'icon-help'});
				}
				if($("#yes").length!=0){
					$("a[id='yes']").linkbutton({text:'已绑定其它设备',plain:true,iconCls:'icon-ok'});
				}
		}
	});
}

function wmDatagrid1(){
	var urls="";
	urls="weldingMachine/getWeldmachine?itemid="+itemid;
	$("#tt").datagrid( {
		fitColumns : true,
		height : '250px',
		width : '80%',
		idField : 'id',
		url : urls,
		rownumbers : false,
		showPageList : false,
		checkOnSelect:true,
		selectOnCheck:true,
		columns : [ [ {
		    field:'ck',
			checkbox:true
		},{
			field : 'id',
			title : 'id',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		},{
			field : 'equipmentNo',
			title : '焊机编号',
			width : 100,
			halign : "center",
			align : "left"
		}]],
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
		},
		onBeforeLoad:function(data){
			 $('#tt').datagrid('clearChecked');
		},
	});
}

//设备类型
function typeCombobox(){
	$.ajax({  
        type : "post",  
        async : false,
        url : "weldingMachine/getTypeAll",  
        data : {},  
        dataType : "json", //返回数据形式为json  
        success : function(result) {
            if (result) {
                var optionStr = '';  
                for (var i = 0; i < result.ary.length; i++) { 
                    optionStr += "<option value=\"" + result.ary[i].id + "\" >"  
                            + result.ary[i].name + "</option>";  
                } 
                $("#tId").append(optionStr);
            }  
        },  
        error : function(errorMsg) {  
            alert("数据请求失败，请联系系统管理员!");  
        }  
   }); 
	$("#tId").combobox();
}

//所属项目
function InsframeworkCombobox(){
	$.ajax({  
      type : "post",  
      async : false,
      url : "weldingMachine/getInsframeworkAll",  
      data : {},  
      dataType : "json", //返回数据形式为json  
      success : function(result) {  
          if (result) {
              var optionStr = '';
              for (var i = 0; i < result.ary.length; i++) {  
                  optionStr += "<option value=\"" + result.ary[i].id + "\" >"  
                          + result.ary[i].name + "</option>";
              }
              $("#iId").html(optionStr);
              $("#iId").combobox();
              $("#iId").combobox('select',result.ary[0].id);
          }  
      },  
      error : function(errorMsg) {  
          alert("数据请求失败，请联系系统管理员!");  
      }  
	}); 
}

//厂商
function manuCombobox(){
	$.ajax({  
	  type : "post",  
	  async : false,
	  url : "weldingMachine/getManuAll",  
	  data : {},  
	  dataType : "json", //返回数据形式为json  
	  success : function(result) {  
	      if (result) {
	          var optionStr = '';
	          for (var i = 0; i < result.ary.length; i++) {  
	              optionStr += "<option value=\"" + result.ary[i].id + "\" >"  
	                      + result.ary[i].name + "</option>";
	          }
	          $("#manuno").html(optionStr);
	      }  
	  },  
	  error : function(errorMsg) {  
	      alert("数据请求失败，请联系系统管理员!");  
	  }  
	}); 
	$("#manuno").combobox();
}

//焊机状态
function statusRadio(){
	$.ajax({  
	    type : "post",  
	    async : false,
	    url : "weldingMachine/getStatusAll",  
	    data : {},  
	    dataType : "json", //返回数据形式为json  
	    success : function(result) {
	    	if (result) {
	    		var str = "";
	    		for (var i = 0; i < result.ary.length; i++) {
	    			str += "<input type='radio' class='radioStyle' name='statusId' id='sId' value=\"" + result.ary[i].id + "\" />"  
                    + result.ary[i].name;
	    		}
	            $("#radios").html(str);
	            $("input[name='statusId']").eq(0).attr("checked",true);
	        }  
	    },  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    }  
	});
}

//设备型号
function machineModel(){
	$("#manuno").combobox({
		onChange : function(newValue,oldValue){
			$('#model').combobox('clear');
			$.ajax({  
			    type : "post",  
			    async : false,
			    url : "weldingMachine/getModelAll?str="+newValue,  
			    data : {},  
			    dataType : "json", //返回数据形式为json  
			    success : function(result) {  
			        if (result) {
			        	if(result.ary.length!=0){
			        		var boptionStr = '';
			                for (var i = 0; i < result.ary.length; i++) {  
			                    boptionStr += "<option value=\"" + result.ary[i].id + "\" >"  
			                            + result.ary[i].name + "</option>";
			                }
			                $("#model").html(boptionStr);
				        	$("#model").combobox();
				        	$("#model").combobox('select',result.ary[0].id);
			        	}
			        }  
			    },  
			    error : function(errorMsg) {  
			        alert("数据请求失败，请联系系统管理员!");  
			    }  
				}); 
		}
	})
}
