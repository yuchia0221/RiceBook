/*
 * Clean up
 */
require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:4000${path}`;

it("Clean up", (done) => {
    fetch(url("/cleanup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "testUser" }),
    })
        .then((res) => {
            expect(res.status).toEqual(200);
            done();
        });
});
