const request = require("supertest");
const { expect } = require("chai");

const api = request("http://localhost:3333");

describe("POST /logout", () => {

    let sessionToken;

    const credentials = {
        email: "test@example.com",
        password: "Password1!"
    };


    before((done) => {

        const res = api
            .post("/login")
            .send(credentials)
            .end((err, res) => {

                expect(res.status).to.equal(200);
                sessionToken = res.body.session_token;

                done();
            });

    });


    it("should successfully log out an authenticated user", (done) => {

        const res = api
            .post("/logout")
            .set("X-Authorization", sessionToken)
            .end((err, res) => {

                expect(err).to.be.null;
                expect(res.status).to.equal(204);
                expect(res.body).to.be.empty;

                done();
            });

    });


    it("should reject requests without a session token", (done) => {

        const res = api
            .post("/logout")
            .end((err, res) => {

                expect(res.status).to.equal(401);

                done();
            });

    });


    it("should reject an invalid session token", (done) => {

        const res = api
            .post("/logout")
            .set("X-Authorization", "this-is-not-a-valid-token")
            .end((err, res) => {

                expect(res.status).to.equal(401);

                done();
            });

    });


    it("should reject a session token that has already been logged out", (done) => {

        const res = api
            .post("/logout")
            .set("X-Authorization", sessionToken)
            .end((err, res) => {

                expect(res.status).to.equal(401);

                done();
            });

    });

});