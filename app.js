var vars = {
	guidelines : false,
	_fps : 25
}	

Object.defineProperty(vars, 'fps', {
  	enumerable: true,
  	configurable: true,
	get: function(){
		return this._fps;
	},
	set : function(val){
		this._fps = val;
		start();
	}
})


function renderGuidlines(){
	if(vars.guidelines){
		$('.container').append('<div class="guideline gtl"></div><div class="guideline gtr"></div><div class="guideline gbl"></div><div class="guideline gbr"></div>');
	}
}

function renderClouds(){
	var result = ''

	for(var i= 0; i<clouds.length; i+=1){
		result += clouds[i].update();
	}

	$('.container').append(result);
}

function renderSettings(){
	var keys = Object.keys(vars);

	for(var i = 0; i < keys.length; i++){
		if(keys[i][0] == "_"){
			continue;
		}
		
		var type = 'text';

		switch(typeof vars[keys[i]]){
			case 'boolean': type = 'checkbox'; break;
			case 'number': type = 'number'; break;
			case 'string':
			default: type = 'text';
		}

		$('.settings')
		.append('<label for=var-'+keys[i]+'">'+keys[i]+'</label>')
		.append('<input class="input-'+type+'" value="'+vars[keys[i]]+'" id="'+keys[i]+'" type="'+type+'"/>')
		.append('<br/>');

	}
	$('.settings').append('<button onclick="stop()">Stop</button><button onclick="start()">Start</button>');

	$('.settings .input-text').on('change', function(event){
		vars[this.id] = this.value;
	})

	$('.settings .input-number').on('change', function(event){
		vars[this.id] = this.value;
	})

	$('.settings .input-checkbox').on('change', function(event){
		vars[this.id] = this.checked;
	})
}

function update(){
	$('.container').html('');

	renderGuidlines();
	renderClouds();
}

function stop(){
	window.clearInterval(vars.interval);
}

function start(){
	stop();
	vars.interval = setInterval(update, 1000/vars.fps)
}


var clouds = [];

function fillClouds(number){
	clouds.length = 0;
	for(var i = 0; i < number; i++){
		clouds.push(new Cloud(i*500));
	}
}

$(document).ready(function(){
	renderSettings();
	fillClouds(10);
	start();
});