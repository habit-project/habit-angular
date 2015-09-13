var expect = require('chai').expect

describe('navigate_to_pages', function () {
	it('goes to home page', function(){
		
		//navigates to home page
		browser.get('http://localhost:3001');

		//sees homepage header text
		var homePageHeaderText = 'Andrew Reder';
		element.all(by.css('.main-content > .caption > h2')).first().getText().
			then(function(text){
				expect(text).to.contain(homePageHeaderText);
			});
	})
})