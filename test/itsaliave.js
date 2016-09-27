var expect = require('chai').expect
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);


describe("simple test", function() {
  it("tests simple addition", function() {
    expect(2 + 2).to.equal(4)
  })
  it('tests asynchronous code', function(done) {
    var timeNow = Date.now();
    var timeLater = setTimeout(function() {
      expect(Date.now() - timeNow).to.be.closeTo(1000, 50)
      done()
    }, 1000)
  })
  it('tests the spy functionality of chai', function() {
    var array = [1, 2, 3];
    var spy = Array.prototype.forEach;
    chai.spy.on(array, 'forEach')
    array.forEach(function(e) {
      return e + 1;
    })
    expect('forEach').to.have.been.called(3);
  })
})
