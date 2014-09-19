angular.module('dgs').directive('btnProcess', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
			element.on('click',function(event){
				element.attr('disabled','disabled');
				element.html('<span class="fa fa-cog fa-spin"></span>&nbsp;Processing please wait...');
				
				console.log(attrs.btnProcess);
				eval("scope."+attrs.btnProcess+";");
				
			});

		}
	};
});