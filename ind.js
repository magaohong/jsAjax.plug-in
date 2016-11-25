
	//type, url, data, success, error
	function Ajax(obj){
    // 创建ajax对象
    var xhr = null,
    	data=obj.data,
    	yn=obj.async || true,
    	url=obj.url;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
 	var types=obj.type || "GET";
    var type =types.toUpperCase();
    // 用于清除缓存
    var random = Math.random();
 
    if(typeof obj.data == 'object'){
        var str = '';
        for(var key in data){
            str += key+'='+data[key]+'&';
        }
        data = str.replace(/&$/, '');
    }
 
    if(type == 'GET'){
        if(data){
            xhr.open('GET', url + '?' + data, yn);
        } else {       	
            xhr.open('GET', url + '?t=' + random, yn);
        }
        xhr.send();
 
    } else if(type == 'POST'){
        xhr.open('POST', url, yn);
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
 
    // 处理返回数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                obj.success(xhr.responseText);
            } else {
                if(obj.error){
                    obj.error(xhr.status);
                }
            }
        }
    }
}