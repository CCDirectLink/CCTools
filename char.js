function boot()
{
	try
	{
		var data = JSON.parse(MAIN.value);
		var expressions = data['face']['expressions'];
		var output = '';
		
		for(var exp in expressions)
			output += "'" + exp + "',";
		
		var pos = output.lastIndexOf(',');
		output = output.substring(0, pos) + output.substring(pos+1);
		OUT.value = '['+output+']';
	}
	catch(error) {OUT.value = error;}
}