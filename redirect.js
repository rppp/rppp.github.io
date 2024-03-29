function is_num(str) {
	return /^\d+$/.test(str);
}
function trans(s){
	var result="";
	//s = s.trim();
	for (var i =0;i<s.length;i++){
		if(is_num(s[i]) || s[i]=='\n'){
			result+=s[i];
		}
	}
	return result;
}

function validateIP(ip) {
	const ipRegex = /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/;
	return ipRegex.test(ip);
}

function getPublicIP(callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200) {
			var response = JSON.parse(xhr.responseText);
			if(validateIP(response.ip)){
				callback(response.ip);
			}
		}
	};
	xhr.open("GET", "https://api.ipify.org?format=json", true);
	xhr.send();
}

function get_ip_file(callback) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var s = xmlhttp.responseText;
			//console.log(s);
			//document.write(fileContent);
			s = trans(s);
			var v = s.split("\n");
			var temp_ip="";
			for (var i =v.length-2;i>=0;i--){
				//v[i]=trans(v[i].toString());
				//console.log("i:",i);
				//console.log(v[i]);
				if(i!=v.length-2){
					temp_ip+=".";
				}
				/*if(v[i]==undefined){
					continue
				}*/
				temp_ip+=v[i];
				
			}
			callback(temp_ip);
			
		}
	};
	xmlhttp.open("GET", "test.txt", true);
	xmlhttp.send();
}

var g_server_ip=null;
var g_public_ip=null;
function connectWebSocket() {
	var temp_ip = g_server_ip;
	if(g_server_ip == g_public_ip){
		temp_ip = "192.168.0.107";
	}
	const currentUrl = document.URL;
	var file = "client.html";
	if(currentUrl.endsWith(".html")){
		var pos = currentUrl.lastIndexOf("/");
		file = currentUrl.substring(pos + 1, currentUrl.length);
	}
	window.location.replace("http://"+temp_ip+":2997/temp/eweb/"+file);
}
get_ip_file(function(server_ip){
	//console.log(g_server_ip,g_public_ip);
	g_server_ip = server_ip;
	if(g_server_ip!=null && g_public_ip !=null){
		connectWebSocket();
	}
});
getPublicIP(function(public_ip){
	//console.log(g_server_ip,g_public_ip);
	g_public_ip = public_ip;
	if(g_server_ip!=null && g_public_ip !=null){
		connectWebSocket();
	}
});