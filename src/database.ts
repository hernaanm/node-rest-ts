import mongoose from 'mongoose';

class Database {
    mongoUrl

    async connect(){
        mongoose.set('useFindAndModify', true);

            await mongoose.connect(this.mongoUrl, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            }).then(db => console.log('Database is connected'))
            .catch(err => console.log(err));


    }

    constructor() {
        this.mongoUrl = process.env.MONGO_URI;
    }
}

export default Database;
        
