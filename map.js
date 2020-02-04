"use strict";

function update(index = -1)
{
	var output = '';
	
	try
	{
		var data = JSON.parse($('#input').val());
		
		if(index !== -1)
		{
			$('#event-table').empty();
			var events = data['entities'][index]['settings']['event'];
			output += JSON.stringify(events);
			
			for(var i = 0; i < events.length; i++)
			{
				var row = '<td name="type"><b>' + events[i]['type'] + '</b></td>';
				
				for(var node in events[i])
				{
					if(node !== 'type')
						row += '<td name="' + node + '"><input type="text" value="' + events[i][node] + '"></input></td>';
				}
				
				$('#event-table').append('<tr><td><button class="delete">Delete</button></td>' + row + '</tr>');
			}
		}
		else
		{
			$('#event-list').empty();
			
			for(var i = 0; i < data['entities'].length; i++)
			{
				if(data['entities'][i]['type'] === 'EventTrigger')
				{
					$('#event-list').append('<input type="radio" name="event" value="' + i + '">' + data['entities'][i]['settings']['name'] + '</input>');
					$('input[name="event"]').change(function() {update(parseInt($('input[name="event"]:checked').val()));});
				}
			}
			
			$('#event-table').before('<h2>Properties</h2>');
			
			output = JSON.stringify(data);
		}
	}
	catch(error) {output += error;}
	
	$('#output').val(output);
}

$(document).ready(function() {
	$('#event-table').on('click', '.delete', function() {$(this).closest('tr').remove();});
});