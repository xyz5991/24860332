const request = require("supertest");
const { expect } = require("chai");

const api = request("http://localhost:3333");


describe("Pretest: first create a user for login tests", () => {

    const validUser = { 
        first_name: "testy",
        last_name: "mctesttest",
        email: `test@example.com`,
        password: "Password1!"
    };

    it("should create a new user", (done) => {
        const res = api
            .post("/users")
            .send(validUser)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("user_id");
                expect(res.body.user_id).to.be.a("number");
                done();
            })
    });
});


describe("POST /login", () => {

    const validLogin = {
        email: "test@example.com",
        password: "Password1!"
    };


    it("should successfully login a user", (done) => {

        const res = api
            .post("/login")
            .send(validLogin)
            .end((err, res) => {
                console.error(err);
                expect(err).to.be.null;

                expect(res.status).to.equal(200);

                expect(res.body)
                    .to.be.an("object");

                expect(res.body)
                    .to.have.property("user_id");

                expect(res.body.user_id)
                    .to.be.a("number");

                expect(res.body)
                    .to.have.property("session_token");

                expect(res.body.session_token)
                    .to.be.a("string");

                done();
            });

    });


    it("should reject login with missing email", (done) => {

        const login = {
            password: "Password1!"
        };

        const res = api
            .post("/login")
            .send(login)
            .end((err, res) => {

                expect(res.status).to.equal(400);

                expect(res.body)
                    .to.have.property("error_message");

                done();
            });

    });


    it("should reject login with missing password", (done) => {

        const login = {
            email: "test@example.com"
        };

        const res = api
            .post("/login")
            .send(login)
            .end((err, res) => {

                expect(res.status).to.equal(400)

                expect(res.body)
                    .to.have.property("error_message");

                done();
            });

    });


    it("should reject an empty request body", (done) => {

        const res = api
            .post("/login")
            .send({})
            .end((err, res) => {

                expect(res.status).to.equal(400);

                expect(res.body)
                    .to.have.property("error_message");

                done();
            });

    });


    it("should reject an invalid email format", (done) => {

        const login = {
            email: "not-an-email",
            password: "Password1!"
        };

        const res = api
            .post("/login")
            .send(login)
            .end((err, res) => {

                expect(res.status).to.equal(400);

                expect(res.body)
                    .to.have.property("error_message");

                done();
            });

    });


    it("should reject an incorrect password", (done) => {

        const login = {
            email: validLogin.email,
            password: "WrongPassword1!"
        };

        const res = api
            .post("/login")
            .send(login)
            .end((err, res) => {

                expect(res.status).to.equal(400);

                expect(res.body)
                    .to.have.property("error_message");

                done();
            });

    });


    it("should reject a non-existent user", (done) => {

        const login = {
            email: "doesnotexist@example.com",
            password: "Password1!"
        };

        const res = api
            .post("/login")
            .send(login)
            .end((err, res) => {

                expect(res.status).to.equal(400);

                expect(res.body)
                    .to.have.property("error_message");

                done();
            });
    });


    it("should not return a password in the response", (done) => {

        const res = api
            .post("/login")
            .send(validLogin)
            .end((err, res) => {

                expect(res.body)
                    .to.not.have.property("password");

                done();
            });
    });

});