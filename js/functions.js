const ytcountloaded = true;
const defaultAPIKey = "AIzaSyDpYBLktHtAzpr4RLpXouyIPiJUbziU85c";
var defaultTitle = document.title;
var subsTimer;
var googleAuthUser = 0;
var error = false;

if (typeof yt == 'undefined') {
	showError('Ocorreu um problema ao receber dados do usuário', 'Se estiver no celular, verifique se você ativou a Versão para computador\nSe não, tente recarregar a página e aguardar o carregamento completo antes de iniciar o contador')
	throw ''
}

new Odometer({ el: document.querySelector('.odometer') })
$('body').dblclick(fullscreen);
$('body').contextmenu(() => {
	$('body').toggleClass('cursorHidden')
});
$("#errorGetSubs").click(() => alert("Ocorreu um erro ao atualizar o contador de inscritos. Talvez o contador esteja desatualizado"));

async function start() {
	!error && repairParams();
	!error && await getChannelData();
	!error && writeSettings();
	!error && startSubCounter();
}

function repairParams() {
	info.findChan = yt.config_.CHANNEL_ID;
	!info.bgColor && (info.bgColor = "#000000");
	!info.bgURL && (info.bgURL = "");
	!info.bgOpacity && (info.bgOpacity = "50");
	!info.bgBlur && (info.bgBlur = "15");
	!info.vignette && (info.vignette = "0");
	!info.thumbSize && (info.thumbSize = "200");
	!info.thumbRadius && (info.thumbRadius = "50");
	!info.thumbMargin && (info.thumbMargin = "10");
	!info.nameSize && (info.nameSize = "50");
	!info.counterSize && (info.counterSize = "120");
	!info.nameFont && (info.nameFont = "");
	!info.counterFont && (info.counterFont = "");
	!info.counterMargin && (info.counterMargin = "100");
	!info.nameColor && (info.nameColor = "#FFFFFF");
	!info.counterColor && (info.counterColor = "#FFFFFF");
	!info.apiKey && (info.apiKey = "")
	!info.customCSS && (info.customCSS = "");

	!["solid", "url", "chanThumb"].includes(info.bgType) && (info.bgType = "chanThumb");
	!["left", "top"].includes(info.thumbPosition) && (info.thumbPosition = "top");
}

async function getChannelData() {
	$('#loadingMessage').text('Procurando informações do canal')

	await $.getJSON(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&id=${info.findChan}&key=${info.apiKey || defaultAPIKey}`, data => {
		if (data["pageInfo"]["totalResults"] != 0) {
			info.name = data['items'][0]['snippet']['title'];
			info.chanThumb = data['items'][0]['snippet']['thumbnails']['medium']['url'];
		} else {
			showError("Não foi possível localizar o canal", "Tente verificar se você digitou o nome/nome de usuário/ID do canal corretamente");
		}
	}).fail(err => {
		err.status == "403" && showError(`Erro de autorização (${err.status} ${err.statusText})`, "O YouTube limita a 10000 consultas ao seu servidor por dia\nTente inserir uma chave de API sua");
		err.status != "403" && showError(`Erro ${err.status} ${err.statusText}`, "Sem detalhes sobre este erro");
	})
}

function writeSettings() {
	defaultTitle = `Contador de inscritos de ${info.name}`;
	document.title = defaultTitle;
	$('link[rel="shortcut icon"]').attr('href', info.chanThumb || 'favicon.png');
	$('.chanThumb').attr('src', info.chanThumb);
	$('.name').text(info.name);
	$('#chanDetails').addClass((info.thumbPosition == 'top') ? 'imgTop' : 'imgLeft');
	$('body').css('background-color', info.bgColor);
	$('#subCounterContainer').css('box-shadow', `inset 0 0 ${info.vignette}px #000`);
	$('#backgroundImage').css({
		"background-color": info.bgColor,
		"background-image": `url('${info.bgType == "url" ? info.bgURL : info.bgType == "chanThumb" && info.chanThumb}')`,
		"filter": `blur(${info.bgBlur}px) opacity(${info.bgOpacity}%)`
	});
	$('.countContainer').css('margin-top', `${info.counterMargin}px`);
	$('.odometer').css({
		"color": info.counterColor,
		"font-size": `${info.counterSize}px`,
		"font-family": info.counterFont
	});
	$('.chanThumb').css({
		"border-radius": `${info.thumbRadius}%`,
		"width": `${info.thumbSize}px`
	});
	$('.imgTop .chanThumb').css('margin-bottom', `${info.thumbMargin}px`);
	$('.imgLeft .chanThumb').css('margin-right', `${info.thumbMargin}px`);
	$('.name').css({
		"color": info.nameColor,
		"font-size": `${info.nameSize}px`,
		"font-family": info.nameFont
	});
	$('head').append(`<style>${info.customCSS}</style>`);
}

function startSubCounter() {
	subCounterTimer = window.setTimeout(getSubs, 2000);
}

function stopSubCounter() {
	clearTimeout(subCounterTimer);
}

async function getSubs() {
	try {
		$('#loadingMessage').text('Verificando número de inscritos do canal')
		const resp = await fetch(`https://studio.youtube.com/youtubei/v1/creator/get_channel_dashboard?alt=json&key=${yt.config_.INNERTUBE_API_KEY}`, {
			method: "POST",
			headers: {
				"X-Goog-Authuser": googleAuthUser,
				"X-Origin": "https://studio.youtube.com",
				Cookie: document.cookie,
				Authorization: getAuth(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{
					"dashboardParams": {
						"channelId": yt.config_.CHANNEL_ID,
						"factsAnalyticsParams": {
							"nodes": [
								{
									"key": "DASHBOARD_FACT_ANALYTICS_LIFETIME_SUBSCRIBERS",
									"value": {
										"query": {
											"dimensions": [],
											"metrics": [
												{
													"type": "SUBSCRIBERS_NET_CHANGE"
												}
											],
											"restricts": [
												{
													"dimension": {
														"type": "USER"
													},
													"inValues": [
														yt.config_.CHANNEL_ID
													]
												}
											],
											"orders": [],
											"timeRange": {
												"unboundedRange": {}
											},
											"currency": "BRL",
											"returnDataInNewFormat": true,
											"limitedToBatchedData": false
										}
									}
								}
							]
						},
						"videoSnapshotAnalyticsParams": {
							"nodes": [
								{
									"key": "VIDEO_SNAPSHOT_DATA_QUERY",
									"value": {
										"getVideoSnapshotData": {
											"externalChannelId": yt.config_.CHANNEL_ID
										}
									}
								}
							]
						},
						"cardProducerTimeout": "CARD_PRODUCER_TIMEOUT_SHORT"
					},
					"context": {
						"client": {
							"clientName": yt.config_.INNERTUBE_CONTEXT_CLIENT_NAME,
							"clientVersion": yt.config_.INNERTUBE_CONTEXT_CLIENT_VERSION,
							"hl": yt.config_.HL,
							"gl": yt.config_.GL
						}
					}
				}
			)
		}).then(res => { if (res.status === 403) throw 403; return res.json() }).catch(err => { throw err })

		const subs = resp.cards[1].body.basicCard.item.channelFactsItem.channelFactsData.results.find(
			el => el.key === 'DASHBOARD_FACT_ANALYTICS_LIFETIME_SUBSCRIBERS').value.resultTable.metricColumns[0].counts.values[0]
		$('#subCounter').html(subs)
		$('#loadingScreen').fadeOut(200)
		document.title = `${subs} inscritos - ${defaultTitle}`
		subCounterTimer = window.setTimeout(getSubs, 2000)
	} catch (err) {
		if (err == 403) { googleAuthUser++; getSubs() } else {
			document.title = defaultTitle
			showError('Ocorreu um erro ao verificar número de inscritos', 'Tente verificar sua conexão com a internet ou recarregar a página')
		}
		subCounterTimer = window.setTimeout(getSubs, 10000)
	}
}

function getAuth() {
	let time = Math.round((new Date()).getTime() / 1000)
	let hash = sha1(`${time} ${getCookie('SAPISID')} https://studio.youtube.com`)
	return `SAPISIDHASH ${time}_${hash}`
}

function getCookie(name) {
	const cookieArr = document.cookie.split(';')

	for (let i = 0; i < cookieArr.length; i++) {
		const cookiePair = cookieArr[i].split('=')

		if (name == cookiePair[0].trim()) {
			return decodeURIComponent(cookiePair[1])
		}
	}

	return ''
}

function showError(text, details) {
	error = true;
	$("#loadingMessage").text(text).addClass("text-danger").click(() => {
		alert(details);
	});
	$("#loadingSpinner").addClass("hidden");
	$("#loadingError").removeClass("hidden");
	$('#loadingScreen').fadeIn(200);
}

function fullscreen() {
	var doc = window.document;
	var docEl = doc.documentElement;

	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);
	} else {
		cancelFullScreen.call(doc);
	}
}