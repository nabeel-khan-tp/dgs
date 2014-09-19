angular.module('dgs').directive('btnProcess', function($parse,$timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
			element.on('click',function(event){
				element.attr('disabled','disabled');
				var currentHTML = element.html();
				element.html('<span class="fa fa-cog fa-spin"></span>&nbsp;Processing please wait...');
				
				//scope.$apply(function () {

				console.log(attrs.btnProcess);
				var fna = $parse(attrs.btnProcess);
				
				$timeout(
                    function() {
							fna(scope);
                        //console.log( "$timeout 1" );
							element.removeAttr('disabled');
						element.html(currentHTML);
                    }
                ,1000);


				/*.then(function(){
					element.$set('disabled', false);
					element.html('Submit');
				},function(){
					element.$set('disabled', false);
					element.html('Submit');
				});*/
				//eval("scope."+attrs.btnProcess+";");
				
			});

		}
	};
});