
/*** Layout **/
$(function(){
	$(window).resize (resizeBox).resize();
	function resizeBox(){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		var locWs2 = 900;
		
		function scrollEvent() {
			locS =  $(window).scrollTop();
			if(locS > 50){
				$('header, #container').addClass('top');
			}else{
				$('header, #container').removeClass('top');
			}   

			if(locW > locWs2){
				var locA1 = $('.cont_area').offset().top;
				if( locS < locA1) {
					$('.breadcrumb').removeClass('on');
				}
				if( locS > locA1) {
					$('.breadcrumb').addClass('on');
				} 
			}else{
				var locA1 = $('.cont_area').offset().top - 51;
				if( locS < locA1) {
					$('.breadcrumb').removeClass('on');
				}
				if( locS > locA1) {
					$('.breadcrumb').addClass('on');
				} 
			}

		}
		$(window).scroll(function() {
			scrollEvent();
		});
		$(window).resize(function() {
			scrollEvent();

		});
		if(locW > locWs){
			$('.btn_m_gnb_op').addClass('on');
			$('.btn_m_gnb_cl').removeClass('on');
			$('#gnb').removeClass('off').removeClass('on');
			$('#gnb').find('.dep').removeClass('over');
			$('.bg_mask').fadeOut();
			//$('#sitemap_cont').fadeOut();
		} else {	
		}	
		$('header').removeClass('over');
		$('.dep_m').removeClass('over');
		$('#gnb .dep').removeClass('over');
		$('#gnb .dep2').removeClass('over');
	}
	
	
	var wrap = $('#wrap');
	var header = $('header');
	var gnb = $('#gnb');
	var gnb_m = $('#gnb .dep_m');
	var gnb_dep = $('#gnb .dep');
	var gnb_dep2 = $('#gnb .dep2');
	
	
	$('.header_cont').prepend('<a href="#gnb" class=\"btn_m_gnb_op on\"><em><span>Menu Open</span></em></a>');
	$('.header_cont').append('<a href="#gnb" class=\"btn_m_gnb_cl\"><em><span>Menu Close</span></em></a>');
	header.prepend('<span class=\"bg_mask\"></span>');

	var bg_mask = $('.bg_mask');
	var nav_m_op = $('.btn_m_gnb_op');
	var nav_m_cl = $('.btn_m_gnb_cl, .bg_mask');	

	$('.dep2').closest('.dep').find('.dep_m').addClass('nav');
	$('.li_dep2').closest('.li').find('.dep_m2').addClass('nav');

    
	/* Mobile */
	nav_m_op.click(function(){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		if(locW > locWs){
		} else {
			nav_m_op.removeClass('on');
			nav_m_cl.addClass('on');
			gnb.addClass('on');
			bg_mask.fadeIn();
		}	
		return false;
	});

	nav_m_cl.click(function(){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		if(locW > locWs){
		} else {
			nav_m_op.addClass('on');
			nav_m_cl.removeClass('on');
			gnb.addClass('off');
			bg_mask.fadeOut();
			setTimeout(function(){
				gnb.find('.dep').removeClass('over');
				gnb.removeClass('off').removeClass('on');
			}, 600);
		}	
		return false;
	});

	gnb_m.click(function(){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		var tar = $(this).closest('.dep');
		if(locW > locWs){

			
			//return false;
		} else {
			var foldingChk = (tar.hasClass('over'));
			tar.removeClass('over');
			gnb.find('.dep').each (function(){
				$(this).removeClass('over');
			});
			if (foldingChk){
				tar.removeClass('over');
			} else {
				tar.addClass('over');
			}
			return false;
		}	
	});
	gnb.find('.dep_m2.nav').click(function(){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		var tar = $(this).closest('.li');
		if(locW > locWs){
			//return false;
		} else {
			var foldingChk = (tar.hasClass('over2'));
			tar.removeClass('over2');
			gnb.find('.li_dep .li').each (function(){
				$(this).removeClass('over2');
			});
			if (foldingChk){
				tar.removeClass('over2');
			} else {
				tar.addClass('over2');
			}
			return false;
		}	
	});
	
	$('.btn_m_gnb_cl').keydown(function(e){
		if(event.keyCode == 9){
			$('.gnb_nav').find('.dep').eq(0).find('.dep_m').focus();
			return false;
		}
	});
	$('.gnb_nav .dep:first-child .dep_m').keydown(function(e){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		var tar = $(this).closest('.dep');
		if(locW > locWs){
			//return false;
		} else {
		
			var isShift = window.event.shiftKey ? true : false;
			if(isShift && (e.keyCode == 9)){
				$('.btn_m_gnb_cl').focus();
				return false;
			}
		}
	});
	

	/* PC */
	gnb_m.on('mouseover focusin',function(){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		if(locW > locWs){
			header.addClass('over');
			header.removeClass('active');
			gnb_dep.removeClass('over');
			$(this).closest('.dep').addClass('over');
			//bg_mask2.fadeIn();
		}
	});
	gnb_m.mouseout(function(){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		if(locW > locWs){
			//gnb_close();
		}
	});
	$('.dep_m.ty').on('mouseover focusin',function(){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		if(locW > locWs){
			header.addClass('active');
			gnb_dep.removeClass('over');
			$(this).closest('.dep').addClass('over');
			//bg_mask2.fadeIn();
		}
	});
	gnb_dep2.mouseout(function(){
        gnb_m.removeClass('over');
		$(this).closest('.dep').find('.dep_m').addClass('over');
	});
	gnb_dep2.mouseout(function(){
		 gnb_m.removeClass('over');
	});

	header.mouseleave(function(){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		if(locW > locWs){
			gnb_close();
		}
	});

	$('.logo, .utill_nav a').on('mouseover focusin',function(){
		var locW = $(window).innerWidth();
		var locWs = 1300;
		if(locW > locWs){
			gnb_close();
		}
	});

	function gnb_close(){
		header.removeClass('over');
		gnb_m.removeClass('over');
		gnb_dep.removeClass('over');
		gnb_dep2.removeClass('over');
		bg_mask.fadeOut();
		header.removeClass('active');
	}
	
	
	/** 언어선택 **/
	$('.btn_lang').click(function(){
		if ($('.lang_box').hasClass('act')){
			$('.lang_box').removeClass('act');
			$('#lang_cont').fadeOut();
		} else {
			$('.lang_box').addClass('act');
			$('#lang_cont').fadeIn();
		}
		return false;
	});
	$('.utill_nav .hit').mouseover(function(){
		$('.lang_box').removeClass('act');
		$('#lang_cont').fadeOut();	
	});
	$('.gnb_nav a, .btn_sitemap, .mb_footer a, .btn_m_gnb_cl').focusin(function(){
		$('.lang_box').removeClass('act');
		$('#lang_cont').fadeOut();	
	});

	
	/** 사이트맵 **/
	$('.btn_sitemap').click(function(){
		$(this).addClass('chk');
		$('#sitemap_cont').fadeIn();
		$('#sitemap_cont').find('.sm_dep').eq(0).find('.sm_dep_m').focus();
		return false;
	});
	$('.btn_sitemap_cl').click(function(){
		$('#sitemap_cont').fadeOut();
		$('.btn_sitemap.chk').focus();
		$('.btn_sitemap').removeClass('chk');
		return false;
	});
	$('.btn_sitemap_cl').keydown(function(e){
		if(event.keyCode == 9){
			$('#sitemap_cont').find('.sm_dep').eq(0).find('.sm_dep_m').focus();
			return false;
		}
	});
	$('#sitemap_cont .sm_dep:first-child .sm_dep_m').keydown(function(e){
		var isShift = window.event.shiftKey ? true : false;
		if(isShift && (e.keyCode == 9)){
			$('.btn_sitemap_cl').focus();
			return false;
		}
	});
});



$(document).ready(function() {
	/** 언어선택 쿠키**/
	$('#lang_cont')
		.on("click", "li a", function(){
			var lang = $(this).text();
			var moveUrl = "/index.html";
			var lang_cookie_val = "";
			if(lang=="KOR") {
				lang_cookie_val = "kr";
			} else if(lang=="ENG") {
				lang_cookie_val = "en";
				moveUrl = "/{0}/index.html".format(lang_cookie_val);
			} else if(lang=="CHN") {
				lang_cookie_val = "ch";
				moveUrl = "/{0}/index.html".format(lang_cookie_val);
			}
	
			$.cookie(lang_cookie_key, lang_cookie_val, { expires: 365, path: '/'});
			location.href=moveUrl;			
			
			/*var filteredUrl = [];
			$.each(location.pathname.substring(1).split("/"), function(idx, s){				
				filteredUrl.push(idx==0 ? "/"+lang_cookie_val : s);
			});
			
			var moveUrl = filteredUrl.join("/");
			alert(moveUrl)
			if(moveUrl.indexOf("/kr/index.html") > -1) {
				moveUrl="/index.html";
			}
	
			location.href=moveUrl;*/
		})
	
});