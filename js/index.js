const presetDesktopValues = {
	checks: ["#bgTypeChanThumb", "#thumbPositionTop", "#thumbRadiusCircle"],
	values: {
		"#bgURL": "",
		"#bgOpacity": "50",
		"#bgBlur": "15",
		"#vignette": "0",
		"#thumbSize": "200",
		"#thumbMargin": "10",
		"#nameSize": "50",
		"#counterSize": "120",
		"#counterMargin": "100"
	}
}

const presetMobileValues = {
	checks: ["#bgTypeChanThumb", "#thumbPositionTop", "#thumbRadiusCircle"],
	values: {
		"#bgURL": "",
		"#bgOpacity": "50",
		"#bgBlur": "15",
		"#vignette": "0",
		"#thumbSize": "150",
		"#thumbMargin": "10",
		"#nameSize": "30",
		"#counterSize": "50",
		"#counterMargin": "30"
	}
}

var vue = new Vue({
	el: 'body',
	data: {
		bgOpacity: $('#bgOpacity').val(),
		bgBlur: $('#bgBlur').val(),
		vignette: $('#vignette').val(),
		thumbSize: $('#thumbSize').val(),
		thumbMargin: $('#thumbMargin').val(),
		nameSize: $('#nameSize').val(),
		counterSize: $('#counterSize').val(),
		counterMargin: $('#counterMargin').val()
	}
});

function resetForm() {
	vue.bgOpacity = $('#bgOpacity').val();
	vue.bgBlur = $('#bgBlur').val();
	vue.vignette = $('#vignette').val();
	vue.thumbSize = $('#thumbSize').val();
	vue.thumbMargin = $('#thumbMargin').val();
	vue.nameSize = $('#nameSize').val();
	vue.counterSize = $('#counterSize').val();
	vue.counterMargin = $('#counterMargin').val();
	bgColor.setColor('#000000');
	nameColor.setColor('#ffffff');
	counterColor.setColor('#ffffff');
}

defaultColors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
	'#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b',
	'#ffffff', '#000000'
]

const bgColor = Pickr.create({
	el: '#bgColor-picker',
	theme: 'nano',
	default: '#000000',
	comparison: true,
	swatches: defaultColors,
	components: {
		preview: true,
		hue: true,
		interaction: {
			input: true,
			save: true
		}
	},
	strings: {
		save: 'Salvar'
	}
});

const nameColor = Pickr.create({
	el: '#nameColor-picker',
	theme: 'nano',
	default: '#ffffff',
	comparison: true,
	swatches: defaultColors,
	components: {
		preview: true,
		hue: true,
		interaction: {
			input: true,
			save: true
		}
	},
	strings: {
		save: 'Salvar'
	}
});

const counterColor = Pickr.create({
	el: '#counterColor-picker',
	theme: 'nano',
	default: '#ffffff',
	comparison: true,
	swatches: defaultColors,
	components: {
		preview: true,
		hue: true,
		interaction: {
			input: true,
			save: true
		}
	},
	strings: {
		save: 'Salvar'
	}
});

bgColor.on('save', function () {
	$('#bgColor').val(bgColor.getColor().toHEXA().toString());
});

nameColor.on('save', function () {
	$('#nameColor').val(nameColor.getColor().toHEXA().toString());
});

counterColor.on('save', function () {
	$('#counterColor').val(counterColor.getColor().toHEXA().toString());
});

function presetDesktop(skipConfirm = false) {
	if (skipConfirm || confirm("AVISO: Se você aplicar este preset, todas as suas personalizações serão perdidas. Continuar?")) {
		presetDesktopValues.checks.forEach(id => $(id).prop("checked", true));
		for (id in presetDesktopValues.values) { $(id).val(presetDesktopValues.values[id]) }
		resetForm();
	}
}

function presetMobile(skipConfirm = false) {
	if (skipConfirm || confirm("AVISO: Se você aplicar este preset, todas as suas personalizações serão perdidas. Continuar?")) {
		presetMobileValues.checks.forEach(id => $(id).prop("checked", true));
		for (id in presetMobileValues.values) { $(id).val(presetMobileValues.values[id]) }
		resetForm();
	}
}

if (window.innerWidth <= 768) {
	presetMobile(true)
	$('.bookmarklink').removeClass('animate__animated')
}

function getCode() {

	const options = {
		bgType: $('.bgType:checked').val(),
		bgColor: $('#bgColor').val(),
		bgURL: $('#bgURL').val(),
		bgOpacity: $('#bgOpacity').val(),
		bgBlur: $('#bgBlur').val(),
		vignette: $('#vignette').val(),
		thumbPosition: $('.thumbPosition:checked').val(),
		thumbSize: $('#thumbSize').val(),
		thumbRadius: $('.thumbRadius:checked').val(),
		thumbMargin: $('#thumbMargin').val(),
		nameSize: $('#nameSize').val(),
		counterSize: $('#counterSize').val(),
		counterMargin: $('#counterMargin').val(),
		nameColor: $('#nameColor').val(),
		counterColor: $('#counterColor').val(),
		apiKey: $('#apiKey').val(),
		customCSS: $('#customCSS').val()
	}

	return `javascript:if("undefined"==typeof ytcountloaded)if("studio.youtube.com"==window.location.hostname){var info=${JSON.stringify(options)};function loadScript(e){return new Promise(function(t,o){console.log("Loading script: "+e);let n=document.createElement("script");n.onload=t,n.onerror=o,n.src=e,document.getElementsByTagName("head")[0].appendChild(n)})}async function load(){document.head.innerHTML="",document.body.innerHTML="Aguarde...",await loadScript("https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"),await loadScript("https://cdn.jsdelivr.net/npm/js-sha1@0.6.0/src/sha1.min.js"),await loadScript("https://cdn.jsdelivr.net/npm/odometer@0.4.8/odometer.js"),await loadScript("https://josejefferson.github.io/accurate-sub-count/structure.js"),await loadScript("https://josejefferson.github.io/accurate-sub-count/functions.js"),start()}load()}else confirm("Você não está no YouTube Studio.\\nDeseja ser redirecionado ao YouTube Studio?")&&(window.location.href="https://studio.youtube.com");else alert("O contador de inscritos já foi carregado\\nAtualize a página se quiser carregar novamente")`
}

function update() {
	const code = getCode()
	$('.bookmarklink').attr('href', code)
	$('#code').val(code)
}

function copy(text) {
	const el = document.createElement('textarea');
	el.value = text;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

$(document).ready(update)
$('input, textarea').change(update)
$('.bookmarklink').click(e => e.preventDefault())
$('.copycode').click(() => {
	copy($('#code').val())
	alert('Copiado para a área de transferência')
})