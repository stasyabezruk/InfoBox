var InfoBox = (function () {
	var counter = 0;  /* to keep track of current slide */
	
	function InfoBox (config) {
		this.content = config.content;
		this.prevBtn = config.prevBtn;
		this.nextBtn = config.nextBtn;
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
			wrapper = null,	
			imgWrap = null		
			img = null,
			slideHeader = null,
			slideDescription = null,
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
			slideDescription = helper.create('div', {
				class : 'slideDescription',
				text : this.content[i].description
			});
			detailsLink = helper.create('a', {
				class : 'detailsLink',
				text : 'show details'
			});
						
			slider.appendChild(slide);
			slide.appendChild(imgWrap);
			imgWrap.appendChild(img);			
			slide.appendChild(slideContent);
			slideContent.appendChild(slideHeader);
			slideContent.appendChild(slideDescription);
			slideContent.appendChild(detailsLink);			
		}

		var buttonsPanel = helper.create('div', {
				class : 'buttonsPanel'
			}),
			prevBtn = null,
			nextBtn = null;

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
			
		mainWrapper.appendChild(buttonsPanel);
		buttonsPanel.appendChild(prevBtn);
		buttonsPanel.appendChild(nextBtn);
	};

	InfoBox.prototype.showFisrtSlide = function(el) {
		var target = helper.getEl(el);			 
			slides = target.getElementsByClassName('slide'), /* a collection of all of the individual slides */
			numSlides = slides.length;
			
			slides[0].classList.add('bss-show'); /* add 'bss-show' class to first figure so that the first slide is visible when the slideshow loads */
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
    	
    	/* remove the show class ('bss-show') from whichever element currently has it [1] */ 
	    [].forEach.call(slides, function (el) {
	        el.classList.remove('bss-show');
	    });
	 
	    /* add the show class ('bss-show') back to the one current slide that's supposed to have it */
	    slides[counter].classList.add('bss-show');
	    self.fadeIn(viewport);
	};

	InfoBox.prototype.setOpacity = function (op, el) {
		el.style.opacity = op.toString();
  		el.style.MozOpacity = op.toString();
  		el.style.KhtmlOpacity = op.toString();
  		el.style.filter = 'alpha(opacity=' + (op * 100).toString() + ')';
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

	InfoBox.prototype.addEvents = function (el) {
		var self = this,
			prevBtn = helper.getEl('#prevBtn', this.target),
			nextBtn = helper.getEl('#nextBtn', this.target),
			viewport = helper.getEl('.viewport', this.target);
		helper.addEvent('click', prevBtn, function (el, n) {
			self.showCurrent(self.target, -1);
		});
		helper.addEvent('click', nextBtn, function (el, n) {			
			self.showCurrent(self.target, 1);
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