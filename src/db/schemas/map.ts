import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const mapSchema = new Schema({
    uuid: {
        type: Schema.Types.UUID,
        unique: true,
        default: () => uuidv4()
    },
    webhook_id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    }
});

const Map = mongoose.model('Map', mapSchema);

export default Map;