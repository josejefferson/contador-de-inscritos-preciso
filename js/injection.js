if (typeof ytcountloaded == 'undefined') {
	if (window.location.hostname == 'studio.youtube.com') {
		var info = {
			bgType: 'chanThumb',
			bgColor: '#000000',
			bgURL: '',
			bgOpacity: '50',
			bgBlur: '15',
			vignette: '0',
			thumbPosition: 'top',
			thumbSize: '200',
			thumbRadius: '50',
			thumbMargin: '10',
			nameSize: '50',
			counterSize: '120',
			counterMargin: '100',
			nameColor: '#FFFFFF',
			counterColor: '#FFFFFF',
			apiKey: '',
			customCSS: ''
		}

		function loadScript(url) {
			return new Promise(function (resolve, reject) {
				console.log('Loading script: ' + url)
				let script = document.createElement('script')
				script.onload = resolve
				script.onerror = reject
				script.src = url
				document.getElementsByTagName('head')[0].appendChild(script)
			})
		}

		async function load() {
			document.head.innerHTML = ''
			document.body.innerHTML = 'Aguarde...'
			await loadScript('https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js')
			await loadScript('https://cdn.jsdelivr.net/npm/js-sha1@0.6.0/src/sha1.min.js')
			await loadScript('https://cdn.jsdelivr.net/npm/odometer@0.4.8/odometer.js')
			await loadScript('https://josejefferson.github.io/contador-de-inscritos-preciso/js/structure.js')
			await loadScript('https://josejefferson.github.io/contador-de-inscritos-preciso/js/functions.js')
			start()
		}
		load()
	} else {
		if (confirm('Você não está no YouTube Studio.\nDeseja ser redirecionado ao YouTube Studio?'))
			window.location.href = 'https://studio.youtube.com'
	}
} else {
	alert('O contador de inscritos já foi carregado\nAtualize a página se quiser carregar novamente')
}