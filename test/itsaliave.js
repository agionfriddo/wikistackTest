var expect = require('chai').expect
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

var models = require('../models');
var Page = models.Page;
var User = models.User;


describe('Page model', function () {

  // beforeEach(function(done) {
  //   Page.destroy({
  //     where: {}
  //   })
  //   .then(function() {
  //     done()
  //   })
  // })

  describe('Virtuals', function () {
    var testPage;
    beforeEach(function() {
      testPage = Page.build({
        title: "title",
        content: "# content",
        status: "status",
        tags: "tag1,tag2,tag3"
      })
    })

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function(){
        testPage.urlTitle = 'title';
        expect(testPage.route.slice(0,6)).to.equal("/wiki/");
      });
    });

    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function() {
        expect(testPage.renderedContent).to.equal('<h1 id="content">content</h1>\n')
      });
    });
  });


  describe('Class methods', function () {
      beforeEach(function(done) {
      Page.create({
        title: "title",
        content: "# content",
        status: "open",
        tags: "tag1,tag2,tag3"
      })
      .then(function() {
        done();
      })
    })
    describe('findByTag', function () {
      it('gets pages with the search tag', function(done) {
        Page.findByTag('tag1')
        .then(function(page){
          expect(page[0].tags).to.include('tag1')
          done();
        })
      });
      it('does not get pages without the search tag', function(done) {
        Page.findByTag('wrong')
        .then(function(page){
          expect(page).to.be.empty;
          done();
        })
      });
    });
  });


  describe('Instance methods', function () {
    var testPage1 = Page.create({
      title: "title1",
      content: "content",
      status: "open",
      tags: "tag1,tag2,tag3"
    });
    var testPage2 = Page.create({
      title: "title2",
      content: "content",
      status: "open",
      tags: "tag3,tag4,tag5"
    });
    var testPage3 = Page.create({
      title: "title3",
      content: "content",
      status: "open",
      tags: "tag6,tag7,tag8"
    });
    beforeEach(function(done) {
      Promise.all([testPage1, testPage2, testPage3])
      .then(function() {
        done()
      })
    })

    describe('findSimilar', function () {
      it('never gets itself', function() {
        Page.findOne({
          where: {
            title: "title1"
          }
        })
        .then(function(row){
          console.log('row',row)
          row.findSimilar()
          .then(function(arr){
            expect(arr).to.not.include(row)
          })
        })
      })
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
