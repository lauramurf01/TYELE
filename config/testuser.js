var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8000");

// UNIT test begin

describe("Studuserents API unit tests",function(){
  // #1 should return user representation in json
  it("should return collection of JSON documents",function(done){

    

  //  add a user
  it("should add a new user",function(done){

    
    server.post('/api/user')
    .send({name:"user 99",address:"123 Strand St"})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      done();
    });
  });
  
  //#update a user
  it("Should update a user", function(done){
    server.put('/api/user/58bef7881da270105c755676')
    .send({name:"user 99",address:"123 Strand St"})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });


