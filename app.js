var settings = {
    cloudDeltaZ: 100,
    dispersion: 2000,
    clouds: 20,
    guidelines: false,
    _fps: 25
};

Object.defineProperty(settings, 'fps', {
    enumerable: true,
    configurable: true,
    get: function () {
        return this._fps;
    },
    set: function (val) {
        this._fps = val;
        start();
    }
});


function renderGuidlines() {
    if (settings.guidelines) {
        $('.container').append(
            '<div class="guideline gt"></div>'
            +'<div class="guideline back"></div>'
            +'<div class="guideline gb"></div>');
    }
}

function renderClouds() {
    var result = '';

    for (var i = 0; i < clouds.length; i += 1) {
        result += clouds[i].update();
    }

    $('.container').append(result);
}

function renderSettings() {
    var keys = Object.keys(settings);

    for (var i = 0; i < keys.length; i++) {
        if (keys[i][0] == "_") {
            continue;
        }

        var type = 'text';

        switch (typeof settings[keys[i]]) {
            case 'boolean':
                type = 'checkbox';
                break;
            case 'number':
                type = 'number';
                break;
            case 'string':
            default:
                type = 'text';
        }

        $('.settings')
            .append('<label for=var-' + keys[i] + '">' + keys[i] + '</label>')
            .append('<input class="input-' + type + '" value="' + settings[keys[i]] + '" id="' + keys[i] + '" type="' + type + '"/>')
            .append('<br/>');

    }
    $('.settings').append(
        '<button onclick="setup()">Reset</button>'
        +'<button onclick="stop()">Stop</button>'
        +'<button onclick="start()">Start</button>');

    $('.settings .input-text').on('change', function (event) {
        settings[this.id] = this.value;
    });

    $('.settings .input-number').on('change', function (event) {
        settings[this.id] = this.value;
    });

    $('.settings .input-checkbox').on('change', function (event) {
        settings[this.id] = this.checked;
    })
}

function update() {
    $('.container').html('');

    renderGuidlines();
    renderClouds();
}

function stop() {
    window.clearInterval(settings.interval);
}

function start() {
    stop();
    settings.interval = setInterval(update, 1000 / settings.fps)
}


var clouds = [];

function fillClouds(number) {
    clouds.length = 0;
    for (var i = 0; i < number; i++) {
        clouds.push(new Cloud(i * settings.cloudDeltaZ));
    }
}

function setup() {
    stop();
    fillClouds(settings.clouds);
    start();
}

$(document).ready(function () {
    renderSettings();
    setup();
});