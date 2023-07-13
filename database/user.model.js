const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: mongoose.Schema.Types.String, required: true },
        surname: { type: mongoose.Schema.Types.String, required: true },
        email: { type: mongoose.Schema.Types.String, required: true, unique: true },
        password: { type: mongoose.Schema.Types.String, required: true },
        phone: { type: mongoose.Schema.Types.String, required: false, unique: true },
        type: { type: mongoose.Schema.Types.String, required: true, default: "default" },
        role: { type: mongoose.Schema.Types.String, required: false, default: "default" },
        location: {
            city: { type: mongoose.Schema.Types.String, required: false },
            district: { type: mongoose.Schema.Types.String, required: false },
        },
        behavior: {
            searches: [{ type: mongoose.Schema.Types.String, required: false }],
            interests: [{ type: mongoose.Schema.Types.Mixed, required: false }],
            timeSpent: { type: mongoose.Schema.Types.Number, required: false }
        },
        preferences: { type: mongoose.Schema.Types.Mixed, required: false },
        validated: { type: mongoose.Schema.Types.Boolean, required: false, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);