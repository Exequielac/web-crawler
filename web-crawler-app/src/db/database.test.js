const { sequelize, authenticateDB } = require('./database');

describe('Database Connection', () => {
    afterAll(async () => {
        await sequelize.close();
      });
      
    it('should authenticate successfully', async () => {
        await expect(authenticateDB()).resolves.toBeUndefined();
    });

    it('should be able to perform operations', async () => {
        const result = await sequelize.query('SELECT 1+1 AS result');
        expect(result[0][0].result).toBe(2);
    });
});
