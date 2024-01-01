// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// setupTests.js
import "@testing-library/jest-dom";
import "intersection-observer"; // Import the polyfill
import "jest-localstorage-mock";
//Mocking inetersection observer
import { configMocks } from "jsdom-testing-mocks";
import { act } from "./test-utils";
configMocks({ act });
//Mock Server
import { server } from "./mocks/server";
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
beforeEach(() => {
    // to fully reset the state between tests, clear the storage
    localStorage.clear();
    // clearAllMocks will impact your other mocks too, so you can optionally reset individual mocks instead:
    localStorage.setItem("userInfo", JSON.stringify({
        id: 1,
        firstName: "Megh",
        lastName: "Patel",
        email: "megh@gmail.com",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozMywiZmlyc3ROYW1lIjoiTWVnaCIsImxhc3ROYW1lIjoiUGF0ZWwiLCJlbWFpbCI6Im1lZ2hwYXRlbEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzMjUzMjk0LCJle",
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7I…wOTR9.CkWyQL2gHJfBiKqye8fOnWLREEmhGz2e9OQzVzgDsp4",
    }));
});
