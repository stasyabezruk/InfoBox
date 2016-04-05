var InfoBox = (function () {
	function InfoBox (config) {
		this.content = config.content;
		this.prevBtn = config.prevBtn;
		this.nextBtn = config.nextBtn;  
	}

	InfoBox.prototype.create = function (el) {
		var i,
			target = helper.getEl(el),
			viewport = helper.create('div', {
                'class': 'viewport'
            }),
			wrapper = null,	
			imgWrap = null		
			img = null;

		target.appendChild(viewport);
		

		for (i in this.content) {
			imgWrap = helper.create('div', {
				class : 'imgWrap'
			});
			wrapper = helper.create('div', {
				class : 'wrapper'
			});
			img = helper.create('img', {
				src : 'img/' + this.content[i].img
			});
						
			viewport.appendChild(wrapper);
			wrapper.appendChild(imgWrap);
			imgWrap.appendChild(img);
			

		}


	};

	InfoBox.prototype.init = function (el) {
        var sliderContainer = helper.getEl(el);
        this.target = el;
        this.create(el);        
       
    };
	
	return InfoBox;	
})();