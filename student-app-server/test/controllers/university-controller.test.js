import request from 'supertest';

describe('/api/uni', () => {
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
  
    it('check university list is retrieved successfully', async () => {
      const res = await request(app)
        .get('/api/uni');
      await expect(res.status).toBe(200);
    });

    it("check university is created successfully", async () => {
    const response = await request(app)
      .post("/api/uni/create")
      .send(
        {
            name: "Concordiatest",
            type: "Science",
            Address: {
                city: "Montreal",
                zipcode: "ABC111",
                country: "Canada"
            },
            url: "http://www.test.com",
            totalStudents: 34000,
            establishedDate: 1286649000000,
            courses: "62249644ef8192b8933ab8a8"
        });
        expect(response.status).toBe(201);
    });

    it("check university is deleted successfully", async () => {
        const response = await request(app)
            .delete("/api/uni/Concordiatest");
        await expect(response.status).toBe(200);
    });

    it("check university delete failes if university not present", async () => {
        const response = await request(app)
            .delete("/api/uni/Concordiatest1234");
        await expect(response.status).toBe(404);
    });

  });