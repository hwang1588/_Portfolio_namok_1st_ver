

/* Link */
function navLink(item) {
	var hrefURL = $(item).attr("href")	
	if($('#gnb').hasClass('on')){
		if($(item).hasClass('nav')){
			return false;
		}else{
			location.href = baseURL + hrefURL;
			return false;
		}
	}else{
		location.href = baseURL + hrefURL;
		return false;
	}
}


/*** Layout **/


/*** Template ***/
$(function(){
	/* Vusual Area */
	$('.visual_area .img').imgLiquid({fill:true, horizontalAlign:'center', verticalAlign:'center'});


	
	/* btn_top */
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.btn_top').addClass('on');
		} else {
			$('.btn_top').removeClass('on');
		}
	});
	$('.btn_top').click(function(){;
		$('html, body').stop().animate({scrollTop:$('#wrap').offset().top}, 800);
		//return false;
	});
	
	$(window).scroll(function() {
		scrollEvent2();
	});

	$(window).resize(function() {
		scrollEvent2();
	});
	
	function isMobile() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

	function scrollEvent2() {
		if (isMobile()) {
		   var scrollEnd = ($(document).height() - window.visualViewport.height) - $('footer').innerHeight() + 10;
		} else {
			var scrollEnd = ($(document).height() - $(window).height()) - $('footer').innerHeight() + 10;
		}
		
		if($(window).scrollTop() > scrollEnd){
			$('.btn_top').addClass("act");
		}else{
			$('.btn_top').removeClass("act");
		}
	}
	
	/* 21.03.29 추가 */
	function scroll_button(){
		if(!$('.btn_top').length) return;

		// circle progress scroll
		$.circleProgress.defaults.animation = false;
		$.circleProgress.defaults.value = 0;
		//$.circleProgress.defaults.size = 65;
		$.circleProgress.defaults.startAngle = -Math.PI / 4 * 2;
		$.circleProgress.defaults.thickness = '2';
		$.circleProgress.defaults.emptyFill = '#eee';
		$.circleProgress.defaults.fill = { color: '#e51737' };

		$('.btn_progress').circleProgress();
	}

	function scroll_button_resize(){
		$('.btn_progress').circleProgress('redraw');
		$('html, body').stop().animate({scrollTop:$(window).scrollTop() + 1}, 0);
	}

	function init_resize(){
		scroll_button_resize();
	}

	$(function(){
		scroll_button();
		$(window).on('resize',init_resize);
	});
	/* //21.03.29 추가 */
	

	/* Tab */
	$.fn.tabTy = function(){
		$.each(this, function(i,v){
			$(v).closest('.tab_anchor').find('a').removeClass('on');
			$(v).addClass('on');
			var s = $(v).attr("href");
			$(s).parent().find('.tab_cont').removeClass('on');
			$(s).addClass('on');
		});
	};
	$('.tab_anchor a').click(function(){	
		$(this).tabTy();
		return false;
	});

	
	/* accordian_ty */
	$.fn.accordian_ty = function(){
		var tar = $(this).closest('.list');
		var foldingChk = tar.hasClass('on');
		if (foldingChk){
			tar.removeClass('on');
		} else {
			tar.siblings('.list').removeClass('on');
			tar.addClass('on');
		}
	};	
	$('.accordian_ty .list .btn').click(function(){
		$(this).accordian_ty();
		return false;
	});

	
	/* poup */
	$('.modal_body').attr("tabindex", 0).focus();
	$('.pop_inner,.view_area').attr("tabindex", 0).focus();
	$('.pop_close').attr("tabindex", 0).focus();
	$.fn.popOpen = function(){
		$(this).click(function(e){
			var s = $(this).attr("href");
			$(s).popup('show');
			$('body').addClass('on');
			$(this).addClass('chk1');
		});
		return this;
	};
	$('.btn_pop').popOpen();	
	
	$('.btn_pop_close').click(function(){
		$('.btn').focus();
		$('.btn').removeClass('chk1');
	});			
	$('.btn_pop_close').keydown(function(e){
		if(event.keyCode == 9){
			$('.pop_inner,.view_area').focus();
			return false;
		}
	});
	$('.pop_inner,.view_area').keydown(function(e){
		var isShift = window.event.shiftKey ? true : false;
		if(isShift && (e.keyCode == 9)){
			$('.btn_pop_close').focus();
			return false;
		}
	});
	
});

function pop_close(){
	$('.modal').popup('hide');
	$('body').removeClass('on');
}



/*** Contents ***/	
$(function(){
	//$('.img_visual .img_p, .ceo_cont .img_p, .thumb_info .img_p, .map_cont, .box_list03 .img').imgLiquid({fill:true, horizontalAlign:'center', verticalAlign:'center'});
	$('.ceo_cont .img_p, .thumb_info .img_p, .map_cont, .box_list03 .img').imgLiquid({fill:true, horizontalAlign:'center', verticalAlign:'center'});
	$('.pba_box .img').imgLiquid({fill:true, horizontalAlign:'80%', verticalAlign:'center'});
});

function chk_view(obj) {
	var m = $(obj).closest('.table_select').find('select option:selected').val();
	console.log(m)
	$(obj).closest('.cont_dep').find('.tab_cont').removeClass('on');
	$(obj).closest('.cont_dep').find('#'+m+'').addClass('on');
}


$.fn.visualBanner = function(){
	$.each(this, function(i,v){
		var $highlight = function() { 
			var items = $(v).find('.visual_banner').triggerHandler('currentVisible');
			$(v).find('.visual_banner').children().removeClass('act');
			items.addClass('act');	
			if($(v).find('.visual_banner .li').hasClass('vid')){
				var video = document.getElementById("video");
				video.currentTime = 0;
			}

		};

		var $prev = $(v).find('.bn_prev');
		var $next = $(v).find('.bn_next');
		var $pagin = $(v).find('.bn_pagn');

		var n = $(v).find('.li').length
		function lan(n) {
		  return (n < 10 ? '0' : '') + n
		}
		$(v).find('.bn_pagn strong').html('01');
		$(v).find('.bn_pagn span').text(lan(n));

		if(n == 1){
			$(v).find('.visual_banner_control').css('display','none');
			$(v).find('.visual_banner').trigger("destroy");
		}

		$(v).find('.visual_banner').carouFredSel({
			responsive:true,
			firstLoadChk :true,
			direction:'left',
			circular:true,
			infinite:false,
			items:{visible:1},
			swipe:{onMouse:true, onTouch:true},
			auto:7000, 
			prev: {
				button: $prev,
				key: 'left'
			},
			next: {
				button: $next,
				key: 'right'
			},
			pagination:false,
			items:{start:0, visible:1},
			swipe:{onMouse:true, onTouch:true},
			scroll:{
				fx:'slide',
				duration:600,
				items:1, 
				easing :'swing',
				onBefore: function() {
					var pos = $(this).triggerHandler('currentPosition');
					$(v).find('.bn_pagn strong').html(lan(pos + 1));
				},
				onAfter:$highlight
			},
			onCreate:$highlight
		});

		$(v).find('.bn_play').click(function() {
			$(v).find('.visual_banner').trigger('play',true);
			$(v).find('.bn_play').hide();
			$(v).find('.bn_stop').show();
			return false;
		});
		$(v).find('.bn_stop').click(function() {
			$(v).find('.visual_banner').trigger('pause', true);;
			$(v).find('.bn_play').show();
			$(v).find('.bn_stop').hide();
			return false;
		});
	});
};

$(function(){
	

	/** 사업소개 **/
	if(!$('.visual_banner_area').length) return;
	$('.visual_banner_area').find('.img p').imgLiquid({fill:true, horizontalAlign:"center", verticalAlign:"center"});
    $('.visual_banner_area').visualBanner();
});


$(function(){
	$('.main_nav .dep_m').on('mouseover focusin',function(){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		var tar = $(this).closest('.dep');
		if(locW > locWs){
			$('.main_nav .dep').removeClass('over').removeClass('off');
			$(this).closest('.dep').addClass('over');
		} else {
			//return false;
		}	
	});
	$('.main_nav .dep_m').focusin(function(){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		var tar = $(this).closest('.dep');
		if(locW > locWs){
			$(this).closest('.dep').find('.tit a').focus()
			
		} else {
			//return false;
		}	
	});
	
	$('.main_nav .dep2').prepend('<div class=\"hit\"></div>');
	$('.main_nav .hit').mouseover(function(){
		$(this).closest('.dep').removeClass('over').addClass('off');
		setTimeout(function(){
			$('.main_nav .dep').removeClass('off')
		}, 500);
	});
	$('footer').mouseover(function(){
		main_nav_close();
	});

	$('header a, .namok_display a, footer a').focusin(function(){
		main_nav_close();	
	});
	
	function main_nav_close(){
		$('.main_nav .dep.over').removeClass('over').addClass('off');
		setTimeout(function(){
			$('.main_nav .dep').removeClass('off');
		}, 500);
	}
	
	$('.main_nav .dep_m2.nav').click(function(){
		var tar = $(this).closest('.li');

		var foldingChk = (tar.hasClass('over2'));
		tar.removeClass('over2');
		$('.main_nav').find('.li_dep .li').each (function(){
			$(this).removeClass('over2');
		});
		if (foldingChk){
			tar.removeClass('over2');
		} else {
			tar.addClass('over2');
		}
		return false;
	});
});


function mc_progress(){
	var mc_progress = $('.mc_progress')
	var mc_value = mc_progress.attr('data-value') / mc_progress.attr('data-end');

	mc_progress.circleProgress({
		value:mc_value,
		startAngle:4.75,
		size: 34,
		thickness:2,
		lineCap:'round',
		animation:{duration:7000, easing:'circleProgressEasing'} ,
		emptyFill:'rgba(255,255,255,0)',
		fill:'#fff'
	});
}

$.fn.mcSlideVisual = function(){
	$.each(this, function(i,v){
		var $highlight = function() { 
			var items = $(v).find('.namok_display_list').triggerHandler('currentVisible');
			$(v).find('.namok_display_list').children().removeClass('act');
			items.filter(':eq(0)').addClass('act');
			if($(v).find('.namok_display_list .li.act p').hasClass('mov')){
				$(v).find('.namok_display_list video').get(0).pause();
				$(v).find('.namok_display_list .act video').get(0).play()
			}
			mc_progress();
		};
		var $highlight2 = function() {
			var items2 = $(v).find('.namok_display_t').triggerHandler('currentVisible');
			$(v).find('.namok_display_t').children().removeClass('act');
			items2.filter(':eq(0)').addClass('act');
		};

		$prev = $(v).find('.mc_prev');
		$next = $(v).find('.mc_next');
		$play = $(v).find('.mc_play');
		$stop = $(v).find('.mc_stop');
		$pagn = $(v).find('.mc_pagn');

		$(v).find('.namok_display_t').carouFredSel({
			responsive:true, 
			firstLoadChk :true,    
			direction:'left',     
			circular:true,
			infinite:false,
			items:{visible:1},
			swipe:{onMouse:true, onTouch:true},
			auto:5000, 
			prev: {
				button: $prev,
				key: 'left'
			},
			next: {
				button: $next,
				key: 'right'
			},
			pagination:{
				container: $pagn,
				anchorBuilder: function(nr) {
					return '<a href="#"><div class="mc_progress" data-value="600" data-end="600">'+ (nr < 10 ? "0"+nr : nr) +'</div></a>';
				}
			},
			scroll:{
				fx:'fade',
				items:1,
				//pauseOnHover:true,
				duration:0,
				onAfter:$highlight2,
				onBefore: function() {
					var pos = $(this).triggerHandler('currentPosition');
					var page = Math.floor( pos );
					$(v).find('.namok_display_list').trigger( 'slideToPage', page );
					$(v).find('.namok_display_t .li').removeClass('act');
				}	
			},
			onCreate:$highlight2
		});

		$(v).find('.namok_display_list').carouFredSel({
			responsive:true, 
			firstLoadChk :true,
			direction:'left',
			circular:true,
			infinite:false,
			align:false,
			auto:false,
			prev:false,
			next:false,
			scroll:{
				fx:'fade',   // "none", "scroll", "directscroll", "fade", "crossfade", "cover", "cover-fade", "uncover" or "uncover-fade"
				items:1,
				//pauseOnHover:true,
				duration:0,
				onBefore: function() {

				},
				onAfter:$highlight,
			},
			onCreate:$highlight	
		});

		$play.click(function() {
			$(v).find('.namok_display_t').trigger('play',true);
			$play.hide();
			$stop.show();
			return false;
		});
		$stop.click(function() {
			$(v).find('.namok_display_t').trigger('pause', true);
			$play.css('display','block');
			$stop.hide();
			return false;
		});
	});
};

$(function(){
    var winH = $(window).height();
	var contH  = $(window).height() - $('footer').innerHeight();
    $('.namok_display, .namok_display .caroufredsel_wrapper, .namok_display .li').css('height', winH);
	$('.namok_display_list .img').imgLiquid({fill:true, horizontalAlign:'center', verticalAlign:'center'});
	//$('#container').css('min-height', contH);
	$('.namok_display').mcSlideVisual();
	$('.namok_display_t .t1 span').lettering();
    $(window).resize(function() {
        var winH = $(window).height();
		var contH  = $(window).height() - $('footer').innerHeight();
        $('.namok_display, .namok_display .caroufredsel_wrapper, .namok_display .li').css('height', winH);
		//$('#container').css('min-height', contH);
		mc_progress();
	});
}); 


/* 영상광고 */
$(function(){
	var embed = $('.mov_inner iframe');
	$('.btn_mov_pop').click(function(e){
		var s = $(this).attr("href");
		$(s).popup('show');
		$('.mov_inner').append(embed);
	});
}); 
function pop_mov_close(){
	$('.mov_inner').empty(); 
	$('#pop_mov_view').popup('hide');
}

/* AD광고*/
/* 영상 */
$(function(){
	var embed = $('.mov_inner iframe');
	$('.btn_admov_pop').click(function(e){
		var s = $(this).attr("href");
		$(s).popup('show');
		$('.mov_inner').append(embed);
	});
}); 
function pop_admov_close(){
	$('.mov_inner').empty(); 
	$('#pop_admov_view').popup('hide');
}


/* cont ani */
$.fn.contAni = function(){
	var M = {};
	M.obj = {
		"container": this,
		"items": this,
		"items_h": new Array(),
		"window": $(window)
	};
	M.function = {
		getHeight: function(target, destination){
			if(!target || !destination){
				return false;
			};
			while(destination.length > 0) {
				destination.pop();
			};
			$.each(target, function(i,v){
				destination.push($(v).offset().top - ($(window).height() *.8));
			});
		},
		setHeight: function(target, destination){
			$.each(M.obj['items_h'], function(i,v){
				if(v - M.obj['window'].scrollTop() < 0){
					$(M.obj['items'][i]).addClass('active');
				}else{
					/*$(M.obj['items'][i]).removeClass('active');*/
				};
			});
		}
	};
	$(window).resize (resizeAni).resize();
	function resizeAni(){
		M.init = function(){
			M.function['getHeight'](M.obj['items'], M.obj['items_h']);
			M.obj['window'].bind('scroll', M.function['setHeight']);
			M.obj['window'].bind('resize init', M.function['getHeight']).triggerHandler('init');
		}();
	}
	return this;
};


/* 21.03.29 추가 */
$(function(){
	$('.ani_top, .ani_fade, .ani_scale').contAni();
	$('.img_ani_top, .img_ani_right, .img_ani_bottom, .img_ani_left').contAni();
	$('.img_ani_top, .img_ani_right, .img_ani_bottom, .img_ani_left').append('<i></i>');
	
	if(!$('.img_visual').length) return;

	$(window).scroll(function() {
		scrollVisual();
	});

	$(window).resize(function() {
		scrollVisual();
	});
	function scrollVisual() {
		var locW = $(window).innerWidth();
		var locWs2 = 600;
		
		if(locW > locWs2){
			$('.img_visual').css('width', $(window).scrollTop() +  $('.visual_area').height() - ($(window).height() * 0) + 100 );
		}else{
			$('.img_visual').css('width', $(window).scrollTop() +  $('.visual_area').height() - ($(window).height() * 0) - 250);
		}
	}
});
/* //21.03.29 추가 */





var rnd = "202108031";
var loadJSList = [
	"../../resources/js/jquery.cookie.js", 
	"../../resources/js/common.js", 
	"../../resources/js/spin.js", 
	"../../resources/js/apiController.js?"+rnd, 
	"../../resources/js/apiService.js?"+rnd];

loadJSList.forEach(function(u){
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = u;
	$("head").append(s);
});



