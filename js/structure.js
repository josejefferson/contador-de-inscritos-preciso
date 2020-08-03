const metadata = `
<meta name="viewport" content="width=device-width">
`

const dependencies = `
<link rel="shortcut icon" href="" type="image/png">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/odometer@0.4.8/themes/odometer-theme-default.css">
`

const styles = `
<style>
body {
	margin: 0;
	overflow-x: hidden;
	overflow-y: auto;
	user-select: none;
}

#loadingScreen {
	align-items: center;
	background: #e0e0e0;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	position: absolute;
	width: 100%;
	z-index: 3;
}

#loadingScreen #tip {
	position: absolute;
	bottom: 30px;
}

#subCounterContainer {
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	position: absolute;
	text-align: center;
	width: 100%;
	z-index: 2;
}

#backgroundImage {
	background-position: center;
	background-size: cover;
	height: 100%;
	position: absolute;
	width: 100%;
	z-index: 1;
}

#chanDetails {
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

#chanDetails.imgTop {
	flex-direction: column;
}

.errors {
	position: fixed;
	bottom: 10px;
	right: 10px;
	z-index: 4;
}

.hidden {
	display: none !important;
}
</style>
`

const structure = `<div id="loadingScreen">
	<div id="loadingSpinner" class="spinner-border text-primary" role="status"></div>
	<svg id="loadingError" class="hidden" viewBox="0 0 24 24" width="48" height="48" fill="#dc3545">
		<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
		</path>
	</svg>
	<span class="mt-2 text-center" id="loadingMessage">Aguarde...</span>
	<span id="tip" class="text-muted d-none d-md-block text-center"></span>
</div>

<div id="subCounterContainer">
	<div id="chanDetails">
		<img class="chanThumb shadow-lg" draggable="false">
		<div class="name"></div>
	</div>

	<div class="countContainer">
		<div class="odometer" id="subCounter"></div>
	</div>
</div>

<div id="backgroundImage" class="screen"></div>

<div class="errors">
	<span id="hideSubCount" class="hidden" title="Este canal não exibe publicamente seu contador de inscritos">
		<svg viewBox="0 0 24 24" width="24" height="24" stroke="white" stroke-width="2" fill="gold">
			<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
		</svg>
	</span>

	<span id="errorGetSubs" class="hidden"
		title="Ocorreu um erro ao atualizar o contador de inscritos. Talvez o contador esteja desatualizado">
		<svg viewBox="0 0 24 24" width="24" height="24" stroke="white" stroke-width="2" fill="red">
			<path
				d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z">
			</path>
		</svg>
	</span>
</div>`

$('head').html(metas + dependencies + styles)
$('body').html(structure)
