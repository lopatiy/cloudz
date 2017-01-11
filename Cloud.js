function Cloud(z){
	var range = 300;
	this.x = Math.ceil(Math.random()*range)-range/2;
	this.z = z;
	this.y = 0

	this.xV = this.x > 0 ? -0.5 : 0.5;
	this.yV = 0;
	this.zV = 0;
}

Cloud.prototype.update = function(){
	this.x += this.xV;

	if(this.x > 400 || this.x < -400){
		this.xV = -this.xV
	}

	return this;
}

Cloud.prototype.toString = function(){
	var styleStr = style({
		transform :  'translate3d(' + this.x + 'px, '+ this.y + 'px, -' + this.z + 'px)',
		filter : 'blur('+ Math.ceil(this.z / 1000) +'px)'
	})

	return '<div class="step" style="'+ styleStr+'"></div>';
}