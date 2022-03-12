import request from 'supertest';

describe('/api/student', () => {
    let app;
    beforeAll(async () => {
      const mod = await import('../../../student-app-server/app');
      app = mod.default;
    });
  
    afterAll((done) => {
      if (app) {
        app.close(done);
      }
    });
  
    it('check student list is retrieved successfully', async () => {
      const res = await request(app)
        .get('/api/student');
      await expect(res.status).toBe(200);
    });

    it('check student is retrieved successfully by roll number', async () => {
        const res = await request(app)
          .get('/api/student/2');
        await expect(res.status).toBe(200);
    });

    it('check student list by university is retrieved successfully', async () => {
        const res = await request(app)
          .get('/api/student/byuni/6224974d945bdd73dfa24073');
        await expect(res.status).toBe(200);
    });

    it('check student grade aggregation by university is retrieved successfully', async () => {
        const res = await request(app)
          .get('/api/student/bysubject/6224974d945bdd73dfa24073');
        await expect(res.status).toBe(200);
    });

    it("check student is created successfully", async () => {
    const response = await request(app)
      .post("/api/student/create")
      .send(
        {
            rollno: 8999,
            name: "NewStudent",
            degreeEnrolled: "Bachelors",
            address: {
              city: "Pune",
              zipcode: "IND111",
              country: "India"
            },
            url: "https://www.test.com",
            grade: 82,
            enrolledDate: 1609439400000,
            course: "622496a0ef8192b8933ab8b4",
            university: "6224a9a9945bdd73dfa24078"
        });
        expect(response.status).toBe(201);
    });

    it("check student is updated successfully", async () => {
        const response = await request(app)
          .put("/api/student/8999")
          .send(
            {
                name: "NewStudent333",
                degreeEnrolled: "Bachelors",
                address: {
                  city: "Pune",
                  zipcode: "IND13311",
                  country: "India"
                },
                url: "https://www.tes33t.com",
                grade: 82,
                enrolledDate: 1609439400000,
                course: "622496a0ef8192b8933ab8b4",
                university: "6224a9a9945bdd73dfa24078"
            });
        expect(response.status).toBe(200);
    });

    it("check student is deleted successfully", async () => {
        const response = await request(app)
            .delete("/api/student/8999");
        expect(response.status).toBe(200);
    });

    it("check student delete failes if rollno not present", async () => {
        const response = await request(app)
            .delete("/api/student/293933939");
        await expect(response.status).toBe(404);
    });

  });