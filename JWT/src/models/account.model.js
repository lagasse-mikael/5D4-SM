import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        displayName: { type: String, required: true },
        fourDigits: { type: String, required: true },
        isBanned: { type: Boolean, required: false }
    },
    {
        collection: 'accounts',
        timestamps: true,
        strict: 'throw'
    }
);

schema.index({ displayName: 1, fourDigits: 1 }, { unique: true });

export default mongoose.model('Account', schema);
