const { sequelize, authenticateDB, createTablesIfNotExist, Filters, UsageData } = require('./database');

describe('Database Tests', () => {
    afterAll(async () => {
        await sequelize.close();
    });

    describe('Connection', () => {
        it('should authenticate successfully', async () => {
            await expect(authenticateDB()).resolves.toBeUndefined();
          });
        
          it('should be able to perform operations', async () => {
            const result = await sequelize.query('SELECT 1+1 AS result');
            expect(result[0][0].result).toBe(2);
          });
        
          it('should create tables if not exist', async () => {
            await expect(createTablesIfNotExist()).resolves.toBeUndefined();
          });
    });

    describe('Models', () => {
        it('should have a Filters model', () => {
            expect(Filters).toBeDefined();
        });

        it('should have a UsageData model', () => {
            expect(UsageData).toBeDefined();
        });
    });

    describe('Tables', () => {
        it('should have a Filter table', async () => {
            const result = await sequelize.query('SELECT * FROM "Filters"');
            expect(result).toBeDefined();
        });

        it('should have a UsageData table', async () => {
            const result = await sequelize.query('SELECT * FROM "UsageData"');
            expect(result).toBeDefined();
        });
    });
});
