"use strict";

var names = {};
var descs = {};
var menu = `<td>
	<select class="menu" onchange="activate($(this).closest('tr').index())">
		<option value="SET_PLAYER_ACTION_BLOCK">SET_PLAYER_ACTION_BLOCK</option>
		<option value="SET_SPEED">SET_SPEED</option>
		<option value=""></option>
	</select>
</td>`;

function update(mode = 0)
{
	if(mode === 1)
	{
		if($('#name').val() === '')
			delete names[$('#lang_name').val()];
		else
			names[$('#lang_name').val()] = $('#name').val();
	}
	else if(mode === 2)
	{
		if($('#desc').val() === '')
			delete descs[$('#lang_desc').val()];
		else
			descs[$('#lang_desc').val()] = $('#desc').val();
	}
	
	var ability = {};
	
	ability['name'] = {};
	for(var lang in names)
		if(names[lang] !== '')
			ability['name'][lang] = names[lang];
	if(JSON.stringify(names) === '{}')
		delete ability['name'];
	
	ability['desc'] = {};
	for(var lang in descs)
		if(descs[lang] !== '')
			ability['desc'][lang] = descs[lang];
	if(JSON.stringify(descs) === '{}')
		delete ability['desc'];
	
	ability['dmgType'] = $('#dmgType').val();
	ability['stunType'] = $('#stunType').val();
	ability['status'] = $('#status').is(':checked');
	ability['steps'] = [];
	
	$('.menu').each(function(i)
	{
		var action = $(this).val();
		ability['steps'][i] = {'type': action};
		
		if(action === 'SET_PLAYER_ACTION_BLOCK')
		{
			$(this).closest('tr').children().each(function(index)
			{
				if(index === 2)
				{
					ability['steps'][i]['blockData'] = {};
					ability['steps'][i]['blockData']['dash'] = Number($(this).find('input[name="dash"]').val());
					ability['steps'][i]['blockData']['action'] = Number($(this).find('input[name="action"]').val());
					ability['steps'][i]['blockData']['move'] = Number($(this).find('input[name="move"]').val());
					ability['steps'][i]['blockData']['reaim'] = Number($(this).find('input[name="reaim"]').val());
				}
			});
		}
		else if(action === 'SET_SPEED')
		{
			$(this).closest('tr').children().each(function(index)
			{
				if(index === 2)
				{
					ability['steps'][i]['value'] = Number($(this).find('input[name="speed"]').val());
				}
			});
		}
	});
	
	$('#output').val(JSON.stringify(ability));
}

function activate(match = -1)
{
	$('.menu').each(function(i)
	{
		if(i === match)
		{
			var action = $(this).val();
			
			if(action === 'SET_PLAYER_ACTION_BLOCK')
			{
				$(this).closest('tr').children().each(function(index)
				{
					if(index === 2)
						$(this).empty().append('Dash: <input type="number" oninput="update()" class="small" name="dash"></input><br>Action: <input type="number" oninput="update()" class="small" name="action"></input><br>Move: <input type="number" oninput="update()" class="small" name="move"></input><br>Re-Aim: <input type="number" oninput="update()" class="small" name="reaim"></input>');
				});
			}
			else if(action === 'SET_SPEED')
			{
				$(this).closest('tr').children().each(function(index)
				{
					if(index === 2)
						$(this).empty().append('<input type="number" oninput="update()" class="small" name="speed"></input>');
				});
			}
		}
	});
	
	update();
}

function swap_name() {$('#name').val(names[$('#lang_name').val()]);}
function swap_desc() {$('#desc').val(descs[$('#lang_desc').val()]);}

$(document).ready(function()
{
	$('#steps').on('click', '.delete', function() {$(this).closest('tr').remove(); update();});
	$('#add').click(function() {$('#steps').append('<tr><td><button class="delete">Delete</button></td>' + menu + '<td></td></tr>'); activate($('.menu').length-1); update();});
});