import supertest from "supertest";
import {server} from  "./../server.js";
import should from "should";
// UNIT test begin
describe("Contacts API unit test",function(){
this.timeout(120000);//increase timeout of tests to 2 mins. Starting Mockgoose can take time.
// #1 return a collection of json documents
it("should return collection of JSON documents",function(done){
  // calling home page api
  supertest(server)
  .get("/api/contacts")
  .expect("Content-type",/json/)
  .expect(200) // This is the HTTP response
  .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
  });
});
});