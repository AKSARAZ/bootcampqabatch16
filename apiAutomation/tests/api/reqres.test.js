import { BASE_URL } from "../../config/config.js";
import { expect } from "chai";
import fetch from "node-fetch";
import Ajv from "ajv";

import getUsersSchema from "../schema/getUsersSchema.js";
import createUserSchema from "../schema/createUserSchema.js";
import notFoundSchema from "../schema/notFoundSchema.js";

const ajv = new Ajv();

describe("Reqres API Automation", () => {
  it("GET List Users", async () => {
    const response = await fetch(`${BASE_URL}/users?page=2`, {
      headers: {
        "x-api-key":
          "pub_e1428eef64465b09233e0658731a10fa6feeb6020d343532d4acdda819d632cb",
      },
    });

    expect(response.status).to.equal(200);

    const body = await response.json();

    const validate = ajv.compile(getUsersSchema);

    expect(validate(body)).to.equal(true);

    expect(body.page).to.equal(2);
    expect(body.per_page).to.equal(6);
    expect(body.data).to.be.an("array");
    expect(body.data.length).to.be.greaterThan(0);

    expect(body.data[0]).to.have.property("id");
    expect(body.data[0]).to.have.property("email");
    expect(body.data[0]).to.have.property("first_name");
    expect(body.data[0]).to.have.property("last_name");
    expect(body.data[0]).to.have.property("avatar");
  });

  it("GET Single User Not Found", async () => {
    const response = await fetch(`${BASE_URL}/users/23`, {
      headers: {
        "x-api-key":
          "pub_e1428eef64465b09233e0658731a10fa6feeb6020d343532d4acdda819d632cb",
      },
    });

    expect(response.status).to.equal(404);

    const body = await response.json();

    const validate = ajv.compile(notFoundSchema);

    expect(validate(body)).to.equal(true);

    expect(body).to.deep.equal({});
  });

  it("POST Create User", async () => {
    const payload = {
      name: "John Doe",
      job: "QA Engineer",
    };

    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "pub_e1428eef64465b09233e0658731a10fa6feeb6020d343532d4acdda819d632cb",
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).to.equal(201);

    const body = await response.json();

    const validate = ajv.compile(createUserSchema);

    expect(validate(body)).to.equal(true);

    expect(body.name).to.equal(payload.name);
    expect(body.job).to.equal(payload.job);

    expect(body).to.have.property("id");
    expect(body).to.have.property("createdAt");
  });
});
