// Import the dependencies for testing
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import shallowDeepEqual from "chai-shallow-deep-equal";

// Configure chai
chai.use(chaiHttp).use(shallowDeepEqual);
chai.should();

let defaultUser = {
  username: "florencia",
  password: "admin@123",
};

let token;

describe("User", () => {
  describe("POST /api/user/signup", () => {
    it("should create a user", (done) => {
      chai
        .request(app)
        .post("/api/user/signup")
        .send(defaultUser)
        .end((err, res) => {
          res.should.have.status(201);
        });
      done();
    });
  });

  describe("POST /api/user/login", () => {
    it("should logs in a user", (done) => {
      chai
        .request(app)
        .post("/api/user/login")
        .send(defaultUser)
        .end((err, res) => {
          res.should.have.status(201);
        });
      done();
    });
  });
});

let defaultDivelog = {
  username: defaultUser.username,
  name: "Divelog-1",
  year: 2022,
  location: "Bali",
};

describe("Dive logs", () => {
  describe("POST /api/divelog/create-divelog", () => {
    // Test to get all students record
    it("should create a single divelog record", (done) => {
      chai
        .request(app)
        .post("/api/divelog/create-divelog")
        // .set({ Authorization: `Bearer ${token}` })
        .send(defaultDivelog)
        .end((err, res) => {
          res.should.have.status(201);
        });
      done();
    });
  });

  describe("GET /api/divelog/name", () => {
    // Test to get all students record
    it("should get a single divelog record", (done) => {
      const divelogName = defaultDivelog.name;
      const username = defaultDivelog.username;
      chai
        .request(app)
        .get(`/api/divelog/name?username=${username}&name=${divelogName}`)
        // .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          chai.expect(res.body).to.shallowDeepEqual(defaultDivelog);
        });
      done();
    });
  });

  describe("GET /api/divelog/year", () => {
    it("should get multiple divelog record", (done) => {
      const divelogYear = defaultDivelog.year;
      const username = defaultDivelog.username;
      chai
        .request(app)
        .get(`/api/divelog/year?username=${username}&year=${divelogYear}`)
        // .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be("object");
        });
      done();
    });
  });

  describe("PUT /api/divelog/update-divelog", () => {
    it("should get updated divelog record", (done) => {
      const defaultNewLog = {
        username: defaultDivelog.username,
        name: defaultDivelog.name,
        year: 2023,
        location: "Lazarus",
        depth: 29.8,
      };

      const updatedMsg = {
        message: "Successfully updated dive log.",
      };

      chai
        .request(app)
        .put(`/api/divelog/update-divelog`)
        // .set({ Authorization: `Bearer ${token}` })
        .send(defaultNewLog)
        .end((err, res) => {
          res.should.have.status(200);
          chai.expect(res.body).to.shallowDeepEqual(updatedMsg);
        });
      done();
    });
  });

  describe("DELETE /api/divelog/delete-divelog", () => {
    it("should delete a divelog record", (done) => {
      const deletedMsg = {
        message: "Successfully deleted dive log.",
      };
      chai
        .request(app)
        .delete(`/api/divelog/delete-divelog`)
        // .set({ Authorization: `Bearer ${token}` })
        .send({ username: defaultDivelog.username, name: defaultDivelog.name })
        .end((err, res) => {
          res.should.have.status(200);
          chai.expect(res.body).to.shallowDeepEqual(deletedMsg);
        });
      done();
    });
  });

  // after(async () => {
  //   //After each test, empty the database
  //   await UserModel.deleteOne({ name: defaultUser.name });
  // });
});
