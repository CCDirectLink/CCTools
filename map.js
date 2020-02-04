"use strict";

function boot()
{
	MAP_EVENTS.innerHTML = '';
	
	try
	{
		var data = JSON.parse(MAP_JSON.value);
		
		for(var i = 0; i < data['entities'].length; i++)
			if(data['entities'][i]['type'] === 'EventTrigger')
				MAP_EVENTS.innerHTML += '<input type="radio" name="event" onchange="transfer(parseInt(this.value))" value="' + i + '">' + data['entities'][i]['settings']['name'] + '</input>';
	}
	catch(error) {MAP_JSON.value = error;}
}

function transfer(index = -1)
{
	if(index !== -1)
	{
		try
		{
			var data = JSON.parse(MAP_JSON.value);
			EVENTS_JSON.value = JSON.stringify(data['entities'][index]['settings']['event']);
			load();
		}
		catch(error) {EVENTS_JSON.value = error;}
	}
}

function push()
{
	for(var i = 0; i < MAP_EVENTS.children.length; i++)
	{
		if(MAP_EVENTS.children[i].checked)
		{
			var data = JSON.parse(MAP_JSON.value);
			data['entities'][parseInt(MAP_EVENTS.children[i].value)]['settings']['event'] = JSON.parse(EVENTS_JSON.value);
			MAP_JSON.value = JSON.stringify(data);
		}
	}
}