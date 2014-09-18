describe('ucword', function() {

	beforeEach(module('dgs'));

	it('should ...', inject(function($filter) {

        var filter = $filter('ucword');

		expect(filter('input')).toEqual('output');

	}));

});