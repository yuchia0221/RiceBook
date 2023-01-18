/*
 * Test suite for articles
 */
require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:4000${path}`;

describe("Validate Article APIS functionality", () => {
    it("GET /articles", (done) => {
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
                fetch(url("/articles"), {
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
                        expect(res.articles.length).toBeGreaterThanOrEqual(0);
                        done();
                    });
            });
    });
    it("GET /articles/id", (done) => {
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
                fetch(url("/articles/chenaa"), {
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
                        expect(res.articles.length).toBe(3);
                        done();
                    });
            });
    });
    it("POST /article", (done) => {
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
                fetch(url("/article"), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: JSON.stringify({ sessionId: sessionId }),
                    },
                    body: JSON.stringify({ text: "test post" }),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        expect(res.articles.length).toBe(1);
                        expect(res.articles[0].author).toBe("testUser");
                        expect(res.articles[0].text).toBe("test post");
                        done();
                    });
            });
    });
});
