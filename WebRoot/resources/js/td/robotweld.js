/**
 * 
 */
function back() {
	var url = "td/AllTd";
	var img = new Image();
	img.src = url; // 设置相对路径给Image, 此时会发送出请求
	url = img.src; // 此时相对路径已经变成绝对路径
	img.src = null; // 取消请求
	window.location.href = url;
}
;

var historytime;
var codemessage;
var machine = new Array();
var time = new Array();
var ele = new Array();
var vol = new Array();
var machstatus = new Array();
var work = new Array();
var wait = new Array();
var worktime = new Array();
var dglength;
var websocketURL;
var welderName;
var taskNum;
var taskNums;
var symbol = 0;
var symbol1 = 0;
var sym = 0;
var timerele;
var timervol;
var socket;
var redata;
var rowdex = 0;
var maxele = 0;
var minele = 0;
var maxvol = 0;
var minvol = 0;
var presetele=0;
var presetvol=0;
var rows;
var fmch;
var tongdao;
var sint = 0;
var series;
var chart;
var series1;
var chart1;
var time1 = 0,time2 = 0;
var led = [ "0,1,2,4,5,6", "2,5", "0,2,3,4,6", "0,2,3,5,6", "1,2,3,5", "0,1,3,5,6", "0,1,3,4,5,6", "0,2,5", "0,1,2,3,4,5,6", "0,1,2,3,5,6" ];
var formercode = 0;
var tableFlag = 3; 
$(function() {
	//$("#l1").css("color", "#000000");
	var imgnum = $("#type").val();
	var manuturer =$("#form").val();
	$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"3.png");
	var livewidth = $("#livediv").width() * 0.9;
	var liveheight = $("#livediv").height()*0.45;
	$("#body31").width(livewidth);
	$("#body31").height(liveheight);
	$("#body32").width(livewidth);
	$("#body32").height(liveheight);
	var form = $("#form").val();
	if(form != 45){
		document.getElementById("typediv1").style.display="none";
		document.getElementById("typediv2").style.display="none";
		document.getElementById("cxk").style.display="none";
		document.getElementById('livediv').style.width = document.documentElement.clientWidth + 'px';
	}
	var width = $("#treeDiv").width();
	$(".easyui-layout").layout({
		onCollapse : function() {
			$("#dg").datagrid({
				height : $("#body").height(),
				width : $("#body").width()
			})
		},
		onExpand : function() {
			$("#dg").datagrid({
				height : $("#body").height(),
				width : $("#body").width()
			})
		}
	});
	$("#myTree").tree({
		onClick : function(node) {
			$("#dg").datagrid('load', {
				"parent" : node.id
			})
		}
	})
	$.ajax({
		type : "post",
		async : false,
		url : "td/AllTdbf",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				websocketURL = result.web_socket;
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	
	$.ajax({
		type : "post",
		async : false,
		url : "td/getLiveWelder",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				welderName = eval(result.rows);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	$.ajax({
		type : "post",
		async : false,
		url : "weldedjunction/getWeldTask",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				taskNum = eval(result.rows);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	$.ajax({
		type : "post",
		async : false,
		url : "hierarchy/getErrorShow",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				taskNums = eval(result.rows); //查找故障表，将故障代码的和对应故障原因等数据保存在taskNums中
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	//dgDatagrid();
	//获取工作、焊接时间以及设备类型
//	$.ajax({
//		type : "post",
//		async : false,
//		url : "td/getLiveTime?machineid="+$("#machineid").val(),
//		data : {},
//		dataType : "json", //返回数据形式为json  
//		success : function(result) {
//			if (result) {
//				worktime = eval(result);
//				if(worktime.worktime!=null && worktime.worktime!=''){
//					time1 = worktime.worktime;
//				}
//				if(worktime.time!=null && worktime.time!=''){
//					time2 = worktime.time;
//				}
//				var t1 = secondToDate(time1);
//			    $("#r3").html(t1);
//			    var t2 = secondToDate(time2);
//			    $("#r4").html(t2);
//			}
//		},
//		error : function(errorMsg) {
//			alert("数据请求失败，请联系系统管理员!");
//		}
//	});
//	websocket();
	mqttTest();

	function serach(){
		var timebuf = historytime;
		if(null != timebuf){
			var date = new Date().getTime();
			if(date - timebuf > 60000){
				$("#l5").val("关  机");
				$("#l5").css("background-color", "#818181");
				$("#mrjpg").attr("src", "resources/images/welder_73.png");
			}
		}
	}
	setInterval(serach,60000);// 注意函数名没有引号和括弧！
	
})

var client,clientId;
function mqttTest(){
	clientId = Math.random().toString().substr(3,8) + Date.now().toString(36);
	client = new Paho.MQTT.Client(websocketURL.split(":")[0], parseInt(websocketURL.split(":")[1]), clientId);
	var options = {
        timeout: 5,  
        keepAliveInterval: 60,  
        cleanSession: false,  
        useSSL: false,  
        onSuccess: onConnect,  
        onFailure: function(e){  
            console.log(e);  
        },
        reconnect : true
	}
	
	//set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;

	//connect the client
	client.connect(options);
}

//called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("onConnect");
//	client.publish('/public/TEST/SHTH', 'SHTHCS', 0, false);
//	client.subscribe("weldmes-realdata", {
//			qos: 0,
//			onSuccess:function(e){  
//	            console.log("订阅成功");  
//				var loadingMask = document.getElementById('loadingDiv');
//				loadingMask.parentNode.removeChild(loadingMask);
//	        },
//	        onFailure: function(e){  
//	            console.log(e);  
//				var loadingMask = document.getElementById('loadingDiv');
//				loadingMask.parentNode.removeChild(loadingMask);
//	        }
//		})
	client.subscribe("weldmes-robootdata", {
			qos: 0,
			onSuccess:function(e){  
	            console.log("订阅成功");  
				var loadingMask = document.getElementById('loadingDiv');
				loadingMask.parentNode.removeChild(loadingMask);
	        },
	        onFailure: function(e){  
	            console.log(e);  
				var loadingMask = document.getElementById('loadingDiv');
				loadingMask.parentNode.removeChild(loadingMask);
	        }
		})
}

//called when the client loses its connection
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:"+responseObject.errorMessage);
	}
}

//called when a message arrives
function onMessageArrived(message) {
//	console.log("onMessageArrived:"+message.payloadString);
	redata = message.payloadString;
	iview();
/*	message = new Paho.MQTT.Message("1");
	message.destinationName = "api2";
	client.send(message);*/
}

function elecurve() {
	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});

	$('#body31').highcharts({
		chart : {
			type : 'spline',
			animation : false, // don't animate in old IE
			marginRight : 70,
			events : {
				load : function() {
					// set up the updating of the chart each second
					series = this.series[0],
					chart = this
//					timerele = window.setInterval(function() {}, 1000);
				}
			}
		},
		title : {
			text : ''
		},
		xAxis : {
			type : 'datetime',
			tickPixelInterval : 150,
			lineColor : '#FFFFFF',
			tickWidth : 0,
			labels : {
				enabled : false
			}
		},
		yAxis : [ {
			max : 500, // 定义Y轴 最大值  
			min : 0, // 定义最小值  
			minPadding : 0.2,
			maxPadding : 0.2,
			tickInterval : 100,
			color : '#A020F0',
			title : {
				text : '',
				style : {
					color : '#A020F0'
				}
			}
		} ],
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/>' +
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S.%L', this.x) + '<br/>' +
					Highcharts.numberFormat(this.y, 2);
			}
		},
		legend : {
			enabled : false
		},
		exporting : {
			enabled : false
		},
		credits : {
			enabled : false // 禁用版权信息
		},
		series : [ {
			color : '#A020F0',
			name : '电流',

			data : (function() {
				// generate an array of random data
				var data = [],
					/*time = new Date(Date.parse("0000-00-00 00:00:00")),*/
					i;
				for (i = -19; i <= 0; i += 1) {
					data.push({
						x : time[0] - 1000 + i * 1000,
						/*x: time + i*1000,*/
						y : 0
					});
				}
				return data;
			}())
		} ]
	}, function(c) {
		activeLastPointToolip(c)
	});

	activeLastPointToolip(chart);
}

function volcurve() {
	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});

	$('#body32').highcharts({
		chart : {
			type : 'spline',
			animation : false, // don't animate in old IE
			marginRight : 70,
			events : {
				load : function() {
					// set up the updating of the chart each second
					series1 = this.series[0],
					chart1 = this;
				}
			}
		},
		title : {
			text : false
		},
		xAxis : {
			type : 'datetime',
			tickPixelInterval : 150 /*,
	  		        tickWidth:0,
		  		    labels:{
		  		    	enabled:false
		  		    }*/
		},
		yAxis : [ {
			max : 100, // 定义Y轴 最大值  
			min : 0, // 定义最小值  
			minPadding : 0.2,
			maxPadding : 0.2,
			tickInterval : 20,
			color : '#87CEFA',
			title : {
				text : '',
				style : {
					color : '#87CEFA'
				}
			}
		} ],
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/>' +
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S.%L', this.x) + '<br/>' +
					Highcharts.numberFormat(this.y, 2);
			}
		},
		legend : {
			enabled : false
		},
		exporting : {
			enabled : false
		},
		credits : {
			enabled : false // 禁用版权信息
		},
		series : [ {
			name : '电压',
			data : (function() {
				// generate an array of random data
				var data = [],
					/*			                time = new Date(Date.parse("0000-00-00 00:00:00")),*/
					i;
				for (i = -19; i <= 0; i += 1) {
					data.push({
						x : time[0] - 1000 + i * 1000,
						y : 0
					});
				}
				return data;
			}())
		} ]
	}, function(c) {
		activeLastPointToolip1(c)
	});

	activeLastPointToolip1(chart1);

}
function iview() {
	var z = 0;
	time.length = 0;
	vol.length = 0;
	ele.length = 0;
	if(redata.length==297 || redata.length%99==0){
		
		for (var i = 0; i < redata.length; i += 99) {
            $("#tBody").append('<tr>'+tr+'</tr>');
			//				if(redata.substring(8+i, 12+i)!="0000"){
			if (parseInt(redata.substring(4 + i, 8 + i),10) == $("#machineid").val()) {
				
				historytime = new Date().getTime();
				
				time1++;
			    var t1 = secondToDate(time1);
			    $("#r3").html(t1);
			    if(redata.substring(36 + i, 38 + i)!="00"){
				    time2++;
				    var t2 = secondToDate(time2);
				    $("#r4").html(t2);
			    }
				var ttme = redata.substring(54 + i, 75 + i);

				//						time.push(Date.parse(redata.substring(20+i, 39+i)));
				ttme = ttme.replace(/-/g, '/');
//				time.push(Date.parse(new Date(ttme)));
				time.push((new Date(ttme)).getTime());
			    $("#r8").html(parseFloat((parseInt(redata.substring(95 + i, 99 + i), 10)/10).toFixed(1)) + " m/min");
				machstatus.push(redata.substring(36 + i, 38 + i));
				if(parseInt(redata.substring(32+i, 36+i),10)==137){
					ele.push(parseFloat((parseInt(redata.substring(38 + i, 42 + i), 10) / 10).toFixed(1)));
					maxele = parseFloat((parseInt(redata.substring(75 + i, 79 + i), 10) / 10).toFixed(1));
					minele = parseFloat((parseInt(redata.substring(79 + i, 83 + i), 10) / 10).toFixed(1));
					presetele = parseFloat((parseInt(redata.substring(46 + i, 50 + i), 10) / 10).toFixed(1));
					$("#c1").html(parseFloat((parseInt(redata.substring(38 + i, 42 + i), 10) / 10).toFixed(1)));
					$("#r10").html(parseFloat((parseInt(redata.substring(38 + i, 42 + i), 10) / 10).toFixed(1))*parseFloat((parseInt(redata.substring(42 + i, 46 + i), 10) / 10).toFixed(1))+" W");
				}else{
					ele.push(parseInt(redata.substring(38 + i, 42 + i), 10));
					maxele = parseInt(redata.substring(75 + i, 79 + i), 10);
					minele = parseInt(redata.substring(79 + i, 83 + i), 10);
					presetele = parseInt(redata.substring(46 + i, 50 + i), 10);
					$("#c1").html(parseInt(redata.substring(38 + i, 42 + i), 10));
					$("#r10").html(parseInt(redata.substring(38 + i, 42 + i), 10)*parseFloat((parseInt(redata.substring(42 + i, 46 + i), 10) / 10).toFixed(1))+" W");
				}
				vol.push(parseFloat((parseInt(redata.substring(42 + i, 46 + i), 10) / 10).toFixed(1)));
				maxvol = parseFloat((parseInt(redata.substring(83 + i, 87 + i), 10) / 10).toFixed(1));
				minvol = parseFloat((parseInt(redata.substring(87 + i, 91 + i), 10) / 10).toFixed(1));
				presetvol = parseFloat((parseInt(redata.substring(50 + i, 54 + i), 10) / 10).toFixed(1));
				if (symbol == 0) {
					elecurve();
					volcurve();
					symbol++;
				}
				$("#l4").html("--");
				$("#l3").html("--");
				$("#r13").html(presetele + " A");
				$("#r14").html(presetvol + " v");
				$("#c2").html(parseFloat((parseInt(redata.substring(42 + i, 46 + i), 10) / 10).toFixed(1)));
//				$("#r6").html(parseInt(redata.substring(91 + i, 95 + i), 10));
				for (var k = 0; k < welderName.length; k++) {
					if (welderName[k].fid == parseInt(redata.substring(0 + i, 4 + i),10)) {
						$("#l4").html(welderName[k].fwelder_no);
					}
				}
				for (var t = 0; t < taskNum.length; t++) {
					if (taskNum[t].id == parseInt(redata.substring(12 + i, 16 + i),10)) {
						$("#l3").html(taskNum[t].weldedJunctionno);
					}
				}
				if(parseInt(redata.substring(91 + i, 95 + i),10)==255){
					$("#r6").html("自由调节状态");
				}else{
					$("#r6").html(parseInt(redata.substring(91 + i, 95 + i), 10));
				}
				$("#l2").html(worktime.machineno);
				var imgnum = $("#type").val();
				if (time.length != 0 && z < time.length) {
					var mstatus = redata.substring(36 + i, 38 + i);
					switch (mstatus) {
					case "00":
						$("#l5").val("待机");
						$("#l5").css("background-color", "#55a7f3");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"1.png");
						break;
					case "01":
						$("#l5").val("E-010 焊枪开关OFF等待");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "02":
						$("#l5").val("E-000工作停止");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "03":
						$("#l5").val("焊接");
						$("#l5").css("background-color", "#7cbc16");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"0.png");
						break;
					case "04":
						$("#l5").val("电流过低");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "05":
						$("#l5").val("收弧");
						$("#l5").css("background-color", "#7cbc16");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"0.png");
						break;
					case "06":
						$("#l5").val("电流过高");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "07":
						$("#l5").val("启弧");
						$("#l5").css("background-color", "#7cbc16");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"0.png");
						break;
					case "08":
						$("#l5").val("电压过低");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "09":
						$("#l5").val("电压过高");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "10":
						$("#l5").val("E-100控制电源异常");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "15":
						$("#l5").val("E-150一次输入电压过高");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "16":
						$("#l5").val("E-160一次输入电压过低");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "20":
						$("#l5").val("E-200一次二次电流检出异常");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "21":
						$("#l5").val("E-210电压检出异常");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "22":
						$("#l5").val("E-220逆变电路反馈异常");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "30":
						$("#l5").val("E-300温度异常");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "70":
						$("#l5").val("E-700输出过流异常");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "71":
						$("#l5").val("E-710输入缺相异常");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "98":
						$("#l5").val("超规范停机");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					case "99":
						$("#l5").val("超规范报警");
						$("#l5").css("background-color", "#fe0002");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"2.png");
						break;
					}
					var x = time[z],
						y = ele[z],
						v = vol[z];
					if (z == 0) {
						series.addPoint([ x, y ], true, true);
						activeLastPointToolip(chart);
						series1.addPoint([ x, v ], true, true);
						activeLastPointToolip1(chart1);
	
					} else {
						if (x > time[z - 1]) {
							series.addPoint([ x, y ], true, true);
							activeLastPointToolip(chart);
							series1.addPoint([ x, v ], true, true);
							activeLastPointToolip1(chart1);
						}
					}
				}
			}
			//				}
			z++;
		}
	}else{//机器人数据执行此部分
		for (var i = 0; i < redata.length; i += 73) {
			//				if(redata.substring(8+i, 12+i)!="0000"){
			if (parseInt(redata.substring(0 + i, 4 + i),10) == $("#machineid").val()) {   //将接收到的数据的设备id和页面设备id相比较，相同则更新页面显示	
				historytime = new Date().getTime();
				time1++;
			    var t1 = secondToDate(time1);
			    $("#r3").html(t1);//显示工作时长
			    if(redata.substring(36 + i, 38 + i)!="00"){
				    time2++;
				    var t2 = secondToDate(time2);
				    $("#r4").html(t2); //显示焊接时长
			    }
				var ttme = redata.substring(22 + i, 43 + i);
				var aaa = ttme.substring(0,ttme.length-2);
				//time.push(Date.parse(redata.substring(20+i, 39+i)));
				ttme = ttme.replace(/-/g, '/');
//				time.push(Date.parse(new Date(ttme)));
				time.push((new Date(ttme)).getTime());
			    $("#r8").html(parseFloat((parseInt(redata.substring(43 + i, 47 + i), 10)/10).toFixed(1)) + " cm/min");//显示送丝速度
				machstatus.push(redata.substring(4 + i, 6 + i));   //焊接状态
				ele.push(parseInt(redata.substring(6 + i, 10 + i), 10));  //实时电流
				presetele = parseInt(redata.substring(14 + i, 18 + i), 10);   //预设电流
				
				$("#c1").html(parseInt(redata.substring(6 + i, 10 + i), 10));  //显示焊接主要参数实时电流
				$("#c2").html(parseFloat((parseInt(redata.substring(10 + i, 14 + i), 10) / 10).toFixed(1)));//显示焊接主要参数实时电压
				$("#r10").html(parseInt(redata.substring(6 + i, 10 + i), 10)*parseFloat((parseInt(redata.substring(10 + i, 14 + i), 10) / 10).toFixed(1))+" W");//显示瞬时功率
				
				vol.push(parseFloat((parseInt(redata.substring(10 + i, 14 + i), 10) / 10).toFixed(1))); //实时电压
				presetvol = parseFloat((parseInt(redata.substring(18 + i, 22 + i), 10) / 10).toFixed(1));//预设电压
				if (symbol == 0) {
					elecurve();
					volcurve();
					symbol++;
				}
				$("#l4").html("--");//显示操作人员
				$("#l3").html("--");//显示任务编号
				$("#r13").html(presetele);//显示预置电流
				$("#r14").html(presetvol);//显示预置电压		
				
				//************新增
				var cycletimes = parseInt(redata.substring(57 + i, 61 + i), 10);
				var weldspeed = parseInt(redata.substring(61 + i, 65 + i), 10);
				var presetwirefeedrate = parseInt(redata.substring(65 + i, 69 + i), 10);
				var airofflow = parseInt(redata.substring(69 + i, 73 + i), 10);
				$("#r88").html(cycletimes); //显示循环次数
				$("#r99").html(weldspeed + " cm/min"); //显示焊接速度
				$("#r7").html(presetwirefeedrate + " cm/min");//显示与设定的送丝速度
				$("#r9").html(airofflow + " L/min");//显示与设定的送丝速度
				var code = parseInt(redata.substring(47 + i, 51 + i), 10); //故障代码
				//查找对比实时接收到的故障代码coda，查找taskNums中的原因
				for (var t = 0; t < taskNums.length; t++) {
					if (taskNums[t].ferror_num == parseInt(redata.substring(47 + i, 51 + i),10)) {
						codemessage = taskNums[t].ferror_reason;
					}
				}
				//故障代码显示	 
			    if(code != formercode){			    	
					switch (code) {
					case 12://机器人无法达到记录点
						$("#l6").css("background-color", "#B8B8B8");
						$("#l14").css("background-color", "#FF0000");
						break;
					case 379://安全插头未插入
						$("#l7").css("background-color", "#B8B8B8");
						$("#l15").css("background-color", "#FF0000");
						break;
					case 727://机器人温度过高
						$("#l8").css("background-color", "#B8B8B8");
						$("#l16").css("background-color", "#FF0000");
						break;
					case 957://检测到系统错误
						$("#l9").css("background-color", "#B8B8B8");
						$("#l17").css("background-color", "#FF0000");
						break;
					case 1065://焊机未初始化
						$("#l10").css("background-color", "#B8B8B8");
						$("#l18").css("background-color", "#FF0000");
						break;
					case 2546://外围系统故障
						$("#l11").css("background-color", "#B8B8B8");
						$("#l19").css("background-color", "#FF0000");
						break;
					case 5096://紧急停止
						$("#l12").css("background-color", "#B8B8B8");
						$("#l20").css("background-color", "#FF0000");
						break;
					case 5114://电焊机设置异常
						$("#l13").css("background-color", "#B8B8B8");
						$("#l21").css("background-color", "#FF0000");
						break;
					//*********************************************如果机器人故障被解决，此时发出的代码置0还是保持上一个错误？？
					case 0://假设置零
						$("#l6").css("background-color", "#22AB22");						
						$("#l14").css("background-color", "#B8B8B8");
						$("#l7").css("background-color", "#22AB22");
						$("#l15").css("background-color", "#B8B8B8");
						$("#l8").css("background-color", "#22AB22");
						$("#l16").css("background-color", "#B8B8B8");
						$("#l9").css("background-color", "#22AB22");
						$("#l17").css("background-color", "#B8B8B8");
						$("#l10").css("background-color", "#22AB22");
						$("#l18").css("background-color", "#B8B8B8");
						$("#l11").css("background-color", "#22AB22");
						$("#l19").css("background-color", "#B8B8B8");
						$("#l12").css("background-color", "#22AB22");
						$("#l20").css("background-color", "#B8B8B8");
						$("#l13").css("background-color", "#22AB22");
						$("#l21").css("background-color", "#B8B8B8");
						break;
//					case 520://测试使用
//						$("#l13").css("background-color", "#B8B8B8");
//						$("#l21").css("background-color", "#FF0000");
//						break;
					}	
//					var tr;                                                     
//				    tr = '<td id="T'+machine[i].fid+'">(new Date(ttme)).getTime()</td>'+
//				    '<td id="T'+machine[i].fid+'"><a href="javascript:openError_code('+code+')">code</a></td>'+
//				    '<td id="T'+machine[i].fid+'"></td>';
//				    $("#tbody").append('<tr>'+tr+'</tr>');
					//生成实时页面的故障表故障
					var tr;                          
					tr = '<td id="tb' + tableFlag + '" style="width:40%;margin-left:10px;padding:  10px 70px;font-size:14pt;color:#000000;">' + aaa + '</td>' +
					'<td id="tb' + (tableFlag+1) + '" style="width:20%;margin-left:10px;padding:  10px 70px;font-size:14pt;color:#6CCFFF;"><a href="javascript:openError_code(' +
					code + ');" class="easyui-linkbutton" style="color:#FF0000;">' + code + '</a></td>' + 
					'<td id="tb' + (tableFlag+2) + '" style="width:40%;margin-left:10px;padding:  10px 70px;font-size:14pt;color:#000000;">' + codemessage + '</td>';					
					tableFlag += 3;				    
				    $("#tbody").append('<tr>'+tr+'</tr>');
			    }
			    formercode = code;
				var imgnum = $("#type").val();
				if (time.length != 0 && z < time.length) {
					var mstatus = redata.substring(4 + i, 6 + i);
					switch (mstatus) {
					case "00":
						$("#l5").val("待  机");
						$("#l5").css("background-color", "#55a7f3");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"1.png");
						break;
					case "03":
						$("#l5").val("焊  接");
						$("#l5").css("background-color", "#7cbc16");
						$("#mrjpg").attr("src", "resources/images/welder_"+imgnum+"3.png");
						break;
					}
					var x = time[z],
						y = ele[z],
						v = vol[z];
					if (z == 0) {
						series.addPoint([ x, y ], true, true);
						activeLastPointToolip(chart);
						series1.addPoint([ x, v ], true, true);
						activeLastPointToolip1(chart1);
	
					} else {
						if (x > time[z - 1]) {
							series.addPoint([ x, y ], true, true);
							activeLastPointToolip(chart);
							series1.addPoint([ x, v ], true, true);
							activeLastPointToolip1(chart1);
						}
					}
				}
			}
			//				}
			z++;
		}
	
	}
	;
	if ((time.length) % 3 == 1) {
		ele[time.length] = ele[time.length - 1];
		ele[time.length + 1] = ele[time.length - 1];
		vol[time.length] = vol[time.length - 1];
		vol[time.length + 1] = vol[time.length - 1];
		time[time.length] = time[time.length - 1] + 1000;
		time[time.length + 1] = time[time.length - 1] + 2000;
	}
	if (time.length % 3 == 2) {
		ele[time.length] = ele[time.length - 1];
		vol[time.length] = vol[time.length - 1];
		time[time.length] = time[time.length - 1] + 1000;
	}
}
function update_robotstates(){
	$("#l6").css("background-color", "#22AB22");						
	$("#l14").css("background-color", "#B8B8B8");
	$("#l7").css("background-color", "#22AB22");
	$("#l15").css("background-color", "#B8B8B8");
	$("#l8").css("background-color", "#22AB22");
	$("#l16").css("background-color", "#B8B8B8");
	$("#l9").css("background-color", "#22AB22");
	$("#l17").css("background-color", "#B8B8B8");
	$("#l10").css("background-color", "#22AB22");
	$("#l18").css("background-color", "#B8B8B8");
	$("#l11").css("background-color", "#22AB22");
	$("#l19").css("background-color", "#B8B8B8");
	$("#l12").css("background-color", "#22AB22");
	$("#l20").css("background-color", "#B8B8B8");
	$("#l13").css("background-color", "#22AB22");
	$("#l21").css("background-color", "#B8B8B8");	
}

function openError_code(id){
		$('#openError_code').window({
			title : "错误信息详情",
			modal : true,
			font : "20pt"
		});
		$('#openError_code').window('open');
		$("#Error_code").datagrid( {
			fitColumns : true,
			height : $("#openError_code").height(),
			width : $("#openError_code").width(),
			idField : 'id',
			pageSize : 10,
			pageList : [ 10, 20, 30, 40, 50 ],
			url : "hierarchy/getErrorList?search="+id,
			singleSelect : true,
			rownumbers : true,
			showPageList : false,
			columns : [ [ {
				field : 'id',
				title : '序号',
				width : 50,
				halign : "center",
				align : "left",
				hidden:true
			},{
				field : 'ferror_num',
				title : '故障代码',
				width : 100,
				halign : "center",
				align : "left"
			}, {
				field : 'ferror_reason',
				title : '故障描述',
				width : 200,
				halign : "center",
				align : "left"
			}, {
				field : 'ferror_solution',
				title : '故障原因',
				width : 500,
				halign : "center",
				align : "left"
			}, {
				field : 'fcutways',
				title : '解决方式',
				width : 500,
				halign : "center",
				align : "left"
			}, {
				field : 'freset',
				title : '重置方法',
				width : 150,
				halign : "center",
				align : "left"
			}, {
				field : 'fother_way',
				title : '其它解决方式',
				width : 150,
				halign : "center",
				align : "left"
			},{
				field : 'ferrordis',
				title : '故障复位',
				width : 150,
				halign : "center",
				align : "left"
			}] ],
			pagination : true,
			nowrap : false,
			rowStyler: function(index,row){
	            if ((index % 2)!=0){
	            	//处理行代背景色后无法选中
	            	var color=new Object();
	                color.class="rowColor";
	                return color;
	            }
	        },
		});
}
//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#dg").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
	var livewidth = $("body").width() * 0.9;
	var liveheight = ($("body").height()-250) / 2;
	$("#body31").width(livewidth);
	$("#body31").height(liveheight);
	$("#body32").width(livewidth);
	$("#body32").height(liveheight);
	$('#body31').highcharts().reflow();
	$('#body32').highcharts().reflow();
}


function activeLastPointToolip(chart) {
	var points = chart.series[0].points;
	chart.yAxis[0].removePlotLine('plot-line-0');
	chart.yAxis[0].removePlotLine('plot-line-1');
	chart.yAxis[0].removePlotLine('plot-line-2');
	/*  		    chart.tooltip.refresh(points[points.length -1]);
	  		    chart.tooltip.refresh(points1[points1.length -1]);*/
//	chart.yAxis[0].addPlotLine({ //在y轴上增加 
//		value : maxele, //在值为2的地方 
//		width : 2, //标示线的宽度为2px 
//		color : 'red', //标示线的颜色 
//		dashStyle : 'longdashdot',
//		id : 'plot-line-1', //标示线的id，在删除该标示线的时候需要该id标示 });
//		label : {
//			text : '最高电流', //标签的内容
//			align : 'center', //标签的水平位置，水平居左,默认是水平居中center
//			x : 10 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
//		}
//	});
//	chart.yAxis[0].addPlotLine({ //在y轴上增加 
//		value : minele, //在值为2的地方 
//		width : 2, //标示线的宽度为2px 
//		color : 'red', //标示线的颜色 
//		dashStyle : 'longdashdot',
//		id : 'plot-line-2', //标示线的id，在删除该标示线的时候需要该id标示 });
//		label : {
//			text : '最低电流', //标签的内容
//			align : 'center', //标签的水平位置，水平居左,默认是水平居中center
//			x : 10 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
//		}
//	});
	chart.yAxis[0].addPlotLine({ //在y轴上增加 
		value : presetele, //在值为2的地方 
		width : 2, //标示线的宽度为2px 
		color : 'red', //标示线的颜色 
		dashStyle : 'longdashdot',
		id : 'plot-line-0', //标示线的id，在删除该标示线的时候需要该id标示 });
		label : {
			text : '预置电流', //标签的内容
			align : 'center', //标签的水平位置，水平居左,默认是水平居中center
			x : 10 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
		}
	})
}

function activeLastPointToolip1(chart) {
	var points = chart.series[0].points;
	chart.yAxis[0].removePlotLine('plot-line-3');
	chart.yAxis[0].removePlotLine('plot-line-4');
	chart.yAxis[0].removePlotLine('plot-line-5');
	/*  		    chart.tooltip.refresh(points[points.length -1]);
	  		    chart.tooltip.refresh(points1[points1.length -1]);*/
//	chart.yAxis[0].addPlotLine({ //在y轴上增加 
//		value : maxvol, //在值为2的地方 
//		width : 2, //标示线的宽度为2px 
//		color : 'black', //标示线的颜色 
//		dashStyle : 'longdashdot',
//		id : 'plot-line-3', //标示线的id，在删除该标示线的时候需要该id标示 });
//		label : {
//			text : '最高电压', //标签的内容
//			align : 'center', //标签的水平位置，水平居左,默认是水平居中center
//			x : 10
//		} 
//	});
//	chart.yAxis[0].addPlotLine({ //在y轴上增加 
//		value : minvol, //在值为2的地方 
//		width : 2, //标示线的宽度为2px 
//		color : 'black', //标示线的颜色 
//		dashStyle : 'longdashdot',
//		id : 'plot-line-4', //标示线的id，在删除该标示线的时候需要该id标示 });
//		label : {
//			text : '最低电压', //标签的内容
//			align : 'center', //标签的水平位置，水平居左,默认是水平居中center
//			x : 10 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
//		}
//	});
	chart.yAxis[0].addPlotLine({ //在y轴上增加 
		value : presetvol, //在值为2的地方 
		width : 2, //标示线的宽度为2px 
		color : 'black', //标示线的颜色 
		dashStyle : 'longdashdot',
		id : 'plot-line-5', //标示线的id，在删除该标示线的时候需要该id标示 });
		label : {
			text : '预置电压', //标签的内容
			align : 'center', //标签的水平位置，水平居左,默认是水平居中center
			x : 10 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
		}
	})
}


function secondToDate(result) {
	var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
	var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
	var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
	return result = h + ":" + m + ":" + s;
}
//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#dg").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}