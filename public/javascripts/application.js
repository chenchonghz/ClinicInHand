// app.js
function showClear(){
	var clearTarget = $(this).attr("id");
	$(this).before("<i class='glyphicon glyphicon-remove' onclick='clearInput('" + clearTarget + "')'></i>");
}

function clearInput(target){
	$("#" + target).remove();
}

function filterdata(arraydata, word){
	//var result = new Array();
	var count = 0;
	var list = [];

	word = word.replace(/\\/g,'');
	word = word.replace(/\(/g,'');
	word = word.replace(/\)/g,'');
	word = word.replace(/\*/g,'');
	word = word.replace(/ /g,'');

	for(var i=0; i<arraydata.length; i++){
		if( arraydata[i].key.toLowerCase().search(word.toLowerCase()) >= 0 ){
			count++;
			list.push(arraydata[i]);
		} else if( arraydata[i].name != null && arraydata[i].name.toLowerCase().search(word.toLowerCase()) >= 0){
			count++;
			list.push(arraydata[i]);
		}
	}
	var result = new Object();
	result.count = count;
	result.list = list;
	return result;
}