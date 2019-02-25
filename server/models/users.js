const mongoose = require('mongoose')
const { encrypt } = require('../helpers/encrypt')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [{
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            },
            msg: "Incorrect email format"
        }, {
            isAsync: true,
            validator: function (v, cb) {
                User.findOne({
                    email: v
                })
                    .then(user => {
                        if (user && user._id.toString() != this._id.toString()) {
                            cb(false)
                        } else {
                            cb(true)
                        }
                    })
                    .catch((err) => {
                        throw err
                    })
            },
            message: "Email is already been used."

        }]
    },
    password: { 
        type : String,
        required : true
    },
    role: {
        type : String,
        default : 'admin'
    },
    cart : { type: Schema.Types.ObjectId, ref: 'Cart' }
}, { timestamps: true })


userSchema.pre('save', function (next) {
    try {
        var user = this;
        if (!user.isModified('password')) return next();
        encrypt(user, function (err, hash) {
            if (err) {
                next(err)
            } else {
                user.password = hash;
                next();
            }
        })
    } catch (err) {
        next(err)
        console.log(err);

    }

});

const User = mongoose.model('User', userSchema)
module.exports = User