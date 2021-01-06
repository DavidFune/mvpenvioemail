import mongose from 'mongoose';
import { Readable } from 'stream'
import ImportContactsService from '@services/ImportContactsService'

import Contact from '@schemas/Contact';
import Tag from '@schemas/Tag'

//TDD RED - GREEN - REFACTOR
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
        await Tag.deleteMany({});
    });

    it('should be able to import new contacts', async () => {
        const contactsFileStream = Readable.from([
            'david@fune.com.br\n',
            'same@fune.com.br\n',
            'farinha@fune.com.br\n',
        ]);

        const importContacts = new ImportContactsService();

        await importContacts.run(contactsFileStream, ['Students', 'Class A'])

        const createdTags = await Tag.find({}).lean();

        expect(createdTags).toEqual([
                expect.objectContaining({ title: 'Students'}),
                expect.objectContaining({ title: 'Class A'})
        ]);

        const createdTagsIds = createdTags.map(tag => tag._id)

        const createdContacts = await Contact.find({}).lean();

        expect(createdContacts).toEqual([
            expect.objectContaining({
                email: 'david@fune.com.br',
                tags: createdTagsIds,
            }),
            expect.objectContaining({
                email: 'same@fune.com.br',
                tags: createdTagsIds,
            }),
            expect.objectContaining({
                email: 'farinha@fune.com.br',
                tags: createdTagsIds,
            }),
        ]);
    });
});

