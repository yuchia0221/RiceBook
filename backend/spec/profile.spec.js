/*
 * Test suite for profile
 */
require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:4000${path}`;

describe("Validate Profile APIS functionality", () => {
    it("GET /headline/chenaa", (done) => {
        let loginUser = { username: "testUser", password: "123" };
        fetch(url("/login"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginUser),
        })
            .then((res) => {
                const string = res.headers.get("set-cookie").split(";")[0];
                return string.replace("sessionId=", "");
            })
            .then((sessionId) => {
                fetch(url("/headline/chenaa"), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: JSON.stringify({ sessionId: sessionId }),
                    },
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        expect(res.username).toBe("chenaa");
                        expect(res.headline).toBe("My headline");
                        done();
                    });
            });
    });
    it("PUT /headline", (done) => {
        let loginUser = { username: "testUser", password: "123" };
        fetch(url("/login"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginUser),
        })
            .then((res) => {
                const string = res.headers.get("set-cookie").split(";")[0];
                return string.replace("sessionId=", "");
            })
            .then((sessionId) => {
                fetch(url("/headline"), {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: JSON.stringify({ sessionId: sessionId }),
                    },
                    body: JSON.stringify({ headline: "New headline" }),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        expect(res.username).toBe("testUser");
                        expect(res.headline).toBe("New headline");
                        done();
                    });
            });
    });
});
