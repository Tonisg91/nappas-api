const { Schema, model} = require('mongoose')

module.exports = model('User', new Schema(
    {
        email: {
            type: String,
            required: [true, "Email obligatorio"],
            match: [/^\S+@\S+\.\S+$/, "Dirección de correo inválida"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        photo: {
            type: String,
            default: 'https://adncultura.org/sites/default/files/styles/mg_user_picture/public/default_images/default-user.png?itok=-m-meRA9'
        },
        name: String,
        passwordHash: {
            type: String,
            required: [true, "Contraseña obligatoria"],
        },
        announcements: [
            {
                type: Schema.Types.ObjectId,
                ref: "Announcement",
            },
        ],
        workInProgress: [
            {
                type: Schema.Types.ObjectId,
                ref: "Announcement"
            }
        ],
        location: {
            state: String,
            city: String,
            lat: Number,
            lng: Number,
        },
        description: String,
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: "Review",
        }],
    },
        {
            timestamps: {
                createdAt: "createdAt",
                updatedAt: "updatedAt",
            },
        }
))