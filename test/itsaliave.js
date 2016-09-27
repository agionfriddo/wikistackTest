var expect = require('chai').expect
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

var models = require('../models');
var Page = models.Page;
var User = models.User;


describe('Page model', function () {

  var testPage;

  beforeEach(function(){
    testPage = Page.build({
                title: "title",
                content: "content",
                status: "status",
                tags: "tag1,tag2,tag3"
            })
  })
    

  describe('Virtuals', function () {
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function(){
        expect(testPage.route.slice(0,6)).to.equal("/wiki/");
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML');
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag');
      it('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});