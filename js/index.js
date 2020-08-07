$(document).ready(() => {
	updateCode()
	if (window.innerWidth <= 768) {
		applyPreset('mobile', true)
		$('.bookmarklink').removeClass('animate__animated')
	}
})
$('input, textarea').change(updateCode)
$('.bookmarklink').click(e => e.preventDefault())
$('.copycode').click(() => {
	copy($('#code').val())
	alert('Copiado para a área de transferência')
})

const presets = {
	'desktop': {
		checks: ['#bgTypeChanThumb', '#thumbPositionTop', '#thumbRadiusCircle'],
		values: {
			'#bgURL': '',
			'#bgColor': '#000000',
			'#bgOpacity': '50',
			'#bgBlur': '15',
			'#vignette': '0',
			'#thumbSize': '200',
			'#thumbMargin': '10',
			'#nameSize': '50',
			'#nameFont': '',
			'#nameColor': '#ffffff',
			'#counterSize': '120',
			'#counterFont': '',
			'#counterMargin': '100',
			'#counterColor': '#ffffff'
		}
	},
	
	'mobile': {
		checks: ['#bgTypeChanThumb', '#thumbPositionTop', '#thumbRadiusCircle'],
		values: {
			'#bgURL': '',
			'#bgColor': '#000000',
			'#bgOpacity': '50',
			'#bgBlur': '15',
			'#vignette': '0',
			'#thumbSize': '150',
			'#thumbMargin': '10',
			'#nameSize': '30',
			'#nameFont': '',
			'#nameColor': '#ffffff',
			'#counterSize': '50',
			'#counterFont': '',
			'#counterMargin': '30',
			'#counterColor': '#ffffff'
		}
	}
}

$(document).ready(updateInputValues)

function updateInputValues() {
	$('.custom-range').each(function () {
		const value = $(this).val()
		$(this).closest('.input').find('.inputValue').text(value)
	})
}

$('.custom-range').on('change mousemove', function () {
	const value = $(this).val()
	$(this).closest('.input').find('.inputValue').text(value)
})

function applyPreset(presetName, skipConfirm = false) {
	const preset = presets[presetName]
	if (skipConfirm || confirm('AVISO: Se você aplicar este preset, todas as suas personalizações serão perdidas. Continuar?')) {
		preset.checks.forEach(id => $(id).prop('checked', true))
		for (id in preset.values) {
			$(id).val(preset.values[id])
		}
		updateInputValues()
		updatePreview()
	}
}

function getOptions() {
	return {
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
		nameFont: $('#nameFont').val(),
		counterFont: $('#counterFont').val(),
		counterMargin: $('#counterMargin').val(),
		nameColor: $('#nameColor').val(),
		counterColor: $('#counterColor').val(),
		apiKey: $('#apiKey').val(),
		customCSS: $('#customCSS').val()
	}
}

function getCode() {
	const options = JSON.stringify(getOptions())
	return `javascript:if('undefined'==typeof ytcountloaded)if('studio.youtube.com'==window.location.hostname){const ytcountloaded=true;var info=${options};function loadScript(e){return new Promise(function(t,o){console.log('Loading script: '+e);let n=document.createElement('script');n.onload=t,n.onerror=o,n.src=e,document.getElementsByTagName('head')[0].appendChild(n)})}async function load(){document.head.innerHTML='',document.body.innerHTML='Aguarde...',await loadScript('https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js'),await loadScript('https://cdn.jsdelivr.net/npm/js-sha1@0.6.0/src/sha1.min.js'),await loadScript('https://cdn.jsdelivr.net/npm/odometer@0.4.8/odometer.js'),await loadScript('https://josejefferson.github.io/contador-de-inscritos-preciso/js/structure.js'),await loadScript('https://josejefferson.github.io/contador-de-inscritos-preciso/js/functions.js'),start()}load()}else confirm('Você não está no YouTube Studio.\\nDeseja ser redirecionado ao YouTube Studio?')&&(window.open('https://studio.youtube.com'));else alert('O contador de inscritos já foi carregado\\nAtualize a página se quiser carregar novamente')`
}

function updateCode() {
	const code = getCode()
	$('.bookmarklink').attr('href', code)
	$('#code').val(code)
}

function copy(text) {
	const el = document.createElement('textarea')
	el.value = text
	document.body.appendChild(el)
	el.select()
	document.execCommand('copy')
	document.body.removeChild(el)
}