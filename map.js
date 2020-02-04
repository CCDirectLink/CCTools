"use strict";

function update(index = -1)
{
	try
	{
		var data = JSON.parse($('#input').val());
		console.log(data);
		$('#add').empty().append('<h2>' + data['name'] + '</h2><canvas id="map" width="' + (16*data['mapWidth']) + '" height="' + (16*data['mapHeight']) + '" style="border:1px solid #000000;"></canvas>');
	}
	catch(error) {output += error;}
}

function edit()
{
	var table = document.getElementById('event-table');
	var entries = [];
	
	for(var i = 0, row; row = table.rows[i]; i++)
	{
		entries[i] = {};
		
		for(var j = 1, col; col = row.cells[j]; j++)
		{
			var key = col.getAttribute('name');
			var value;
			
			if(key === 'type')
				value = col.children[0].innerHTML;
			else
				value = col.children[0].value;
			
			entries[i][key] = value;
		}
	}
	
	console.log(entries);
}

$(document).ready(function() {
	$('#event-table').on('click', '.delete', function() {$(this).closest('tr').remove();});
});