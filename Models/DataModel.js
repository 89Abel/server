const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const DataSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter username"],
            unique: true,
            trim: true,
        },
        email: {
            type: String ,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true, 
        }
    },
    {
        timestamps: true,
        collection: 'users'
    });
// 
    DataSchema.pre('save', async function (next) {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        } catch(error){
            next(error);
        }
    });

    DataSchema.methods.comparePassword =  async function (candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    };

    const Data = mongoose.model('Data', DataSchema);
    module.exports = Data;