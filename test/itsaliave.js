var expect = require('chai').expect
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

var models = require('../models');
var Page = models.Page;
var User = models.User;


describe('Page model', function () {

  // before(function(done) {
  //   Page.destroy({
  //     where: {}
  //   })
  //   .then(function() {
  //     done()
  //   })
  // })

  xdescribe('Virtuals', function () {

    // create test page
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
        expect(testPage.route.slice(0,6)).to.equal("/wiki/");
      });
    });

    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function() {
        expect(testPage.renderedContent).to.equal('<h1 id="content">content</h1>\n')
      });
    });

  });

  xdescribe('Class methods', function () {
    beforeEach(function(done) {
      Page.create({
        title: "title",
        content: "# content",
        status: "open",
        tags: "tag1,tag2,tag3"
      })
      .then(done());
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

  })

  describe('Instance methods', function () {

    // creating all pages
    var testPage1 = Page.create({
      title: "title1",
      content: "content",
      status: "open",
      tags: "a,b,c"
    });
    var testPage2 = Page.create({
      title: "title2",
      content: "content",
      status: "open",
      tags: "c,d,e"
    });
    var testPage3 = Page.create({
      title: "title3",
      content: "content",
      status: "open",
      tags: "f,g,h"
    });

    beforeEach(function(done) {
      Promise.all([testPage1, testPage2, testPage3])
      .then(function() {
        done()
      })
    })

    // test findSimilar instance method
    describe('findSimilar', function () {



      it('never gets itself', function() {
        // find one page and its similar pages
        beforeEach(function(done){
          Page.findOne({
            where: {
              title: "title1"
            }
          })
          .then(function(targetPage){
            targetPage.findSimilar()
            .then(function(foundPages){
              expect(foundPages).to.not.include(targetPage);
              done();
            })
          })
        })

      })

      it('gets other pages with any common tags', function(){
        // find one page and its similar pages
        beforeEach(function(done){
          Page.findOne({
            where: {
              title: "title1"
            }
          })
          .then(function(targetPage){
            targetPage.findSimilar()
              .then(function(foundPages){ //[similarpage1, similarpage2]
                expect(foundPages[0].tags).to.include("c");
                done();
              }) 
          })
        })

      });

      xit('does not get other pages without any common tags', function(){
        expect(foundPages).to.have.lengthOf(1);
      });
    });

  });


  xdescribe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });


  xdescribe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});



















