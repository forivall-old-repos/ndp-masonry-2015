;
jQuery(function(){

	jQuery('.homepage-content-load-more-link').bind('click',function(){

		jQuery('.homepage-content-load-more-link').hide();
		jQuery('.homepage-content-item-more').show();
		return false;
	});

});;
;
jQuery(function(){

	jQuery('.candidate-events-load-more-link').bind('click',function(){

		jQuery('.candidate-events-load-more-link').hide();
		jQuery('.candidate-events-item-more').show();
		return false;
	});

});;
jQuery(function(){

  var loaded = 6;

  jQuery('.candidate-timeline2-load-more-link').bind('click',function(){

    jQuery('.timeline-item-hidden').removeClass('timeline-item-hidden');

    jQuery.get('/site_timeline/op/view-more',{ start:loaded },function(data){
      loaded += 3;
      jQuery('.timeline-content').append(data);
      twttr.widgets.load();
    });

    return false;
  });

});
;
;
jQuery(function(){


	jQuery('.more-link-more').bind('click',function(){

		if (jQuery('.wrapper-main-sidebar').data('sidebar')!='open') {
			jQuery('.wrapper-main-sidebar').animate({ right: '+=100%' }, 150, function() { });
			jQuery('.wrapper-main-sidebar').data('sidebar','open');
		} else {
			jQuery('.wrapper-main-sidebar').animate({ right: '-=100%' }, 150, function() { });
			jQuery('.wrapper-main-sidebar').data('sidebar','');
		}

	});

});;
;
;
;
jQuery(function(){

	jQuery('.rich').find('.asset--candidate-nav-tabs .tab-link').each(function(index,obj){
		jQuery(obj).bind('rescale',function(){
			var tw = jQuery(obj).width();
			var bestfitw = 0;
			var bestfitobj = null;
			jQuery(obj).find('span').hide().each(function(altindex,altobj){
				jQuery(altobj).show();
				var altw = jQuery(altobj).width();
				jQuery(altobj).hide();
				if (altw<tw && altw>bestfitw) {
					bestfitw = altw;
					bestfitobj = altobj;
				}
			});
			jQuery(bestfitobj).show();
		}).attr('rescaleable','rescaleable');
	});

});
jQuery(function(){

	jQuery('.asset--candidate-nav-tabs .tab-item-more').bind('click',function(){

		jQuery("html, body").animate({ scrollTop: jQuery('#sitemap').offset().top }, 500);

		return false;

	});

});;
;
;
jQuery(function(){

  /*
  jQuery('.asset--nav-more-menu .more-link-more').bind('click',function(){

    jQuery("html, body").animate({ scrollTop: jQuery('#sitemap').offset().top }, 500);

    return false;

  });
  */
  $('.asset--nav-more-menu a.more-link-more').click(function() {
    $('.side-nav').animate({width:'toggle'},280);
    return false;
  });

});
;
;
;
;
;
;
;
