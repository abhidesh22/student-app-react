
import request from 'supertest';

describe('/api/course', () => {
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
  
    it('check courses list is retrieved successfully', async () => {
      const res = await request(app)
        .get('/api/course');
      await expect(res.status).toBe(200);
    });

    it("check new course is created successfully", async () => {
        const response = await request(app)
            .post("/api/course/create")
            .send({
                name: "Maths11",
                type: "Science11",
                subjects: "subject1;subject2;subject3111"
            });
        await expect(response.status).toBe(201);
    });

    it("check course is deleted successfully", async () => {
      const response = await request(app)
          .delete("/api/course/Maths11");
      await expect(response.status).toBe(200);
    });
  
    it("check course delete fails if course not present", async () => {
      const response = await request(app)
          .delete("/api/course/Maths1144");
      await expect(response.status).toBe(404);
    });
  
  });