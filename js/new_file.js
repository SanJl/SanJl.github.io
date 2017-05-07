$(document).ready(function(){
	var width = document.querySelector('html').offsetWidth;
    var delta = (640-320)/(20-10);
    var fontSize = (width - 320)/delta + 17;
    if(width<=320){
		fontSize=16;
    }else if(width>=1024){
		fontSize=40;
    }
    document.querySelector('html').style.fontSize =fontSize+'px';
    window.addEventListener('resize',function(){
		var width = document.querySelector('html').offsetWidth;
		var delta =  (640-320)/(20-10);
		var fontSize = (width - 320)/delta + 17;
		if(width<=320){
		    fontSize=16;
		}else if(width>=1024){
		    fontSize=40;
		}
		document.querySelector('html').style.fontSize = fontSize+'px';
   	})
    var num = 0;
    setInterval(function(){
    	$('.head-new ul').animate({marginTop:'-2.1rem'},500,'linear',function(){
    		$('.head-new ul').css({marginTop:0});
    		$('.head-new ul li:first').remove().clone().appendTo(".head-new ul");	
    	})
    	num++;
    	if(num==3){
    		num=0
    	}
    	$('.exc-pic').eq(num).css('display','block').siblings('.exc-pic').css('display','none')
    },2500)
	var nav = $('.banner-nav span');
	Swipe(document.getElementById('mySwipe'),{
		auto:2000,
		speed:500,
		continuous: true,
		disableScroll: false,
		callback: function(pos) {
			var i = nav.length;
			while(i--){
			  nav[i].className=' ';
			}
			nav[pos].className='active';
		}
	});
	Swipe(document.getElementById('mySwipe-hot'),{
		continuous: true,
		disableScroll: false,
	});
	window.onscroll = window.onload = function(){
		var h = $(window).scrollTop();
		var top = $(document).height()/6;
		if(h>top){
			$('.top').css('opacity',1);
		}else{
			$('.top').css('opacity',0);
		}
		if(h>50){
			$('.head').css({position:'fixed',top:0,left:0});
		}else{
			$('.head').css('position','static');
		}
		var imgs = document.getElementsByTagName('img');		
		for(var i=0;i<imgs.length;i++){				
			if(imgs[i].getBoundingClientRect().top<window.innerHeight){					
				(function(index){		
					if(imgs[index].src){
						imgs[index].removeAttribute('-src');
					}else{
						imgs[index].setAttribute('src',imgs[index].getAttribute('-src'));
					}
				})(i)
			}				
		}	
	}
	var Touch = $(document)[0];
	touchEvent.tap(Touch,function(ev){
		var ev = ev||window.event;
		if(ev.target.className=='cancel'){
			ev.target.style.display='none';
			$('.val').val('');
			$('.list').html('');
		}
		if(ev.target.className=='box-right'){
			var w= -$('.box').width();
			$('.box').css({transform:'translateX('+w+'px)',opacity:0});
		}
		if(ev.target.className=='logo-img'){
			$('.box').css({transform:'translateX(0)',opacity:1});
		}
		if(ev.target.className=='top'){
			$('body').stop().animate({scrollTop:$('header').offset().top});
		}
		if(ev.target.className=='return'){
			$('.shousuo').css('display','none');
		}
		if(ev.target.className=='search'){
			$('.shousuo').css('display','block');
		}
	})
	$('.val').keyup(function(e){
		var keycode = e.keyCode;
		var val = $('.val').val();
		if(val){
			$('.cancel').css('display','block');
		}else{
			$('.cancel').css('display','none');
		}
		var os = document.createElement('script');
		os.src='https://suggest.taobao.com/sug?area=b2c&code=utf-8&k=1&src=tmall_h5&q='+val+'&callback=fn'
		document.body.appendChild(os);
		document.body.removeChild(os);
		if(keycode==13){
			e.preventDefault();
			if(!val){
				var pal = $('.val').attr('placeholder')
				window.location.href='https://list.tmall.com/search_product.htm?q='+pal
			}else{
				window.location.href='https://list.tmall.com/search_product.htm?q='+val
				$('.val').val('');
			}
		}
	})
	window['fn']=function(data){
		var list = $('.list')[0];
		var arr= data.result
		list.innerHTML="";
		if(arr){
			for(var i=0;i<arr.length;i++){
				list.innerHTML+='<li><a href="https://list.tmall.com/search_product.htm?q='+arr[i][0]+'">'+arr[i][0]+'</a><span class="cancel">共售出<em>'+arr[i][1]+'</em>件</span></li>'
			}
			$('.list').css('display','block')
		}
		console.log(arr)
	}
})