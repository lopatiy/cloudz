function Cloud(z) {
    var range = settings.dispersion || 300;
    this.x = Math.ceil(Math.random() * range) - range / 2;
    this.z = z;
    this.y = 0;

    this.xV = Math.random() - 0.5 < 0 ? -0.5 : 0.5;
    this.yV = 0;
    this.zV = 0;
}

Cloud.prototype.update = function () {
    this.x += this.xV;

    return this;
};

Cloud.prototype.toString = function () {
    var styleObj = {
        transform: 'translate3d(' + this.x + 'px, ' + this.y + 'px, -' + this.z + 'px)',
        filter: 'blur(' + Math.ceil(this.z / 2000) + 'px)'
    };

    styleObj['-webkit-filter'] = styleObj['-moz-filter'] = styleObj.filter;

    return '<div class="cloud" style="' + style(styleObj) + '"></div>';
};