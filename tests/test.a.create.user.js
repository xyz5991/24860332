const request = require("supertest");
const { expect } = require("chai");

const api = request("http://localhost:3333");


describe("POST /users", () => {

    const validUser = {
        first_name: "Ashley",
        last_name: "Williams",
        email: `ashley${Date.now()}@example.com`,
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
            });
    });


    it("should reject an empty request body", (done) => {
        const res = api
            .post("/users")
            .send({})
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property("error_message");
                done();
            });
    });

    it("should reject a missing first_name", (done) => {
        const user = {
            ...validUser,
            email: `first${Date.now()}@example.com`
        };

        delete user.first_name;

        const res = api
            .post("/users")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property("error_message");
                done();
            });
    });

    it("should reject a missing last_name", (done) => {
        const user = {
            ...validUser,
            email: `last${Date.now()}@example.com`
        };

        delete user.last_name;

        const res = api
            .post("/users")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property("error_message");
                done();
            });
    });

    it("should reject a missing email", (done) => {
        const user = { ...validUser };
        delete user.email;

        const res = api
            .post("/users")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property("error_message");
                done();
            });
    });

    it("should reject a missing password", (done) => {
        const user = {
            ...validUser,
            email: `password${Date.now()}@example.com`
        };

        delete user.password;

        const res = api
            .post("/users")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property("error_message");
                done();
            });
    });

    it("should reject an invalid email address", (done) => {
        const user = {
            ...validUser,
            email: "not-an-email"
        };

        const res = api
            .post("/users")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property("error_message");
                done();
            });
    });

    it("should reject a password shorter than 8 characters", (done) => {
        const user = {
            ...validUser,
            email: `short${Date.now()}@example.com`,
            password: "Ab1!"
        };

        const res = api
            .post("/users")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property("error_message");
                done();
            });
    });

    it("should reject a password with no uppercase letter", (done) => {
        const user = {
            ...validUser,
            email: `upper${Date.now()}@example.com`,
            password: "password1!"
        };

        const res = api
            .post("/users")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property("error_message");
                done();
            });
    });

    it("should reject a password with no lowercase letter", (done) => {
        const user = {
            ...validUser,
            email: `lower${Date.now()}@example.com`,
            password: "PASSWORD1!"
        };

        const res = api
            .post("/users")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property("error_message");
                done();
            });
    });

    it("should reject a password with no special character", (done) => {
        const user = {
            ...validUser,
            email: `special${Date.now()}@example.com`,
            password: "Password1"
        };

        const res = api
            .post("/users")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property("error_message");
                done();
            });
    });

    it("should reject a duplicate email address", (done) => {

        const duplicateUser = {
            first_name: "John",
            last_name: "Smith",
            email: `duplicate${Date.now()}@example.com`,
            password: "Password1!"
        };

        const res = api
            .post("/users")
            .send(duplicateUser)
            .end(() => {

                const res = api
                    .post("/users")
                    .send(duplicateUser)
                    .end((err, res) => {
                        expect(res.status).to.equal(400);
                        expect(res.body).to.have.property("error_message");
                        done();
                    });

            });

    });

});