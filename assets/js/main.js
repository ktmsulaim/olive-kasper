$(function () {
  $(".slick-slider").slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
        },
      },
    ],
  });

  $('.slick-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    const next = $(slick.$slides).get(nextSlide);
    const target = $(next).find('h1, h3')

    target.removeClass('animated fadeInLeft').hide();
    setTimeout(() => {    
      target.addClass('animated fadeInLeft').show();

    }, 1000);
  });

  $(".slick-slider-logos").slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  let headerOffsetTop = $('header').offset().top
  
  
  function stickNavbarOnScroll(e) {
    const header = $('header');
    let windowOffsetTop = $(window).scrollTop()


    if(windowOffsetTop >= headerOffsetTop) {
      header.addClass('sticky')
    } else {
      header.removeClass('sticky')
    }
  }

  function changeNavActiveClass() {
    const links = $('nav a')
    let windowOffsetTop = $(window).scrollTop()

    links.each(function(key){
      let current = $(this);
      let target = $(current.attr('href'));
      const next = links.get(key + 1)
      const nextTarget = $(next).attr('href')
      const nextTargetTop = nextTarget ? $(nextTarget).position().top : 0
      const between = target.position().top + target.height();


      if(windowOffsetTop > target.position().top && windowOffsetTop < (next ? nextTargetTop : between)) {
        $('nav ul li').removeClass('active')
        current.parent().addClass('active')
      } else {
        current.parent().removeClass('active')
      }
    })

  }

  $(window).on('scroll', function(){
    stickNavbarOnScroll()
    changeNavActiveClass()
  })

  function mobileMenu(type = 'mobile') {
    const nav = $('nav')

    const menu = nav.find('.nav-menu')
    const trigger = $('#mobile-menu-toggle')


    if(type == 'desktop') {
      if(trigger.length) {
        trigger.remove()
      }

      menu.show()

    } else {

      if(!trigger.length) {
        nav.append(`<i class="mdi mdi-menu" id="mobile-menu-toggle"></i>`)
      }

      menu.hide()
      nav.on('click', '#mobile-menu-toggle', function() {
        if(!$('.menu-overlay').length) {
          $('body').append(`<div class="menu-overlay"></div>`).hide().fadeIn()
        } else {
          $('.menu-overlay').fadeOut().remove()
        }
        menu.slideToggle('fast')
      })

      $('body').on('click', '.menu-overlay', function() {
        menu.slideUp('fast', function() {
          $('.menu-overlay').fadeOut().remove()
        })
      })

      $('.nav-menu-item').click(function() {
        menu.slideUp('fast', function() {
          $('.menu-overlay').fadeOut().remove()
        })
      })
    }
  }

  $(window).on('resize', function(){
    const width = $(window).width()

    if(width >= 770) {
      mobileMenu('desktop')
    } else {
      
      if(!$('header').hasClass('sticky')) {
        $('header').addClass('sticky')
      }

      mobileMenu('mobile')
    }
  }).resize()
});
