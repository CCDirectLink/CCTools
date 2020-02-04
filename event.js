"use strict";

// MENU sorted by usage/frequency
const MENU = genSel(['','SHOW_MSG','SHOW_SIDE_MSG','CHANGE_VAR_BOOL','CHANGE_VAR_NUMBER','WAIT','PLAY_BGM','PAUSE_BGM','RESUME_BGM','PUSH_BGM','POP_BGM','PLAY_IN_BETWEEN_BGM','SET_DEFAULT_BGM','RESUME_DEFAULT_BGM','SET_CONTACT_ONLINE','SET_PLAYER_CORE'], 'setEvent(this)');
const INPUT = {'TEXT':'<input type="text" oninput="update()"></input>', 'NUMBER':'<input type="number" oninput="update()" class="small"></input>', 'CHECKBOX':'<input type="checkbox" onchange="update()"></input>'};
const LANG_MODULE = genSel({'en_US':'English', 'de_DE':'German', 'zh_CN':'Chinese', 'ja_JP':'Japanese', 'ko_KR':'Korean'}, 'setLang(this)');
const LANG_SETTINGS = {'en_US':'', 'de_DE':'', 'zh_CN':'', 'ja_JP':'', 'ko_KR':''};
// You'll need to add a type-in option here for all of the other characters.
const MSG_CHARS = genSel({
	'': '',
	'main.lea': 'Lea',
	'main.emilie': 'Emilie',
	'main.glasses': "C'tron",
	'main.buggy': 'Buggy',
	'main.grumpy': 'Albert/Beowulf',
	'main.guild-leader': 'Hlin',
	'main.schneider': 'Lukas/Schneider',
	'main.sergey': 'Sergey',
	'main.genius': 'Satoshi',
	'main.shizuka': 'Shizuka',
	'antagonists.fancyguy': 'Apollo',
	'antagonists.sidekick': 'Joern',
	'main.captain': 'Captain Jet',
	'main.carla': 'Carla',
	'antagonists.designer': 'The Designer',
	'antagonists.gautham-rl': 'Gautham',
	'main.schneider2': 'Evotar Lukas',
	'antagonists.gautham': 'Gautham (Obfuscated)',
	'main.sergey-rl': 'Sergey (Flashback)',
	'antagonists.gautham-rl2': 'Gautham (Flashback)',
	'main.genius-rl': 'Satoshi (Flashback)',
	'main.investor': 'Ivan Vestorovich',
	'antagonists.shady': 'Sidwell'
});
const MSG_EXP = genSel(['DEFAULT']);
const BOOL_SETTINGS = genSel(['set','and','or','xor']);
const NUMBER_SETTINGS = genSel(['set','add','sub','mul','div','mod']);
const BGM_TRACK_LIST = genSel(['silence','tutorial','intro','short','tutorial-battle','challenge','title','cargoship-exterior','lolfanfare','landmark','ability-got','exposition','designer','challenge2','puzzle-pg','bossbattle1','escape','crosscounter','oldHideout1','oldHideoutBattle','oldHideoutEnding','autumnsRise','fieldBattle','rhombusDungeon','rookieHarbor','firstScholars','bergenTrail','rhombusSquare','apolloTheme','coldDungeon','bergenVillage','heatArea','heatVillage','heatDungeon','shockDungeon','waveDungeon','treeDungeon','jungle','emilie','basinKeep','casual','briefing','ponder','lea','dreamsequence-intro','dreamsequence','sorrow','raidTheme','forestField','designerBoss1','waiting','aridField','aridBattle','shizukaConfrontation','evoDungeon1','evoDungeon2','evoEscape','sergeyExposition','schneiderTour','infiltration','sadness','oldHideout2','trueIntentions','rhombusSquare2','autumnsFall','snailBattle1','snailBattle2','lastDungeon','shizuka','finalBoss','credits','arena','s-rank','bossRush','glitchArea']);
const BGM_DEFAULT_TRACKS = genSel(['cargoShipIntro','cargoShip','cargoChallenge','cargoShipExterior','puzzle','hideout','hideout2','forest','autumn','autumnsFall','rookieHarbor','firstScholars','bergenTrail','bergenVillage','heatArea','rhombusSquare','rhombusSquare2','rhombusSquareArena','crossCentral','coldDungeon','heatVillage','heatGlitch','heatDungeonOutside','silence','silenceCombat','heatDungeon','jungle','basinKeep','shockDungeon','waveDungeon','treeDungeon','arid','aridDng','lastDng','lab']);
const BGM_SWITCH_MODE = genSel(['IMMEDIATELY','FAST_OUT','MEDIUM_OUT','SLOW_OUT','VERY_SLOW_OUT','FAST','MEDIUM','SLOW','VERY_SLOW']);
const PARTY_OPTIONS = genSel(['Lea','Shizuka','Shizuka0','Emilie','Sergey','Schneider','Schneider2','Hlin','Grumpy','Buggy','Glasses','Apollo','Joern','Triblader1']);
const PLAYER_CORE = genSel(['MOVE','CHARGE','DASH','CLOSE_COMBAT','GUARD','CREDITS','MENU','ELEMENT_NEUTRAL','ELEMENT_HEAT','ELEMENT_COLD','ELEMENT_SHOCK','ELEMENT_WAVE','QUICK_MENU','THROWING','ELEMENT_LOAD','ELEMENT_CHANGE','SPECIAL','COMBAT_RANK','QUEST_SWITCH','EXP','MENU_CIRCUIT','MENU_SYNOPSIS','MENU_SOCIAL','MENU_SOCIAL_INVITE','MENU_BOTANICS','ITEMS','MONEY','MODIFIER']);
var SPECIAL = [];

const PROPERTIES = {
	'SHOW_MSG': '<input type="text" oninput="inputLang(this)"></input>' + LANG_MODULE + ' Auto-Continue? ' + INPUT['CHECKBOX'] + '<br>Character: ' + MSG_CHARS + ' Expression: ' + MSG_EXP,
	'SHOW_SIDE_MSG': '<input type="text" oninput="inputLang(this)"></input>' + LANG_MODULE + '<br>Character: ' + MSG_CHARS + ' Expression: ' + MSG_EXP,
	'CHANGE_VAR_BOOL': INPUT['TEXT'] + INPUT['CHECKBOX'] + BOOL_SETTINGS,
	'CHANGE_VAR_NUMBER': INPUT['TEXT'] + INPUT['NUMBER'] + NUMBER_SETTINGS,
	'WAIT': INPUT['NUMBER'] + 's &nbsp; Ignore Slow Effects? ' + INPUT['CHECKBOX'],
	'PLAY_BGM': BGM_TRACK_LIST + BGM_SWITCH_MODE + ' Volume (0-1): ' + INPUT['NUMBER'],
	'PAUSE_BGM': BGM_SWITCH_MODE,
	'SET_DEFAULT_BGM': BGM_DEFAULT_TRACKS + BGM_SWITCH_MODE,
	'RESUME_DEFAULT_BGM': BGM_SWITCH_MODE + ' Delayed? ' + INPUT['CHECKBOX'],
	'SET_CONTACT_ONLINE': PARTY_OPTIONS + INPUT['CHECKBOX'],
	'SET_PLAYER_CORE': PLAYER_CORE + INPUT['CHECKBOX']
};

const PROPERTIES_MAP = {
	'CHANGE_VAR_BOOL':
	{
		'varName': {'index':0},
		'value': {'index':1, 'type':'boolean'},
		'changeType': {'index':2}
	},
	'CHANGE_VAR_NUMBER':
	{
		'varName': {'index':0},
		'value': {'index':1, 'type':'number'},
		'changeType': {'index':2}
	},
	'WAIT':
	{
		'time': {'index':0, 'type':'number'},
		'ignoreSlowDown': {'index':1, 'type':'boolean'}
	},
	'PLAY_BGM':
	{
		'bgm': {'index':0},
		'mode': {'index':1},
		'volume': {'index':2, 'type':'number'}
	},
	'PAUSE_BGM':
	{
		'mode': {'index':0}
	},
	'SET_DEFAULT_BGM':
	{
		'defaultBgm': {'index':0},
		'mode': {'index':1}
	},
	'RESUME_DEFAULT_BGM':
	{
		'mode': {'index':0},
		'delayed': {'index':1, 'type':'boolean'}
	},
	'SET_CONTACT_ONLINE':
	{
		'member': {'index':0},
		'online': {'index':1, 'type':'boolean'}
	},
	'SET_PLAYER_CORE':
	{
		'core': {'index':0},
		'value': {'index':1, 'type':'boolean'}
	}
};

function update()
{
	var events = [];
	
	for(var i = 0, row; row = EVENTS_GUI.rows[i]; i++)
	{
		events[i] = {};
		
		for(var j = 1, options; options = row.cells[j]; j++)
		{
			if(j === 1)
				events[i]['type'] = options.children[0].value;
			else if(j === 2)
			{
				var type = events[i]['type'];
				
				// Redirect Requests //
				if(type === 'PUSH_BGM' || type === 'PLAY_IN_BETWEEN_BGM')
					type = 'PLAY_BGM';
				else if(type === 'RESUME_BGM' || type === 'POP_BGM')
					type = 'PAUSE_BGM';
				
				if(PROPERTIES_MAP[type] !== undefined)
				{
					for(var property in PROPERTIES_MAP[type])
					{
						var mode = PROPERTIES_MAP[type][property]['type'];
						var index = PROPERTIES_MAP[type][property]['index'];
						
						if(mode === 'boolean')
							events[i][property] = options.children[index].checked;
						else if(mode === 'number')
							events[i][property] = Number(options.children[index].value);
						else //string or other
							events[i][property] = options.children[index].value;
					}
				}
				else if(type === 'SHOW_MSG')
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
				}
				else if(type === 'SHOW_SIDE_MSG')
				{
					events[i]['person'] = {};
					events[i]['person']['person'] = options.children[3].value;
					events[i]['person']['expression'] = options.children[4].value;
					events[i]['message'] = {};
					var index = options.parentElement.rowIndex;
					
					for(var lang in SPECIAL[index])
						if(SPECIAL[index][lang] !== '')
							events[i]['message'][lang] = SPECIAL[index][lang];
				}
			}
		}
	}
	
	EVENTS_JSON.value = JSON.stringify(events);
}

function load()
{
	try
	{
		var events = JSON.parse(EVENTS_JSON.value);
		EVENTS_GUI.innerHTML = '';
		
		for(var i = 0; i < events.length; i++)
		{
			addRow(false);
			var index = EVENTS_GUI.rows.length - 1;
			var row = EVENTS_GUI.rows[index];
			row.cells[1].children[0].value = events[i]['type'];
			setEvent(row.cells[1].children[0], false);
			var options = row.cells[2];
			var type = events[i]['type'];
			
			// Redirect Requests //
			if(type === 'PUSH_BGM' || type === 'PLAY_IN_BETWEEN_BGM')
				type = 'PLAY_BGM';
			else if(type === 'RESUME_BGM' || type === 'POP_BGM')
				type = 'PAUSE_BGM';
			
			if(PROPERTIES_MAP[type] !== undefined)
			{
				for(var property in PROPERTIES_MAP[type])
				{
					var mode = PROPERTIES_MAP[type][property]['type'];
					var index = PROPERTIES_MAP[type][property]['index'];
					
					if(mode === 'boolean')
						options.children[index].checked = events[i][property];
					else //number, string, or other
						options.children[index].value = events[i][property];
				}
			}
			else if(type === 'SHOW_MSG')
			{
				SPECIAL[index] = LANG_SETTINGS;
				
				for(var lang in SPECIAL[index])
					if(events[i]['message'][lang] !== undefined)
						SPECIAL[index][lang] = events[i]['message'][lang];
				
				options.children[0].value = SPECIAL[index]['en_US'];
				options.children[2].checked = events[i]['autoContinue'];
				options.children[4].value = events[i]['person']['person'];
				options.children[5].value = events[i]['person']['expression'];
			}
			else if(type === 'SHOW_SIDE_MSG')
			{
				SPECIAL[index] = LANG_SETTINGS;
				
				for(var lang in SPECIAL[index])
					if(events[i]['message'][lang] !== undefined)
						SPECIAL[index][lang] = events[i]['message'][lang];
				
				options.children[0].value = SPECIAL[index]['en_US'];
				options.children[3].value = events[i]['person']['person'];
				options.children[4].value = events[i]['person']['expression'];
			}
		}
	}
	catch(error) {EVENTS_JSON.value = error;}
}

function setEvent(e, call = true)
{
	var type = e.value;
	var properties = e.parentElement.parentElement.children[2];
	var index = e.parentElement.parentElement.rowIndex;
	
	// Redirect Requests //
	if(type === 'PUSH_BGM' || type === 'PLAY_IN_BETWEEN_BGM')
		type = 'PLAY_BGM';
	else if(type === 'RESUME_BGM' || type === 'POP_BGM')
		type = 'PAUSE_BGM';
	
	if(PROPERTIES[type] !== undefined)
		properties.innerHTML = PROPERTIES[type];
	else
		properties.innerHTML = '';
	
	if(type === 'SHOW_MSG' || type === 'SHOW_SIDE_MSG')
		SPECIAL[index] = LANG_SETTINGS;
	
	if(call)
		update();
}

function inputLang(e, call = true)
{
	var field = e.value; // ...
	var lang = e.parentElement.children[1].value; // en_US
	var index = e.parentElement.parentElement.rowIndex; // Table Row #
	SPECIAL[index][lang] = field;
	
	if(call)
		update();
}

function setLang(e, call = true)
{
	var lang = e.value;
	var index = e.parentElement.parentElement.rowIndex;
	e.parentElement.children[0].value = SPECIAL[index][lang];
	
	if(call)
		update();
}

function toggleSafeMode()
{
	if(EVENTS_JSON_SAFEMODE.checked)
		EVENTS_JSON.readOnly = true;
	else
		EVENTS_JSON.readOnly = false;
}

// generateSelection //
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

function addRow(call = true)
{
	var row = EVENTS_GUI.insertRow();
	row.insertCell(0).innerHTML = '<button onclick="removeRow(this)">Delete</button>';
	row.insertCell(1).innerHTML = MENU;
	row.insertCell(2);
	
	if(call)
		update();
}

function removeRow(e, call = true)
{
	var row = e.parentNode.parentNode;
	row.parentNode.removeChild(row);
	
	if(call)
		update();
}