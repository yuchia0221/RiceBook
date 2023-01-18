/*
 * Test suite for auth
 */
require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:4000${path}`;

describe("Validate Registration and Login functionality", () => {
    it("register new user", (done) => {
        let regUser = {
            username: "testUser",
            password: "123",
            email: "mjoyner@rice.edu ",
            zipcode: 77030,
            dob: "131725122000",
        };
        fetch(url("/register"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(regUser),
        })
            .then((res) => res.json())
            .then((res) => {
                expect(res.username).toEqual("testUser");
                expect(res.result).toEqual("success");
                done();
            });
    });
    it("login user", (done) => {
        let loginUser = { username: "testUser", password: "123" };
        fetch(url("/login"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginUser),
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                expect(res.username).toEqual("testUser");
                expect(res.result).toEqual("success");
                done();
            });
    });
    it("logout user", (done) => {
        let loginUser = { username: "testUser", password: "123" };
        fetch(url("/login"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginUser),
        })
            .then((res) => {
                return res.headers.get("set-cookie").split(";")[0];
            })
            .then((cookie) => {
                fetch(url("/logout"), {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", cookie: cookie },
                }).then((res) => {
                    expect(res.status).toEqual(200);
                    done();
                });
            });
    });
});
