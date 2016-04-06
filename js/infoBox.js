var InfoBox = (function () {
	function InfoBox (config) {
		this.content = config.content;
		this.prevBtn = config.prevBtn;
		this.nextBtn = config.nextBtn; 
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

	InfoBox.prototype.getElemets = function (el) {
		var target = helper.getEl(el),
			elements = target.getElementsByTagName('li');
			console.log(elements);
		for (i in elements) {
			console.log(elements[i].className);
		}
	}

	InfoBox.prototype.init = function (el) {
        var sliderContainer = helper.getEl(el);
        this.target = el;
        this.create(el);
        this.getElemets(el) ;    
       
    };
	
	return InfoBox;	
})();