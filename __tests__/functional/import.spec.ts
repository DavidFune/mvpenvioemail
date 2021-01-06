import mongose from 'mongoose';
import Contact from '../../src/schemas/Contact';

describe('Import', () => {
    beforeAll(async () => {
        if(!process.env.MONGO_URL){
            throw new Error("MongoDB server not initialized");
        }
        await mongose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    });

    afterAll(async () => {
        await mongose.connection.close();
    });

    beforeEach(async () => {
        await Contact.deleteMany({});
    });

    it('should be able to import new contacts', async () => {
        await Contact.create({email: 'david@fune.com.br'})

        const list = await Contact.find({});

        expect(list).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    email: 'david@fune.com.br',
                }),
            ]),
        );
    });
});

