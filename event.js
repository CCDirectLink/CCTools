"use strict";

const EVENT_TYPE = ['PARALLEL','CUTSCENE','INTERRUPTABLE','AUTO_CONTROL','COMBAT_CUTSCENE'];
const EVENT_TRIGGER_TYPE = ['ALWAYS','ONCE_PER_ENTRY','ONCE'];

const INPUT = {'TEXT':'<input type="text" oninput="update()"></input>', 'NUMBER':'<input type="number" oninput="update()" class="small"></input>', 'CHECKBOX':'<input type="checkbox" onchange="update()"></input>'};
const LANG_MODULE = genSel({'en_US':'English', 'de_DE':'German', 'zh_CN':'Chinese', 'ja_JP':'Japanese', 'ko_KR':'Korean'}, 'setLang(this)');
const LANG_SETTINGS = {'en_US':'', 'de_DE':'', 'zh_CN':'', 'ja_JP':'', 'ko_KR':''};
// You'll need to add a type-in option here for all of the other characters.
const MSG_CHARS = genSel({
	'': '',
	'main.lea': 'Lea',
	'main.emilie': 'Emilie',
	'main.glasses': "C'tron",
	'main.sergey': 'Sergey',
	'main.shizuka': 'Shizuka',
	'main.genius': 'Satoshi',
	'antagonists.fancyguy': 'Apollo',
	'antagonists.sidekick': 'Joern',
	'main.schneider': 'Schneider',
	'main.guild-leader': 'Hlin',
	'main.grumpy': 'Albert',
	'main.buggy': 'Buggy',
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
}, 'changeExpSet(this)');
const MSG_EXP = {
	'default': ['DEFAULT'],
	'main.lea': ['DEFAULT','DOWN_EYE_CLOSED','SAD','MOPING','NOD','SHAKE','NOD_NERVOUS','SLEEPING','WAKING','SURPRISED','SURPRISED_TOWARD','ASTONISHED','SURPRISED_AWAY','THINKING','NERVOUS','SCARED','PROUD','SMUG','WHISTLING','SHOCKED','ANNOYED','HOLD_HORNS','HOLD_HORNS_ANNOYED','EXCITED','NOD_HAPPY','CHARMED','PAIN','DETERMINED','EXHAUSTED','SMILE','TOUCHED','COMPLEX','CONFUSED','SHOUT','SHOUT_PANIC','ANGRY','PAIN_EYE_CLOSED','DISGUSTED','DEAD_INSIDE','DEAD_INSIDE2','PRE_CRY1','PRE_CRY2','NODS_DEAD_INSIDE','SHAKE_EYE_CLOSED','SHAKE_PANIC','SHAKE_SCARED','PANIC','NOD_SAD','NOD_HARD1','NOD_HARD2','SHAKE_SAD','SAD_AWAY','HAND_ONE','HAND_ONE_THINKING','HAND_TWO','HAND_TWO_THINKING','HAND_THREE','HAND_THREE_THINKING','HAND_FOUR','HAND_FOUR_SMUG','HAND_FIVE','HAND_WEIRD','HAND_POINT','HAND_POINT_SELF','HAND_SELF_SURPRISED','HAND_POINT_JOKE','HAND_POINT_DETERMINED','WRAP_SHOULDER','WRAP_HEAD','CRY','STAR_POINTING_PRE','STAR_POINTING','INSANE','INSANE_DOWN'],
	'main.emilie': ['DEFAULT','SUSPICIOUS','DETERMINED','SMILE','SAD','BROKEN','SCREAM','DEAD_INSIDE','UP','SHRUG','TAUNTING','SWEATY_SMILE','ASTONISHED','SHOCKED','HAPPY','PAIN','AWAY','EMBARRASSED','WATCH_OUT_BADASS','EXHAUSTED','MOPING','CURIOUS','SCOLDING','ANGRY','SHOUT','UNCERTAIN','PRE_CRY','CRY'],
	'main.glasses': ['DEFAULT','EMBARRASSED','SMILE','SHOCKED','DOWN','THOUGHTFUL','PAIN','SAD','EXHAUSTED','TOWARD','SURPRISED','WORRIED','AWESOME','SMUG','HAND_FIVE','HAND_WEIRD','HAND_WTF'],
	'main.sergey': ['DEFAULT','ROLL_EYES','JOKING','SHOUTING','SMILE','SURPRISED','SHOCK','DOWN','WORRIED','SERIOUS','EYES_CLOSED','WHISTLING','DRAMATIC','INTENSE1','INTENSE2','AWAY','NOTIFYING','THINKING','COMPLEX','DESPERATE','TOUCHED','ANGRY','SHOUTING2'],
	'main.shizuka': ['DEFAULT','SUSPICIOUS','SARCASTIC','STRICT','SHOCK','SHOUT','SURPRISED','DOWN','ANGRY','DENYING','EVIL_GRIN','CONCERNED','SCREAM','SMILE','SAD','BADASS','TOWARD','YELL','ANNOYED','CONFLICTED','INNOCENT','HOLD'],
	'main.genius': ['DEFAULT','SMILE','SHOUT','DOWN','SERIOUS','DRAMATIC','EXHAUSTED','AWAY','ASKING','SAD','CHAIR_DEFAULT','CHAIR_SIDE','CHAIR_DOWN','CHAIR_BACK','HOLD'],
	'antagonists.fancyguy': ['DEFAULT','ANGRY','MOPING','DUMBFOUNDED','DOWN','POINTING','SHOUTING','LECTURING','PONDERING','SUSPICIOUS','CONTENT','RAGING'],
	'antagonists.sidekick': ['DEFAULT','SMILE','SARCASTIC','AWWW','UP','SUSPICIOUS','SURPRISED','TOWARD','ANGRY'],
	'main.schneider': ['DEFAULT','SKEPTICAL','EYES_CLOSED','WORRIED','PISSED','PONDERING','NORM_SERIOUS','UP','LAUGH','WONDERING','COMPLAINING','RANTING','SURPRISED','TOWARDS','WINK','WHISTLING','SERIOUS','SHOCKED','PANIC'],
	'main.guild-leader': ['DEFAULT','EXCITED','SMILE','SURPRISED','TOWARDS','ANGRY','THINKING','DETERMINED','DOWN','EMBARRASSED','EYES_CLOSED','WORRIED'],
	'main.grumpy': ['DEFAULT','ANGRY','EYES_CLOSED','UP','ANNOYED','SURPRISED','AWAY','SARCASTIC','SMILE'],
	'main.buggy': ['DEFAULT','GRIN','UP','JOKING','LAUGHING','DOWN','LAUGHING_DOWN','EMBARRASSED'],
	'main.captain': ['DEFAULT','STERN','SMILE','CONCERNED','DOWN','DOWN_SMILE','TOWARD','SCEPTICAL','SHOUT','ROAR','DARK','PLOTTING','ANGRY','DEFAULT_GLASS','STERN_GLASS','SMILE_GLASS','CONCERNED_GLASS','DOWN_GLASS','DOWN_SMILE_GLASS','TOWARD_GLASS','SCEPTICAL_GLASS','SHOUT_GLASS','ROAR_GLASS','PLOTTING_GLASS','ANGRY_GLASS'],
	'main.carla': ['DEFAULT','SMILE','SMUG','WHISTLING','GRIN','UP','ANGRY','UP_GRIN','WONDERING','EXCITED','TOWARD','NERVOUS','IRRITATED','SIDE_SMILE','GLASS_DEFAULT','GLASS_SMILE','GLASS_COOL','GLASS_WHISTLING','GLASS_GRIN','GLASS_UP','GLASS_UP_COOL','GLASS_ANGRY','GLASS_UP_GRIN','GLASS_TOWARD','GLASS_NERVOUS','GLASS_IRRITATED'],
	'antagonists.designer': ['DEFAULT','BORED','CONDESCENDING','LAUGH','DOWN','DOWN_TALK','SMILE','CONFUSED','TOWARD','TOWARD_TALK','FROWN','SHOUT','BROKEN','DEFAULT_AR','BORED_AR','CONDESCENDING_AR','LAUGH_AR','DOWN_AR','DOWN_TALK_AR','SMILE_AR','CONFUSED_AR','TOWARD_AR','TOWARD_TALK_AR','FROWN_AR','SHOUT_AR'],
	'antagonists.gautham-rl': ['DEFAULT','PANIC','AWAY','AWAY_PANIC','DOWN','DOWN_PANIC'],
	'main.schneider2': ['DEFAULT','SKEPTICAL','EYES_CLOSED','WORRIED','PISSED','PONDERING','PONDERING_NORM','NORM_SERIOUS','UP','LAUGH','WONDERING','COMPLAINING','RANTING','SURPRISED','TOWARDS','WINK','WHISTLING','SERIOUS','SHOCKED','PANIC'],
	'antagonists.gautham': ['DEFAULT'],
	'main.sergey-rl': ['DEFAULT','ROLL_EYES','JOKING','SHOUTING','SMILE','DOWN','WORRIED','SERIOUS','EYES_CLOSED','WHISTLING','DRAMATIC','AWAY','NOTIFYING','THINKING','SURPRISED'],
	'antagonists.gautham-rl2': ['DEFAULT','ANGRY','WHY','AWAY','COMPLAINING','SARCASTIC','DOWN','SNARL'],
	'main.genius-rl': ['DEFAULT'],
	'main.investor': ['DEFAULT','SURPRISED','SERIOUS','DOWN','PONDERING','LAUGHING','TOWARD','THINKING'],
	'antagonists.shady': ['DEFAULT','EMBARRASSED','SMILE','SMUG','THOUGHTFUL_NORM','TOWARD','SURPRISED','WORRIED','THOUGHTFUL_TOWARD','DOWN','THOUGHTFUL','SAD','COMPLEX','NOSTALGIC','MASKED','MASKED_SMILE','MASKED_UNPLEASED','MASKED_WARN','MASKED_LAUGH','MASKED_DOWN','MASKED_GRIN','MASKED_DOWN_SMILE','MASKED_GNASH','MASKED_FROWN']
};
const SPEED_OPTIONS = genSel(['NORMAL','FAST','FASTER','FASTEST','FASTESTEST','SLOW','SLOWER','SLOWEST','SLOWESTEST','SLOWEST_DREAM','IMMEDIATELY']);
const KEY_SPLINES = genSel(['EASE_IN_OUT','EASE_OUT','EASE_IN','EASE','EASE_SOUND','LINEAR','JUMPY','EASE_OUT_STRONG','EASE_IN_STRONG']);
const BOOL_SETTINGS = genSel(['set','and','or','xor']);
const NUMBER_SETTINGS = genSel(['set','add','sub','mul','div','mod']);
const BGM_TRACK_LIST = genSel(['silence','tutorial','intro','short','tutorial-battle','challenge','title','cargoship-exterior','lolfanfare','landmark','ability-got','exposition','designer','challenge2','puzzle-pg','bossbattle1','escape','crosscounter','oldHideout1','oldHideoutBattle','oldHideoutEnding','autumnsRise','fieldBattle','rhombusDungeon','rookieHarbor','firstScholars','bergenTrail','rhombusSquare','apolloTheme','coldDungeon','bergenVillage','heatArea','heatVillage','heatDungeon','shockDungeon','waveDungeon','treeDungeon','jungle','emilie','basinKeep','casual','briefing','ponder','lea','dreamsequence-intro','dreamsequence','sorrow','raidTheme','forestField','designerBoss1','waiting','aridField','aridBattle','shizukaConfrontation','evoDungeon1','evoDungeon2','evoEscape','sergeyExposition','schneiderTour','infiltration','sadness','oldHideout2','trueIntentions','rhombusSquare2','autumnsFall','snailBattle1','snailBattle2','lastDungeon','shizuka','finalBoss','credits','arena','s-rank','bossRush','glitchArea']);
const BGM_DEFAULT_TRACKS = genSel(['cargoShipIntro','cargoShip','cargoChallenge','cargoShipExterior','puzzle','hideout','hideout2','forest','autumn','autumnsFall','rookieHarbor','firstScholars','bergenTrail','bergenVillage','heatArea','rhombusSquare','rhombusSquare2','rhombusSquareArena','crossCentral','coldDungeon','heatVillage','heatGlitch','heatDungeonOutside','silence','silenceCombat','heatDungeon','jungle','basinKeep','shockDungeon','waveDungeon','treeDungeon','arid','aridDng','lastDng','lab']);
const BGM_SWITCH_MODE = genSel(['IMMEDIATELY','FAST_OUT','MEDIUM_OUT','SLOW_OUT','VERY_SLOW_OUT','FAST','MEDIUM','SLOW','VERY_SLOW']);
const PARTY_OPTIONS = genSel(['Lea','Shizuka','Shizuka0','Emilie','Sergey','Schneider','Schneider2','Hlin','Grumpy','Buggy','Glasses','Apollo','Joern','Triblader1']);
const PLAYER_CORE = genSel(['MOVE','CHARGE','DASH','CLOSE_COMBAT','GUARD','CREDITS','MENU','ELEMENT_NEUTRAL','ELEMENT_HEAT','ELEMENT_COLD','ELEMENT_SHOCK','ELEMENT_WAVE','QUICK_MENU','THROWING','ELEMENT_LOAD','ELEMENT_CHANGE','SPECIAL','COMBAT_RANK','QUEST_SWITCH','EXP','MENU_CIRCUIT','MENU_SYNOPSIS','MENU_SOCIAL','MENU_SOCIAL_INVITE','MENU_BOTANICS','ITEMS','MONEY','MODIFIER']);
const ELEMENTS = genSel(['NEUTRAL','HEAT','COLD','SHOCK','WAVE']);
const GAME_MOBILITY_BLOCK = genSel({'NONE':'None', 'TELEPORT':'Teleport', 'SAVE':'Teleport+Save', 'CHECKPOINT':'Teleport+Save+Checkpoint', 'NO_MAP_LEAVE':'Teleport+Save+Checkpoint+Leaving Map'});
const SP_LEVEL = genSel({'0':'0 SP', '1':'4 SP', '2':'8 SP', '3':'12 SP', '4':'16 SP'});

const MENU = genSel(['','SHOW_MSG','SHOW_SIDE_MSG','SET_CAMERA_POS','CHANGE_VAR_BOOL','CHANGE_VAR_NUMBER','WAIT','PLAY_BGM','PAUSE_BGM','RESUME_BGM','PUSH_BGM','POP_BGM','PLAY_IN_BETWEEN_BGM','SET_DEFAULT_BGM','RESUME_DEFAULT_BGM','SET_CONTACT_ONLINE','SET_PLAYER_CORE','GOTO_TITLE','ADD_MONEY','REMOVE_MONEY','ADD_CP','SET_MOBILITY_BLOCK','SET_FORCE_COMBAT','SET_PLAYER_SP_LEVEL','INCREASE_PLAYER_SP_LEVEL','SET_ALL_PLAYER_CORE'], 'setEvent(this)');

const PROPERTIES = {
	'GENERIC_VALUE_BOOLEAN': INPUT['CHECKBOX'],
	'GENERIC_VALUE_NUMBER': INPUT['NUMBER'],
	'GENERIC_VALUE': INPUT['TEXT'],
	'SHOW_MSG': '<input type="text" oninput="inputLang(this)"></input>' + LANG_MODULE + ' Auto-Continue? ' + INPUT['CHECKBOX'] + '<br>Character: ' + MSG_CHARS + ' Expression: ' + genSel(MSG_EXP['default']),
	'SHOW_SIDE_MSG': '<input type="text" oninput="inputLang(this)"></input>' + LANG_MODULE + '<br>Character: ' + MSG_CHARS + ' Expression: ' + genSel(MSG_EXP['default']),
	'SET_CAMERA_POS': 'x=' + INPUT['NUMBER'] + ' y=' + INPUT['NUMBER'] + ' Speed: ' + SPEED_OPTIONS + '<br>Behavior: ' + KEY_SPLINES + ' Wait until camera is done? ' + INPUT['CHECKBOX'] + '<br>Wait Skip: ' + INPUT['NUMBER'] + 's &nbsp; Zoom Level (Multiplicative): ' + INPUT['NUMBER'],
	'CHANGE_VAR_BOOL': INPUT['TEXT'] + INPUT['CHECKBOX'] + BOOL_SETTINGS,
	'CHANGE_VAR_NUMBER': INPUT['TEXT'] + INPUT['NUMBER'] + NUMBER_SETTINGS,
	'WAIT': INPUT['NUMBER'] + 's &nbsp; Ignore Slow Effects? ' + INPUT['CHECKBOX'],
	'PLAY_BGM': BGM_TRACK_LIST + BGM_SWITCH_MODE + ' Volume (0-1): ' + INPUT['NUMBER'],
	'PAUSE_BGM': BGM_SWITCH_MODE,
	'SET_DEFAULT_BGM': BGM_DEFAULT_TRACKS + BGM_SWITCH_MODE,
	'RESUME_DEFAULT_BGM': BGM_SWITCH_MODE + ' Delayed? ' + INPUT['CHECKBOX'],
	'SET_CONTACT_ONLINE': PARTY_OPTIONS + INPUT['CHECKBOX'],
	'SET_PLAYER_CORE': PLAYER_CORE + INPUT['CHECKBOX'],
	'ADD_MONEY': INPUT['NUMBER'],
	'ADD_CP': ELEMENTS + INPUT['NUMBER'],
	'SET_MOBILITY_BLOCK': 'Prevent the player from doing: ' + GAME_MOBILITY_BLOCK,
	'SET_PLAYER_SP_LEVEL': SP_LEVEL
};

const PROPERTIES_MAP = {
	'GENERIC_VALUE_BOOLEAN':
	{
		'value': {'index':0, 'type':'boolean'}
	},
	'GENERIC_VALUE_NUMBER':
	{
		'value': {'index':0, 'type':'number'}
	},
	'GENERIC_VALUE':
	{
		'value': {'index':0}
	},
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
	},
	'ADD_MONEY':
	{
		'amount': {'index':0, 'type':'number'}
	},
	'ADD_CP':
	{
		'element': {'index':0},
		'amount': {'index':1, 'type':'number'}
	}
};

const PROPERTIES_REDIRECT = {
	'GENERIC_VALUE_BOOLEAN': ['SET_FORCE_COMBAT','SET_ALL_PLAYER_CORE'],
	'GENERIC_VALUE_NUMBER': [],
	'GENERIC_VALUE': ['SET_MOBILITY_BLOCK','SET_PLAYER_SP_LEVEL'],
	'PLAY_BGM': ['PUSH_BGM','PLAY_IN_BETWEEN_BGM'],
	'PAUSE_BGM': ['RESUME_BGM','POP_BGM'],
	'ADD_MONEY': ['REMOVE_MONEY']
};

//const PROPERTIES_MAP_REDIRECT to separate the two

var SPECIAL = [];

function update()
{
	var events = [];
	
	for(var i = 0, row; row = EVENTS_GUI.rows[i]; i++)
	{
		events[i] = {};
		var type = row.cells[1].children[0].value;
		events[i]['type'] = type;
		var options = row.cells[2];
		
		if(PROPERTIES_MAP[type] === undefined && type !== 'SHOW_MSG' && type !== 'SHOW_SIDE_MSG' && type !== 'SET_CAMERA_POS')
			type = redirect(type);
		
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
		else if(type === 'SET_CAMERA_POS')
		{
			events[i]['pos'] = {};
			events[i]['pos']['x'] = Number(options.children[0].value);
			events[i]['pos']['y'] = Number(options.children[1].value);
			events[i]['speed'] = options.children[2].value;
			events[i]['transition'] = options.children[4].value;
			events[i]['wait'] = options.children[5].checked;
			events[i]['waitSkip'] = Number(options.children[7].value);
			events[i]['zoom'] = Number(options.children[8].value);
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
			addRow(undefined, false);
			var index = EVENTS_GUI.rows.length-1;
			var row = EVENTS_GUI.rows[index];
			var type = events[i]['type'];
			row.cells[1].children[0].value = type;
			setEvent(row.cells[1].children[0], false);
			var options = row.cells[2];
			
			if(PROPERTIES_MAP[type] === undefined && type !== 'SHOW_MSG' && type !== 'SHOW_SIDE_MSG' && type !== 'SET_CAMERA_POS')
				type = redirect(type);
			
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
				changeExpSet(options.children[4], false);
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
				changeExpSet(options.children[3], false);
				options.children[4].value = events[i]['person']['expression'];
			}
			else if(type === 'SET_CAMERA_POS')
			{
				options.children[0].value = events[i]['pos']['x'];
				options.children[1].value = events[i]['pos']['y'];
				options.children[2].value = events[i]['speed'];
				options.children[4].value = events[i]['transition'];
				options.children[5].checked = events[i]['wait'];
				options.children[7].value = events[i]['waitSkip'];
				options.children[8].value = events[i]['zoom'];
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
	
	if(PROPERTIES[type] === undefined && type !== 'SHOW_MSG' && type !== 'SHOW_SIDE_MSG')
		type = redirect(type);
	
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

function changeExpSet(e, call = true)
{
	var character = e.value;
	var options = e.parentNode;
	var type = options.parentNode.cells[1].children[0].value;
	var index = -1;
	
	if(type === 'SHOW_MSG')
		index = 5;
	else if(type === 'SHOW_SIDE_MSG')
		index = 4;
	
	if(index !== -1 && MSG_EXP[character] !== undefined)
	{
		var expset = genSel(MSG_EXP[character]);
		expset = expset.substring(expset.indexOf('>')+1, expset.lastIndexOf('<'));
		options.children[index].innerHTML = expset;
	}
	else
		options.children[index].innerHTML = genSel(MSG_EXP['default']);
	
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

function redirect(type)
{
	for(var key in PROPERTIES_REDIRECT)
		for(var i = 0; i < PROPERTIES_REDIRECT[key].length; i++)
			if(type === PROPERTIES_REDIRECT[key][i])
				type = key;
	
	return type;
}

function addRow(index = undefined, call = true)
{
	var row;
	
	if(index !== undefined)
		row = EVENTS_GUI.insertRow(index);
	else
		row = EVENTS_GUI.insertRow();
	
	row.insertCell(0).innerHTML = '<button onclick="removeRow(this)">Delete</button>';
	row.insertCell(1).innerHTML = MENU;
	row.insertCell(2);
	row.insertCell(3).innerHTML = '<button onclick="addRow(this.parentNode.parentNode.rowIndex+1)">Add</button>';
	
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