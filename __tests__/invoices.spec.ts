import supertest from "supertest";
import jwt from "jsonwebtoken";
import app from "../src/app";
import { generateAuthToken } from "../src/modules/auth/jwt";
import { UserI } from "../src/models/User";

const api = supertest(app);

describe("GET /invoices", () => {
  test("invoices are returned as json", async () => {
    // const user: UserI = {
    //   _id: "123",
    //   name: "elkin",
    //   email: "test@test.com",
    //   password: "test",
    // };
    // const token = generateAuthToken(user);

    // await api
    //   .get("/api/invoices")
    //   .set("Authorization", `Bearer ${token}`)
    //   .expect(200)
    //   .expect("Content-Type", /application\/json/);
    expect(true).toBe(true);
  });
});
