"use strict";

// MENU sorted by usage/frequency
const MENU = genSel(['','SHOW_MSG','SHOW_SIDE_MSG','CHANGE_VAR_BOOL','CHANGE_VAR_NUMBER','WAIT','PLAY_BGM','PAUSE_BGM','RESUME_BGM','PUSH_BGM','POP_BGM','PLAY_IN_BETWEEN_BGM','SET_DEFAULT_BGM','RESUME_DEFAULT_BGM','SET_CONTACT_ONLINE','SET_PLAYER_CORE'], 'setEvent(this); update();');
const INPUT = {'TEXT':'<input type="text" oninput="update()"></input>', 'NUMBER':'<input type="number" oninput="update()" class="small"></input>', 'CHECKBOX':'<input type="checkbox" onchange="update()"></input>'};
const LANG_MODULE = genSel({'en_US':'English', 'de_DE':'German', 'zh_CN':'Chinese', 'ja_JP':'Japanese', 'ko_KR':'Korean'}, 'setLang(this)');
const MSG_CHARS = genSel({'':'', 'main.shizuka':'Shizuka', 'antagonists.gautham':'Gautham (Obfuscated)'});
const MSG_EXP = genSel(['DEFAULT']);
const BOOL_SETTINGS = genSel(['set','and','or','xor']);
const NUMBER_SETTINGS = genSel(['set','add','sub','mul','div','mod']);
const BGM_TRACK_LIST = genSel(['silence','tutorial','intro','short','tutorial-battle','challenge','title','cargoship-exterior','lolfanfare','landmark','ability-got','exposition','designer','challenge2','puzzle-pg','bossbattle1','escape','crosscounter','oldHideout1','oldHideoutBattle','oldHideoutEnding','autumnsRise','fieldBattle','rhombusDungeon','rookieHarbor','firstScholars','bergenTrail','rhombusSquare','apolloTheme','coldDungeon','bergenVillage','heatArea','heatVillage','heatDungeon','shockDungeon','waveDungeon','treeDungeon','jungle','emilie','basinKeep','casual','briefing','ponder','lea','dreamsequence-intro','dreamsequence','sorrow','raidTheme','forestField','designerBoss1','waiting','aridField','aridBattle','shizukaConfrontation','evoDungeon1','evoDungeon2','evoEscape','sergeyExposition','schneiderTour','infiltration','sadness','oldHideout2','trueIntentions','rhombusSquare2','autumnsFall','snailBattle1','snailBattle2','lastDungeon','shizuka','finalBoss','credits','arena','s-rank','bossRush','glitchArea']);
const BGM_DEFAULT_TRACKS = genSel(['cargoShipIntro','cargoShip','cargoChallenge','cargoShipExterior','puzzle','hideout','hideout2','forest','autumn','autumnsFall','rookieHarbor','firstScholars','bergenTrail','bergenVillage','heatArea','rhombusSquare','rhombusSquare2','rhombusSquareArena','crossCentral','coldDungeon','heatVillage','heatGlitch','heatDungeonOutside','silence','silenceCombat','heatDungeon','jungle','basinKeep','shockDungeon','waveDungeon','treeDungeon','arid','aridDng','lastDng','lab']);
const BGM_SWITCH_MODE = genSel(['IMMEDIATELY','FAST_OUT','MEDIUM_OUT','SLOW_OUT','VERY_SLOW_OUT','FAST','MEDIUM','SLOW','VERY_SLOW']);
const PARTY_OPTIONS = genSel(['Lea','Shizuka','Shizuka0','Emilie','Sergey','Schneider','Schneider2','Hlin','Grumpy','Buggy','Glasses','Apollo','Joern','Triblader1']);
const PLAYER_CORE = genSel(['MOVE','CHARGE','DASH','CLOSE_COMBAT','GUARD','CREDITS','MENU','ELEMENT_NEUTRAL','ELEMENT_HEAT','ELEMENT_COLD','ELEMENT_SHOCK','ELEMENT_WAVE','QUICK_MENU','THROWING','ELEMENT_LOAD','ELEMENT_CHANGE','SPECIAL','COMBAT_RANK','QUEST_SWITCH','EXP','MENU_CIRCUIT','MENU_SYNOPSIS','MENU_SOCIAL','MENU_SOCIAL_INVITE','MENU_BOTANICS','ITEMS','MONEY','MODIFIER']);
var SPECIAL = [];

function update()
{
	var events = [];
	var table = document.getElementById('events');
	
	for(var i = 0, row; row = table.rows[i]; i++)
	{
		events[i] = {};
		
		for(var j = 1, options; options = row.cells[j]; j++)
		{
			if(j === 1)
				events[i]['type'] = options.children[0].value;
			else if(j === 2)
			{
				switch(events[i]['type'])
				{
					case 'SHOW_MSG':
					{
						events[i]['person'] = {};
						events[i]['person']['person'] = options.children[4].value;
						events[i]['person']['expression'] = options.children[5].value;
						events[i]['message'] = {};
						events[i]['autoContinue'] = options.children[2].checked;
						var index = options.parentElement.rowIndex;
						
						for(var lang in SPECIAL[index])
							if(SPECIAL[index][lang] !== '')
								events[i]['message'][lang] = SPECIAL[index][lang];
						
						break;
					}
					case 'SHOW_SIDE_MSG':
					{
						events[i]['person'] = {};
						events[i]['person']['person'] = options.children[3].value;
						events[i]['person']['expression'] = options.children[4].value;
						events[i]['message'] = {};
						var index = options.parentElement.rowIndex;
						
						for(var lang in SPECIAL[index])
							if(SPECIAL[index][lang] !== '')
								events[i]['message'][lang] = SPECIAL[index][lang];
						
						break;
					}
					case 'CHANGE_VAR_BOOL':
					{
						events[i]['varName'] = options.children[0].value;
						events[i]['value'] = options.children[1].checked;
						events[i]['changeType'] = options.children[2].value;
						break;
					}
					case 'CHANGE_VAR_NUMBER':
					{
						events[i]['varName'] = options.children[0].value;
						events[i]['value'] = Number(options.children[1].value);
						events[i]['changeType'] = options.children[2].value;
						break;
					}
					case 'WAIT':
					{
						events[i]['time'] = Number(options.children[0].value);
						events[i]['ignoreSlowDown'] = options.children[1].checked;
						break;
					}
					case 'PLAY_BGM':
					case 'PUSH_BGM':
					case 'PLAY_IN_BETWEEN_BGM':
					{
						events[i]['bgm'] = options.children[0].value;
						events[i]['mode'] = options.children[1].value;
						events[i]['volume'] = options.children[2].value;
						break;
					}
					case 'PAUSE_BGM':
					case 'RESUME_BGM':
					case 'POP_BGM':
					{
						events[i]['mode'] = options.children[0].value;
						break;
					}
					case 'SET_DEFAULT_BGM':
					{
						events[i]['defaultBgm'] = options.children[0].value;
						events[i]['mode'] = options.children[1].value;
						break;
					}
					case 'RESUME_DEFAULT_BGM':
					{
						events[i]['mode'] = options.children[0].value;
						events[i]['delayed'] = options.children[1].checked;
						break;
					}
					case 'SET_CONTACT_ONLINE':
					{
						events[i]['member'] = options.children[0].value;
						events[i]['online'] = options.children[1].checked;
						break;
					}
					case 'SET_PLAYER_CORE':
					{
						events[i]['core'] = options.children[0].value;
						events[i]['value'] = options.children[1].checked;
						break;
					}
				}
			}
		}
	}
	
	$('#json').val(JSON.stringify(events));
}

function load()
{
	try
	{
		var events = JSON.parse($('#json').val());
		$('#events').empty();
		
		for(var i = 0; i < events.length; i++)
		{
			$('#events').append('<tr><td><button class="delete">Delete</button></td><td>' + MENU + '</td><td></td></tr>');
			var index = $('#events').children().length-1;
			var row = document.getElementById('events').rows[index];
			row.cells[1].children[0].value = events[i]['type'];
			setEvent(row.cells[1].children[0]);
			var options = row.cells[2];
			
			switch(events[i]['type'])
			{
				case 'SHOW_MSG':
				{
					SPECIAL[index] = {'en_US': '', 'de_DE': '', 'zh_CN': '', 'ja_JP': '', 'ko_KR': ''};
					
					for(var lang in SPECIAL[index])
						if(events[i]['message'][lang] !== undefined)
							SPECIAL[index][lang] = events[i]['message'][lang];
					
					options.children[0].value = SPECIAL[index]['en_US'];
					options.children[2].checked = events[i]['autoContinue'];
					options.children[4].value = events[i]['person']['person'];
					options.children[5].value = events[i]['person']['expression'];
					break;
				}
				case 'SHOW_SIDE_MSG':
				{
					SPECIAL[index] = {'en_US': '', 'de_DE': '', 'zh_CN': '', 'ja_JP': '', 'ko_KR': ''};
					
					for(var lang in SPECIAL[index])
						if(events[i]['message'][lang] !== undefined)
							SPECIAL[index][lang] = events[i]['message'][lang];
					
					options.children[0].value = SPECIAL[index]['en_US'];
					options.children[3].value = events[i]['person']['person'];
					options.children[4].value = events[i]['person']['expression'];
					break;
				}
				case 'CHANGE_VAR_BOOL':
				{
					options.children[0].value = events[i]['varName'];
					options.children[1].checked = events[i]['value'];
					options.children[2].value = events[i]['changeType'];
					break;
				}
				case 'CHANGE_VAR_NUMBER':
				{
					options.children[0].value = events[i]['varName'];
					options.children[1].value = events[i]['value'];
					options.children[2].value = events[i]['changeType'];
					break;
				}
				case 'WAIT':
				{
					options.children[0].value = events[i]['time'];
					options.children[1].checked = events[i]['ignoreSlowDown'];
					break;
				}
				case 'PLAY_BGM':
				case 'PUSH_BGM':
				case 'PLAY_IN_BETWEEN_BGM':
				{
					options.children[0].value = events[i]['bgm'];
					options.children[1].value = events[i]['mode'];
					options.children[2].value = events[i]['volume'];
					break;
				}
				case 'PAUSE_BGM':
				case 'RESUME_BGM':
				case 'POP_BGM':
				{
					options.children[0].value = events[i]['mode'];
					break;
				}
				case 'SET_DEFAULT_BGM':
				{
					options.children[0].value = events[i]['defaultBgm'];
					options.children[1].value = events[i]['mode'];
					break;
				}
				case 'RESUME_DEFAULT_BGM':
				{
					options.children[0].value = events[i]['mode'];
					options.children[1].checked = events[i]['delayed'];
					break;
				}
				case 'SET_CONTACT_ONLINE':
				{
					options.children[0].value = events[i]['member'];
					options.children[1].checked = events[i]['online'];
					break;
				}
				case 'SET_PLAYER_CORE':
				{
					options.children[0].value = events[i]['core'];
					options.children[1].checked = events[i]['value'];
					break;
				}
			}
		}
	}
	catch(error) {$('#json').val(error);}
}

function setEvent(e)
{
	var type = e.value;
	var properties = e.parentElement.parentElement.children[2];
	var index = e.parentElement.parentElement.rowIndex;
	
	switch(type)
	{
		case 'SHOW_MSG':
		{
			properties.innerHTML = '<input type="text" oninput="inputLang(this)"></input>' + LANG_MODULE + ' Auto-Continue? ' + INPUT['CHECKBOX'] + '<br>Character: ' + MSG_CHARS + ' Expression: ' + MSG_EXP;
			SPECIAL[index] = {'en_US': '', 'de_DE': '', 'zh_CN': '', 'ja_JP': '', 'ko_KR': ''};
			break;
		}
		case 'SHOW_SIDE_MSG':
		{
			properties.innerHTML = '<input type="text" oninput="inputLang(this)"></input>' + LANG_MODULE + '<br>Character: ' + MSG_CHARS + ' Expression: ' + MSG_EXP;
			SPECIAL[index] = {'en_US': '', 'de_DE': '', 'zh_CN': '', 'ja_JP': '', 'ko_KR': ''};
			break;
		}
		case 'CHANGE_VAR_BOOL':
		{
			properties.innerHTML = INPUT['TEXT'] + INPUT['CHECKBOX'] + BOOL_SETTINGS;
			break;
		}
		case 'CHANGE_VAR_NUMBER':
		{
			properties.innerHTML = INPUT['TEXT'] + INPUT['NUMBER'] + NUMBER_SETTINGS;
			break;
		}
		case 'WAIT':
		{
			properties.innerHTML = INPUT['NUMBER'] + 's &nbsp; Ignore Slow Effects? ' + INPUT['CHECKBOX'];
			break;
		}
		case 'PLAY_BGM':
		case 'PUSH_BGM':
		case 'PLAY_IN_BETWEEN_BGM':
		{
			properties.innerHTML = BGM_TRACK_LIST + BGM_SWITCH_MODE + ' Volume (0-1): ' + INPUT['NUMBER'];
			break;
		}
		case 'PAUSE_BGM':
		case 'RESUME_BGM':
		case 'POP_BGM':
		{
			properties.innerHTML = BGM_SWITCH_MODE;
			break;
		}
		case 'SET_DEFAULT_BGM':
		{
			properties.innerHTML = BGM_DEFAULT_TRACKS + BGM_SWITCH_MODE;
			break;
		}
		case 'RESUME_DEFAULT_BGM':
		{
			properties.innerHTML = BGM_SWITCH_MODE + INPUT['CHECKBOX'];
			break;
		}
		case 'SET_PLAYER_CORE':
		{
			properties.innerHTML = PLAYER_CORE + INPUT['CHECKBOX'];
			break;
		}
		case 'SET_CONTACT_ONLINE':
		{
			properties.innerHTML = PARTY_OPTIONS + INPUT['CHECKBOX'];
			break;
		}
		default: 
		{
			properties.innerHTML = '';
			break;
		}
	}
}

function inputLang(e)
{
	var field = e.value; // ...
	var lang = e.parentElement.children[1].value; // en_US
	var index = e.parentElement.parentElement.rowIndex; // Table Row #
	SPECIAL[index][lang] = field;
	update();
}

function setLang(e)
{
	var lang = e.value;
	var index = e.parentElement.parentElement.rowIndex;
	e.parentElement.children[0].value = SPECIAL[index][lang];
	update();
}

function toggleSafeMode()
{
	if($('#safemode').is(':checked'))
		$('#json').prop('readonly', true);
	else
		$('#json').prop('readonly', false);
}

// genSel() = generateSelection()
function genSel(tags, onchange = 'update()')
{
	var output = '';
	
	if(tags.constructor === Object)
	{
		output += '<select onchange="' + onchange + '">';
		
		for(var key in tags)
			output += '<option value="' + key + '">' + tags[key] + '</option>';
		
		output += '</select>';
	}
	else if(tags.constructor === Array)
	{
		output += '<select onchange="' + onchange + '">';
		
		for(var i = 0; i < tags.length; i++)
			output += '<option value="' + tags[i] + '">' + tags[i] + '</option>';
		
		output += '</select>';
	}
	
	return output;
}

$(document).ready(function()
{
	$('#events').on('click', '.delete', function() {$(this).closest('tr').remove(); update();});
	$('#add').click(function() {$('#events').append('<tr><td><button class="delete">Delete</button></td><td>' + MENU + '</td><td></td></tr>'); update();});
});