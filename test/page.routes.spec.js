var supertest = require('supertest');
var app = require('../index.js');
var agent = supertest.agent(app);
var models = require('../models');
var Page = models.Page;
var User = models.User;

describe('http requests', function () {

	// beforeEach(function(done){
	// 	Page.destroy({where:{}})
	// 	.then(done());
	// })


	describe('GET /wiki/', function () {
		it('responds with 200', function(done){
			agent
			.get('/wiki')
			.expect(200, done);
		});
	});

	describe('GET /wiki/add', function () {
		it('responds with 200', function(done){
			agent
			.get('/wiki/add')
			.expect(200, done);
		});
	});

	describe('GET /wiki/:urlTitle', function () {

		before(function(done){
	      Page.create({
	        title: "title",
	        content: "# content",
	        status: "open",
	        tags: "tag1,tag2,tag3"
	      })
	      .then(done());
	    })

		it('responds with 404 on page that does not exist', function(done){
			agent
			.get('/wiki/title0')
			.expect(404, done);
		});

		it('responds with 200 on page that does exist', function(done){
			agent
			.get('/wiki/title')
			.expect(200, done);
		});

	});
			

	xdescribe('GET /wiki/search', function () {
	it('responds with 200');
	});

	xdescribe('GET /wiki/:urlTitle/similar', function () {
	it('responds with 404 for page that does not exist');
	it('responds with 200 for similar page');
	});

	xdescribe('POST /wiki', function () {
	it('responds with 201');
	it('creates a page in the database');
	});

});