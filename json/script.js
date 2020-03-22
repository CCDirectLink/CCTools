"use strict";

const $$ = (() => {
	return () => {
		if(FIELD.value !== '')
		{
			try
			{
				let data = JSON.parse(FIELD.value);
				let result;
				
				if(MODE.checked)
					result = JSON.stringify(data);
				else
				{
					result = beautify(data);
					
					try {JSON.parse(result);}
					catch(error)
					{
						console.error(error);
						throw "There was an error with the program.";
					}
				}
				
				if(ASCII.checked)
					result = result.replace(/[\u007F-\uFFFF]/g, c => {return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).substr(-4)});
				
				FIELD.value = result;
			}
			catch(error)
			{
				FIELD.value = error;
				console.error(error);
			}
		}
	}
	
	/**
	 * @arguments: JSON, Tabs
	 * @return: String
	 */
	function beautify(data, height = 0, fromObject = false)
	{
		let output = '';
		
		if(data !== null && data.constructor === Object)
		{
			if(Object.keys(data).length === 0)
				output += JSON.stringify(data);
			else
			{
				let indent = fromObject ? '\n' + tabs(height) : '';
				output += indent + '{\n';
				let index = 1;
				
				for(let key in data)
				{
					let comma = (index++ === Object.keys(data).length) ? '' : ',';
					output += tabs(height+1) + beautify(key) + ((!REMOVE.checked && !isExpansive(data[key])) ? ': ' : ':') + beautify(data[key], height+1, true) + comma + '\n';
				}
				
				output += tabs(height) + '}';
			}
		}
		else if(data !== null && data.constructor === Array)
		{
			if(data.length === 0 || isSimpleArray(data))
				output += JSON.stringify(data);
			else
			{
				let indent = fromObject ? '\n' + tabs(height) : '';
				output += indent + '[\n';
				
				for(let i = 0; i < data.length; i++)
				{
					let comma = (i === data.length-1) ? '' : ',';
					output += tabs(height+1) + beautify(data[i], height+1) + comma + '\n';
				}
				
				output += tabs(height) + ']';
			}
		}
		else
			output += JSON.stringify(data);
		
		return output;
	}
	
	// [1,2,3,4,5], not ["a",{},"c",4]. ["one","two","three"] is a simple array but is not included within this scope.
	function isSimpleArray(array)
	{
		for(const value of array)
			if(value && value.constructor !== Number)
				return false;
		return true;
	}
	
	function tabs(amount = 0)
	{
		let output = '';
		
		while(amount-- > 0)
			output += '\t';
		
		return output;
	}
	
	function isExpansive(data)
	{
		if(data !== null && data.constructor === Object)
			return Object.keys(data).length !== 0;
		else if(data !== null && data.constructor === Array)
			return data.length !== 0 && !isSimpleArray(data);
		else
			return false;
	}
})();