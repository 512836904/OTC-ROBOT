<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>实时界面</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/iconfont.css">
	
	<script type="text/javascript" src="resources/js/loading.js"></script>
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
	<script type="text/javascript" src="resources/js/session-overdue.js"></script>
	<script type="text/javascript" src="resources/js/highcharts.js"></script>
	<script type="text/javascript" src="resources/js/exporting.js"></script>
	<script type="text/javascript" src="resources/js/td/robotweld.js"></script>
	<script type="text/javascript" src="resources/js/swfobject.js"></script>
	<script type="text/javascript" src="resources/js/web_socket.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt-min.js"></script>
	
  </head>
  
<body class="easyui-layout">
	<input  name="machineid" id="machineid" type="hidden" value="${value }"/>
	<input id="type" type="hidden" value="${type }"/>
	<input id="form" type="hidden" value="${form }"/>
	<input  name="afresh" id="afresh" type="hidden" value="${afreshLogin }"/>
	<div id="bodys" region="center"  hide="true"  split="true">
		<div style="float:left; width:100%;height:33px;background-color: #145d92;color:#ffffff;font-size:19pt;">设备运行数据监控
		<div style="float:right;"><a href="td/AllTd"><img src="resources/images/history.png" style="height:30px;width:60px;padding-top:5px;"></a></div></div>
		<div style="width:25%;height:18%;float:left;margin-left:20px;position: relative;font-size:23px">
			<fieldset style="width:99%; height:108%;margin-bottom:2px;border-color: #145d92;border-width:2px;">
				<legend style="color:#145d92;">设备信息</legend>
				<div style="float:left;width:40%;height:92%;margin-left:10px;margin-bottom:2px;"><a href="td/AllTd"><img id="mrjpg" src="resources/images/welder_73.png" style="height:90%;width:85%;padding-top:10px;"></a></div>
				<div style="float:left;width:60%;height:92%;top:30px;left:45%;margin:auto;position:absolute;">
					<ul>
						<li id="l0" style="width:100%;height:30px;margin-top:15px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						设备编号：<span id="l1" style="color:#000000">${valuename}</span></li>
						<li style="width:100%;height:30px;overflow:hidden;white-spamrjpgce:nowrap;text-overflow:ellipsis;color:#005d92">
						设备类型：<span id="l2" style="color:#000000">机器人</span></li>
						<li style="width:100%;height:30px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						任务编号：<span id="l3" style="color:#000000">000001</span></li>
						<li style="width:100%;height:30px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						操作人员：<span id="l4" style="color:#000000">---</span></li>
						<li style="width:100%;height:35px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						设备状态：<input type="text" readonly="readonly" id="l5" value="关  机" style="font-size:15pt;border-radius: 5px;width:80px;height:24px;text-align:center;color:#ffffff;background: #818181"></li>
					</ul>
				</div>
			</fieldset>
		</div>
		<div style="width:25%;height:18%;float:left;margin-left:10px;margin-bottom:2px;position: relative;font-size:23px">
			<fieldset style="width:99%; height:108%;margin-bottom:2px;border-color: #145d92;border-width:2px;">
				<legend style="color:#145d92;">焊接主要参数</legend>									
					<div style="width:100%;height:50%;margin-left:20px;margin-top:10px;">
						<div style="float:left;background-color: #228B22;width:100px;height:40px;border-radius: 10px;margin-top:20px;font-size:18pt;text-align: center;color:#ffffff">实际电流</div>
						<div style="float:left;width:60px;height:40px;margin-left:15px;margin-top:15px;font-size:26pt;font-weight: bold;text-align: center;"><span id="c1">0</span>&nbsp;&nbsp;A</div>
						<div style="float:left;background-color: #228B22;width:100px;height:40px;border-radius: 10px;margin-top:20px;margin-left:90px;font-size:18pt;text-align: center;color:#ffffff">设定电流</div>
						<div style="float:left;width:60px;height:40px;margin-left:15px;margin-top:15px;font-size:26pt;font-weight: bold;text-align: center;"><span id="r13">0</span>&nbsp;&nbsp;A</div>
					</div>	
					<div style="width:100%;height:50%;margin-left:20px;margin-top:-10px;margin-bottom:-15px;">
						<div style="float:left;background-color: #f05e0e;width:100px;height:40px;border-radius: 10px;margin-top:10px;font-size:18pt;text-align:center;color:#ffffff">实际电压</div>
						<div style="float:left;width:60px;height:40px;margin-left:15px;margin-top:5px;font-size:26pt;font-weight: bold;text-align: center;"><span id="c2">0</span>&nbsp;&nbsp;V</div>				
						<div style="float:left;background-color: #f05e0e;width:100px;height:40px;border-radius: 10px;margin-top:10px;margin-left:90px;font-size:18pt;text-align:center;color:#ffffff">设定电压</div>
						<div style="float:left;width:60px;height:40px;margin-left:15px;margin-top:5px;font-size:26pt;font-weight: bold;text-align: center;"><span id="r14">0</span>&nbsp;&nbsp;V</div>
					</div>				
					
<!-- 					<div style="width:50%;height:50%;margin-left:10px;top:30px;"> -->
<!-- 						<div style="float:right;background-color: #f05e0e;width:100px;height:40px;border-radius: 10px;font-size:18pt;text-align:center;color:#ffffff">电压</div> -->
<!-- 						<div style="float:right;width:60px;height:40px;margin-top:-8px;margin-left:15px;font-size:26pt;font-weight: bold;text-align: center;"><span id="c2">0</span>&nbsp;&nbsp;V</div> -->
<!-- 					</div>				 -->
				
			</fieldset>
		</div>
		<div style="width:48%;height:18%;float:left;margin-left:10px;margin-bottom:2px;position: relative;font-size:24px">
			<fieldset style="width:99%; height:108%;margin-bottom:2px;border-color: #145d92;border-width:2px;">
				<legend style="color:#145d92;">实时数据</legend>
				<div style="float:left;width:20%;height:70%;padding-top:2%;margin-left:15px;font-size:22px">
					<ul>
						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						开机时长：<span id="r1" style="color:#000000">00:00:00</span></li>
						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						离线时长：<span id="r2" style="color:#000000">00:00:00</span></li>
						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						工作时长：<span id="r3" style="color:#000000">00:00:00</span></li>
						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						焊接时长：<span id="r4" style="color:#000000">00:00:00</span></li>
					</ul>
				</div>
				<div style="float:left;width:24%;height:70%;padding-top:2%;margin-left:18px;font-size:22px">
<!-- 					<ul>									 -->
<!-- 						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92"> -->
<!-- 						通道总数：<span id="r5" style="color:#000000">30</span></li> -->
<!-- 						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92"> -->
<!-- 						当前通道：<span id="r6" style="color:#000000">15</span></li>		 -->
<!-- 						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92"> -->
<!-- 						提前送气时间：<span id="r11" style="color:#000000">00:00:00</span></li> -->
<!-- 						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92"> -->
<!-- 						滞后停气时间：<span id="r12" style="color:#000000">00:00:00</span></li>						 -->
<!-- 					</ul> -->
				</div>
				<div style="float:left;width:24%;height:70%;padding-top:2%;margin-left:18px;font-size:22px">
					<ul>											
						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						循环次数：<span id="r88" style="color:#000000">0000</span></li>						
						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						焊接速度：<span id="r99" style="color:#000000">0 cm/min</span></li>	
<!-- 						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92"> -->
<!-- 						初期电流：<span id="r15" style="color:#000000">0 A</span></li> -->
<!-- 						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92"> -->
<!-- 						收弧电流：<span id="r16" style="color:#000000">0 A</span></li>						 -->
					</ul>
				</div>
				<div style="float:left;width:25%;height:70%;padding-top:2%;margin-left:18px;font-size:22px">
					<ul>					
						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						设定送丝：<span id="r7" style="color:#000000">0 cm/min</span></li>			
						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						送丝速度：<span id="r8" style="color:#000000">0 cm/min</span></li>
						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						气体流量：<span id="r9" style="color:#000000">0 L/min</span></li>					
						<li style="width:100%;height:25%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#005d92">
						瞬时功率：<span id="r10" style="color:#000000">0 W</span></li>
								
					</ul>
				</div>
			</fieldset>
		</div>
		
<!-- 		<div style="float:left; width:65%;height:30px;margin-top:25px;background-color: #145d92;color:#ffffff;text-align:center;font-size:20px">焊接实时曲线</div> -->
<!-- 		<div style="float:right; width:35%;margin-top:25px;background-color: #145d92;color:#ffffff;text-align:center"></div>		 -->
		
		<div id="livediv" style="width:65%;height:75%;float:left;top:26%;">
			<div style="float:left; width:100%;height:33px;margin-top:25px;background-color: #145d92;color:#ffffff;text-align:center;font-size:19pt">实时曲线</div>
			<div style="float:left; padding-top:2%;width:40px;height:42%;background-color: #228B22;border-radius: 6px;font-size:19pt;color:#ffffff;margin:10px;text-align: center;">
			电流曲线<div style="width:30px;height:30px;border-radius: 60px;font-size:19pt;background-color: #ffffff;color: #000;margin-left:7px;">A</div></div>			
			<div id="body31" style="float:left;width:90%;height:48%;"></div>			
			<div style="float:left; width:100%;height:20px;background-color: #C4C4C4;"></div>			
			<div style="float:left; padding-top:2%;width:40px;height:42%;background-color: #f05e0e;border-radius: 6px;font-size:19pt;color:#ffffff;margin:10px;text-align: center;">
			电压曲线<div style="width:30px;height:30px;border-radius: 60px;font-size:19pt;background-color: #ffffff;color: #000;margin-left:7px;">V</div></div>
			<div id="body32" style="float:left;width:90%;height:48%;"></div>
		</div>

		<div id="typediv" style="width:34%;height:75%;float:left;">
			<div id= "typediv2"style="width:100%;height:45%;float:left;margin-left:10px;top:2%;position: relative;"> 			
				<fieldset style="border-width: 5px;border-radius:8px; border-color: #145d92; width:100%; height:94% ;">
					<legend align ="center" style = "font-size:20pt;color:#145d92;">机器人主要状态</legend>
	<!-- 				<div style="width:20%;height:10%;background-color: #66CCCC;font-size:15pt;color:#ffffff;text-align: center;">操作设备：<input type="text" id="r7"  value="01" readonly style="border-radius:5px;border:2px solid #66CCCC;width:63px;height:100%;text-align:center;"></div> -->
<!-- 					<table style="display:block;overflow-y:scroll;overflow-x:hidden;-webkit-overflow-scrolling: touch;border-collapse:separate;width:100%;height:80%;border-spacing:10px 5px;"> -->
<!-- 					<caption style="background-color: #66CCCC;font-size:20pt;color:#ffffff;">当前状态</caption> -->
<!-- 					<div id = "cxk0" style="float:left; width:100%;height:30px;background-color: #145d92;color:#ffffff;text-align:center;font-size:16pt;">当前状态</div> -->
					<fieldset style="border-width: 3px;padding-top:15px;border-radius:5px; border-color: #145d92; width:99%; height:80%">
<!-- 					<div style="width:30%;height:15%;font-size:20pt;color:#000000;text-align: center;">设备状态警戒线：</div> -->					
					<div style="float:left;width:10%;height:100px;padding-top:2px;margin-left:40px;">
						<ul>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							1<span id="r17" ></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							2<span id="r18"></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							3<span id="r19"></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							4<span id="r20"></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							5<span id="r21"></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							6<span id="r22"></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							7<span id="r23"></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							8<span id="r24"></span></li>
						</ul>
					</div>
					<div style="float:left;width:40%;height:100px;padding-top:2px;margin-left:20px;">
						<ul>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							机器人无法达到记录点<span id="r25" ></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							安全插头未插入<span id="r26"></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							机器人温度过高<span id="r27"></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							检测到系统错误<span id="r28"></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							焊机未初始化<span id="r29"></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							外围系统故障<span id="r30"></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							紧急停止<span id="r31"></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							电焊机设置异常<span id="r32"></span></li>
						</ul>
					</div>
					<div style="float:left;width:10%;height:100px;padding-top:2px;margin-left:20px;">
						<ul>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l6" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #B8B8B8;margin-left:7px;"></div></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l7" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #22AB22;margin-left:7px;"></div></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l8" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #22AB22;margin-left:7px;"></div></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l9" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #22AB22;margin-left:7px;"></div></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l10" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #22AB22;margin-left:7px;"></div></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l11" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #22AB22;margin-left:7px;"></div></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l12" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #22AB22;margin-left:7px;"></div></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
	<!-- 						<div id = "l13" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #66CC99;margin-left:7px;"></div></li> -->
							<div id = "l13" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #22AB22;margin-left:7px;"></div></li>
						</ul>
					</div>
					<div style="float:left;width:10%;height:100px;padding-top:2px;margin-left:50px;">
						<ul>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l14" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #FF0000;margin-left:7px;"></div></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l15" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #B8B8B8;margin-left:7px;"></div></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l16" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #B8B8B8;margin-left:7px;"></div></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l17" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #B8B8B8;margin-left:7px;"></div></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l18" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #B8B8B8;margin-left:7px;"></div></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l19" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #B8B8B8;margin-left:7px;"></div></span></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
							<div id = "l20" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #B8B8B8;margin-left:7px;"></div></li>
							<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
	<!-- 						<div id = "l21" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #FF0000;margin-left:7px;"></div></li> -->
							<div id = "l21" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #B8B8B8;margin-left:7px;"></div></li>
						</ul>
					</div>

<!-- 					<div style="float:left;width:7%;height:100px;padding-top:8px;margin-left:50px;"></div>									 -->
<!-- 					<fieldset style="margin-top:20px;border-width: 1px;padding-top:3px;padding-bottom:6px;border-radius:5px; border-color: #145d92; width:20%; "> -->
<!-- 						<div style="float:left;width:30%;height:80px;padding-top:-15px;margin-left:5px;">						 -->
<!-- 							<p style="font-size:15pt;margin-left:2px;">注:</p> -->
<!-- 							<ul> -->
<!-- 								<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis"> -->
<!-- 								<div id = "l22" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #22AB22;margin-left:7px;"></div></li>							 -->
<!-- 								<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis"> -->
<!-- 								<div id = "l23" style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #FF0000;margin-left:7px;"></div></li>							 -->
<!-- 							</ul>	 -->
<!-- 						</div> -->
<!-- 						<div style="float:left;width:52%;height:80px;padding-top:1px;margin-left:3px;">						 -->
<!-- 							<p style="font-size:15pt;margin-left:10px;">&nbsp</p> -->
<!-- 							<ul> -->
<!-- 								<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis"> -->
<!-- 								<div id = "l24" style="width:25px;height:25px;font-size:14pt;margin-left:5px;">正常状态</div></li>							 -->
<!-- 								<li style="font-size:15pt;width:100%;height:28px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis"> -->
<!-- 								<div id = "l25" style="width:25px;height:25px;font-size:14pt;margin-left:5px;">故障状态</div></li>							 -->
<!-- 							</ul>	 -->
<!-- 						</div> -->
<!-- 					</fieldset> -->
					
					</fieldset>
<!-- 					<div style="float:left;width:20%;height:100px;padding-top:30px;margin-left:20px;"> -->
<!-- 					<div id="body34" style="float:left;width:90%;height:48%;"></div> -->
<!-- 					</div> -->
					<div style="float:left;width:100%;height:10%;padding-top:6px;">
						<div id="statesbutton" style="float:left;width:45%;height:95%;font-size:15pt;margin-left:58px;">
						<a href="javascript:update_robotstates();" style="color:#145d92;">点击更新状态</a></div>						
						<div id="l26" style="float:left;width:8%;height:95%;font-size:15pt;margin-left:2px;">说明:</div>
						<div id="l27" style="float:left;width:15%;height:95%;">
							<div style="float:left;width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #22AB22;margin-left:5px;"></div>
							<div style="float:right;height:25px;font-size:14pt;margin-left:5px;">正常运行</div>
						</div> 
						<div id="l28" style="float:left;width:15%;height:95%;margin-left: 12px;">
							<div style="float:left;width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #FF0000;margin-left:5px;"></div>
							<div style="float:right;height:25px;font-size:14pt;margin-left:5px;">故障发生</div>
						</div>
					</div>
				</fieldset>
			</div>
		
			<div id= "typediv1" style="width:100%;height:55%;float:left; margin-left:10px;position: relative;">
				<fieldset style="border-width: 5px;border-radius:8px; border-color: #145d92; width:100%; ">
				<legend align ="center" style = "font-size:20pt;color:#145d92;">机器人故障信息</legend>
	<!-- 			<div style="width:140px;height:10%;background-color: #66CCCC;font-size:20pt;color:#ffffff;text-align: center;">消息通知：</div> -->			
				<table style=" display:block;overflow-y:scroll;overflow-x:hidden;-webkit-overflow-scrolling: touch;border-collapse:separate;width:100%;height:100%;border-spacing:10px 5px;">				
				<caption style="background-color: #145d92;font-size:16pt;color:#ffffff;">详细信息</caption>
<!-- 				<fieldset style="border-width: 5px;border-radius:8px; border-color: #145d92; width:95%;"> -->		
				<tr>
					<th style="width:40%;font-size:15pt;color:#000000;">故障时间</th>
					<th style="width:20%;font-size:15pt;color:#000000;">故障代码</th>
					<th style="width:40%;font-size:15pt;color:#000000;">故障描述</th>
				</tr>			
				<tbody id="tbody" style="margin-left:10px;font-size:14pt;color:#6CCFFF;table-layout:fixed;word-wrap:break-word;"></tbody>
				<tr>
					<td id="tb" style="width:40%;margin-left:10px;padding:  10px 70px;font-size:14pt;color:#000000;">2020-06-29 20:07:03</td>
					<td id="tb1" style="width:20%;margin-left:10px;padding:  10px 70px;font-size:14pt;color:#FF0000;"><a href="javascript:openError_code();"  style="color:#FF0000;">2</a></td>
					<td id="tb2" style="width:40%;margin-left:10px;padding:  10px 70px;font-size:14pt;color:#000000;">机器人大臂断裂</td>			
				</tr>					
				</table>
				</fieldset>
			</div>
						
			<div id="openError_code" style="width: 80%; height: 60%; padding:10px 20px;font-size:20pt;" closed="true">
				<table id="Error_code" style="font-size:20pt;table-layout: fixed; width:100%;"></table>
			</div>
		</div>
		
		
		<div id = "cxk" style="float:left; width:100%;height:30px;margin-top:50px;background-color: #145d92;color:#ffffff;text-align:center;"></div>
	</div>
</body>
</html>
 
 