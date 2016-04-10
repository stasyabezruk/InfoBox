var InfoBox = (function () {
	var counter = 0;  /* to keep track of current slide */
	
	function InfoBox (config) {
		this.content = config.content;
		this.prevBtn = config.prevBtn;
		this.nextBtn = config.nextBtn;
		this.prevArrow = config.prevArrow;
		this.nextArrow = config.nextArrow;
		this.duration = config.duration;
	}

	InfoBox.prototype.create = function (el) {
		var i,
			target = helper.getEl(el),
			mainWrapper = helper.create('div', {
                'class': 'mainWrapper'
            }),
			viewport = helper.create('div', {
                'class': 'viewport'
            }),
            slider = helper.create('ul', {
                class: 'slider '
            }),            
            slideContentBox = null,
			wrapper = null,	
			imgWrap = null		
			img = null,
			slideHeader = null,
			slideDescription = null,
			details = null,
			detailsLink = null;

		target.appendChild(mainWrapper);
		mainWrapper.appendChild(viewport);
		viewport.appendChild(slider);
		

		for (i in this.content) {
			slide = helper.create('li', {
				class : 'slide'
			});
			imgWrap = helper.create('div', {
				class : 'imgWrap'
			});			
			img = helper.create('img', {
				src : 'img/' + this.content[i].img
			});			
			slideContent = helper.create('div', {
				class : 'slideContent'
			});
			slideHeader = helper.create('div', {
				class : 'slideHeader',
				text : this.content[i].title
			});
			slideContentBox = helper.create('div', {
				class : 'slideContentBox'
			});
			slideDescription = helper.create('div', {
				class : 'slideDescription',
				text : this.content[i].description
			});
			details = helper.create('div', {
				class : 'details',
				text : this.content[i].note
			})
			detailsLink = helper.create('a', {
				class : 'detailsLink',
				text : 'show details'
			});
						
			slider.appendChild(slide);
			slide.appendChild(imgWrap);
			imgWrap.appendChild(img);			
			slide.appendChild(slideContent);			
			slideContent.appendChild(slideHeader);
			slideContent.appendChild(slideContentBox);
			slideContentBox.appendChild(slideDescription);
			slideContentBox.appendChild(details);
			slideContent.appendChild(detailsLink);

			slideContent.style.top = '0px';			
		}

		var buttonsPanel = helper.create('div', {
				class : 'buttonsPanel'
			}),			
			prevBtn = null,
			nextBtn = null,
			prevArrow = null,
			nextArrow = null;

		for (i in this.prevBtn) {
			prevBtn = helper.create('div', {
				id : 'prevBtn',
				class : 'btn',
				text : this.prevBtn[i].text,
				style : this.prevBtn[i].style
			});
		}
		for (i in this.nextBtn) {
			nextBtn = helper.create('div', {
				id : 'nextBtn',
				class : 'btn',
				text : this.nextBtn[i].text,
				style : this.nextBtn[i].style
			});
		}
		for (i in this.prevArrow) {
			prevArrow = helper.create('div', {
				id : 'prevArrow',
				class : 'control',				
				style : this.prevArrow[i].style
			});
		}
		for (i in this.nextArrow) {
			nextArrow = helper.create('div', {
				id : 'nextArrow',
				class : 'control',				
				style : this.nextArrow[i].style
			});
		}
			
		mainWrapper.appendChild(buttonsPanel);
		buttonsPanel.appendChild(prevBtn);
		buttonsPanel.appendChild(nextBtn);
		prevBtn.appendChild(prevArrow);
		nextBtn.appendChild(nextArrow);
	};

	InfoBox.prototype.showFisrtSlide = function(el) {
		var target = helper.getEl(el);			 
			slides = target.getElementsByClassName('slide'), /* a collection of all of the individual slides */
			numSlides = slides.length;
			
			slides[0].classList.add('currentSlide'); /* add 'currentSlide' class to first figure so that the first slide is visible when the slideshow loads */
	}

	/*show current slide and hide the rest increment/decrement counter to keep track of our place in the slideshow */
	InfoBox.prototype.showCurrent = function (el, n) { 		
		var self = this,
			target = helper.getEl(el),
			viewport = target.querySelector('.viewport'),		 
			slides = target.getElementsByClassName('slide'), /* a collection of all of the individual slides */
			numSlides = slides.length;
		/* increment or decrement the counter variable depending on whether i is 1 or -1 */
		if (n > 0) {
        	counter = (counter + 1 === numSlides) ? 0 : counter + 1;
    	} else {
        	counter = (counter - 1 < 0) ? numSlides - 1 : counter - 1;
    	}
    	
    	/* remove the show class ('currentSlide') from whichever element currently has it [1] */ 
	    [].forEach.call(slides, function (el) {
	        el.classList.remove('currentSlide');
	    });
	 
	    /* add the show class ('currentSlide') back to the one current slide that's supposed to have it */
	    slides[counter].classList.add('currentSlide');
	    self.fadeIn(viewport);
	};

	InfoBox.prototype.setOpacity = function (op, el) {
		el.style.opacity = op.toString();
  		el.style.MozOpacity = op.toString();
  		el.style.KhtmlOpacity = op.toString();
  		el.style.filter = 'alpha(opacity=' + (op * 100).toString() + ')';
	};
	InfoBox.prototype.fadeOut = function (el) {
		var i = 0,
			self = this;
		for (i; i <= 1; i += 0.01) {
			(function(){
				var myI = i;
		    	window.setTimeout( function () {
		    		self.setOpacity((1 - myI), el)}, i * self.duration); 
		    })();	    
		}
	};	
	InfoBox.prototype.fadeIn = function (el) {
		var i = 0,
			self = this;			
		for (i; i <= 1; i += 0.01) {
		    (function(){
				var myI = i;
		    	window.setTimeout( function () {
		    		self.setOpacity((myI), el)}, i * self.duration); 
		    })();
		}
	};
	
	/*start - open details*/
	InfoBox.prototype.moveToTop = function (el, link) {
		el.style.top = parseInt(el.style.top) + (-10) + 'px';

		var self = this,
			animate = window.setTimeout( function () {
				self.moveToTop(el)
			}, 30);	
		if (el.offsetTop == 20) {			
			window.clearTimeout(animate);
			self.increaseHeight();			
		}
	};
	InfoBox.prototype.increaseHeight = function () {
		var self = this,
			box = helper.getEl('.slideContentBox', this.target);
		box.style.height = parseInt(getComputedStyle(box).height) + 10 + 'px';

		var animate = window.setTimeout( function () {
				self.increaseHeight()
			}, 30);			
		if(getComputedStyle(box).height == '210px') {
			window.clearTimeout(animate);
			self.linkHide();
		}
	};
	InfoBox.prototype.linkHide = function () {
		var link = helper.getEl('.detailsLink', this.target);
			helper.addClass(link, 'hideLink');			
			link.innerHTML = 'hide details';
	};
	InfoBox.prototype.openDetails = function (link, viewport) {
		var slideContent = helper.getEl('.slideContent', this.target),
			imgWrap = helper.getEl('.imgWrap', this.target);
		
		this.fadeOut(imgWrap);
		helper.addClass(viewport, 'openedDetails');
		this.moveToTop(slideContent);	
	};
	/*end - open details*/

	/*start - hide details*/
	InfoBox.prototype.hideDetails = function (link, viewport) {
		var slideContent = helper.getEl('.slideContent', this.target),
			imgWrap = helper.getEl('.imgWrap', this.target);
		helper.removeClass(link, 'hideLink');
		link.innerHTML = 'show details';
		this.moveToBottom(slideContent, link);
		this.reduceHeight();
		helper.removeClass(viewport, 'openedDetails');
		this.fadeIn(imgWrap);
	};
	InfoBox.prototype.moveToBottom = function (el, link) {
		el.style.top = parseInt(el.style.top) + 10 + 'px';
		
		var self = this,
			animate = window.setTimeout( function () {
				self.moveToBottom(el)
			}, 30);			
		
		if (el.offsetTop == 200) {			
			window.clearTimeout(animate);						
		}
	};
	InfoBox.prototype.reduceHeight = function () {
		var self = this,
			box = helper.getEl('.slideContentBox', this.target);		
		
		box.style.height = parseInt(getComputedStyle(box).height) + (-10) + 'px';

		var animate = window.setTimeout( function () {
				self.reduceHeight()
			}, 30);	
		
		if(getComputedStyle(box).height == '30px') {
			window.clearTimeout(animate);
		}
	};
	/*end - hide details*/

	InfoBox.prototype.addEvents = function (el) {
		var self = this,
			prevBtn = helper.getEl('#prevBtn', this.target),
			nextBtn = helper.getEl('#nextBtn', this.target),
			viewport = helper.getEl('.viewport', this.target),
			detailsLink = helper.getEl('.detailsLink', this.target);
		
		helper.addEvent('click', prevBtn, function () {
			self.showCurrent(self.target, -1);
		});
		helper.addEvent('click', nextBtn, function () {			
			self.showCurrent(self.target, 1);
		});

		helper.addEvent('click', detailsLink, function () {
			if(helper.hasClass(detailsLink, 'hideLink')) {
				self.hideDetails(detailsLink, viewport);
			} else {				
				self.openDetails(detailsLink, viewport);
			}	
		});
		
	};
	

	InfoBox.prototype.init = function (el) {
        var sliderContainer = helper.getEl(el);
        this.target = el;
        this.create(el);
        this.showFisrtSlide(el);
        this.addEvents(el);  
       
    };
	
	return InfoBox;	
})();