const chanThumbURL = 'icons/preview.png'

window.onresize = updatePreview
window.onload = updatePreview
$('input').change(updatePreview)

const subCounterMobile = new Odometer({ el: document.querySelector('.subCounterMobile') })
const subCounterDesktop = new Odometer({ el: document.querySelector('.subCounterDesktop') })

function updatePreview() {
	const options = getOptions()

	$('.chanThumb').attr('src', chanThumbURL)
	$('.preview .chanDetails').addClass((options.thumbPosition == 'top') ? 'imgTop' : 'imgLeft')
	$('.preview').css('background-color', options.bgColor)
	$('.preview .subCounterContainer').css('box-shadow', `inset 0 0 ${options.vignette}px #000`)
	$('.preview .backgroundImage').css({
		'background-color': options.bgColor,
		'background-image': `url('${options.bgType == 'url' ? options.bgURL : options.bgType == 'chanThumb' && chanThumbURL}')`,
		'filter': `blur(${options.bgBlur}px) opacity(${options.bgOpacity}%)`
	})
	$('.preview.previewDesktop .countContainer').css('margin-top', `calc(((${options.counterMargin} * 100) / 1920) * 1%)`)
	$('.preview.previewMobile .countContainer').css('margin-top', `calc(((${options.counterMargin} * 100) / 360) * 1%)`)
	$('.preview .odometer').css({
		'color': options.counterColor,
		'font-family': options.counterFont
	})

	const ndpv = $('.previewDesktop').innerWidth()
	const nmpv = $('.previewMobile').innerWidth()
	$('.previewDesktop .name').css('font-size', parseInt(options.nameSize) * ndpv / 1920 + 'px')
	$('.previewMobile .name').css('font-size', parseInt(options.nameSize) * nmpv / 360 + 'px')

	const cdpv = $('.previewDesktop').innerWidth()
	const cmpv = $('.previewMobile').innerWidth()
	$('.subCounterDesktop').css('font-size', parseInt(options.counterSize) * cdpv / 1920 + 'px')
	$('.subCounterMobile').css('font-size', parseInt(options.counterSize) * cmpv / 360 + 'px')

	$('.preview.previewDesktop .chanThumb').css({
		'border-radius': `${options.thumbRadius}%`,
		'width': `calc(((${options.thumbSize} * 100) / 1920) * 1%)`
	})
	$('.preview.previewMobile .chanThumb').css({
		'border-radius': `${options.thumbRadius}%`,
		'width': `calc(((${options.thumbSize} * 100) / 360) * 1%)`
	})
	$('.preview.previewDesktop .imgTop .chanThumb').css('margin-bottom', `calc(((${options.thumbMargin} * 100) / 1920) * 1%)`)
	$('.preview.previewMobile .imgTop .chanThumb').css('margin-bottom', `calc(((${options.thumbMargin} * 100) / 360) * 1%)`)
	$('.preview .imgLeft .chanThumb').css('margin-right', `${options.thumbMargin}px`)
	$('.preview .name').css({
		'color': options.nameColor,
		'font-family': options.nameFont
	})
}

let currentValue = 12345678
function updateCounter() {
	currentValue += -2 + Math.floor(Math.random() * 20)
	subCounterMobile.update(currentValue)
	subCounterDesktop.update(currentValue)
	window.setTimeout(updateCounter, 3000)
}
updateCounter()