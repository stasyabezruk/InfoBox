var InfoBox = (function () {
	function InfoBox (config) {
		this.content = config.content;
		this.prevBtn = config.prevBtn;
		this.nextBtn = confif.nextBtn;  
	}

	InfoBox.prototype.create = function (el) {
		 var target = helper.getEl(el);
	};

	InfoBox.prototype.init = function (el) {
        var sliderContainer = helper.getEl(el);
        this.target = el;
        this.create(el);        
       
    };
	
	return InfoBox;	
})();