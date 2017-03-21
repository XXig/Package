var windowHeight = $(window).height(),windowWidth = $(window).width();
document.documentElement.style.fontSize = $(document.documentElement).width()/3.75 + 'px';
$(window).on('resize', function() {
	document.documentElement.style.fontSize = $(document.documentElement).width()/3.75 + 'px';
});
function $$(selector, context) {
	context = context || document;
	var elements = context.querySelectorAll(selector);
	return Array.prototype.slice.call(elements);
}
$$('.logo path').forEach(function(path) {
	var p = path.style;
	p.strokeDasharray=p.strokeDashoffset = path.getTotalLength();
});
$('#path3').one('webkitAnimationEnd animationend',function(){
	$('.logo path').css({fill:"#abced4",stroke:"none"});
	$(".load-btn").show().one("touchstart",function(){
			$(".load ul").addClass("fadeOut"),
			$(".load").addClass("load-acitve"),
			$(".one").addClass(function(){
				audio.play();
				return 'one-a';
			}).css("opacity",1);
		});
});
$$('.one li').forEach(function(li) {
	var len = li.textContent.length, s = li.style;
	s.width = len + 'ch';
	s.animationTimingFunction ="steps("+len+"),steps(1)";
});