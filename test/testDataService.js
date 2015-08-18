var express = require('express');
var app = express();
var chai = require('chai');
var expect = chai.expect;

describe('data service test', function() {
    var dataService, usersFixture;
    beforeEach(function(done) {
        dataService = require('../services/dataService.js')(app);
        usersFixture = [{'name' : 'test_1'}]; 
        dataService.users = usersFixture;
        done();
    });
    it('should exists',function() {
        expect(typeof dataService).not.to.equal('undefined'); 
    });
    
    it('should get data',function(done) {
        dataService.getData('users', function(err, result) {
            expect(result).to.equal(usersFixture);
        });
        done();
    });
    
    it('should insert data',function(done) {
        var fixture = {'name' : 'test_2'};
        dataService.insertData('users', fixture, function(err, result) {});
        expect(dataService.users.length).to.equal(2);
        done();
    });
    
});
