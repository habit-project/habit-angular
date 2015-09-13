var protractor = require('protractor');
var expect = require('chai').expect

describe('access_ent_dashboard_log_in_get_playlists', function () {
	it('goes_to_dashboard_page', function(){

		//navigates to dashboard page
		browser.get('http://localhost:3001/dashboard');

		//sees dashboard header
		var dashboardHeaderText = 'Entertainment Dashboard';
		element.all(by.css('.dashboard-brand')).getText().
			then(function(text){
				console.log(text);
				expect(text).to.contain(dashboardHeaderText);
			});
	});
	it('user_is_not_logged_in', function(){

		//user should not see their name (which would mean they are logged in)
		var testUserName = 'Andrew Reder';
		element.all(by.binding('user.name')).getText().
			then(function(text){
				console.log(text);
				expect(text).to.not.contain(testUserName);
			});
	});
	it('user_can_log_in', function(){
		//user clicks "Connect Youtube"
		function enterEmail (){
			element(by.id('Email')).sendKeys('arjanraintest@gmail.com');
			element(by.id('next')).click();
		}

		function enterPassword (){
			element(by.id('Passwd')).sendKeys('JanrainRocks');
			element(by.id('signIn')).click();
		}

		function grantAccess (){
			browser.driver.findElement(by.id('submit_approve_access')).click();
		}
		element(by.css('.youtube-login-btn')).click().then(function(){
			browser.ignoreSynchronization = true;
			if (element(by.id('Email')).isPresent()){
				browser.sleep(200);
				enterEmail();
				browser.sleep(200);
				enterPassword();
				browser.sleep(900);
				grantAccess();
				browser.sleep(600);
				var testUserName = 'Andrew Reder';
				element.all(by.css('.user-name-text')).getText().then(function(text){
					expect(text).to.contain(testUserName);
				})
			}
		});
		});
	})