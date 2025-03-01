import mongoose, { Schema } from 'mongoose';

const tokenMapSchema = new Schema({
    discord_id: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    }
});

/**
 * Maps an IsThereAnyDeal access token to a discord users id
 */
const TokenMap = mongoose.model('TokenMap', tokenMapSchema);

export default TokenMap;