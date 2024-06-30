// ms_storage/address/model/addressModel.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const AddressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    }
});

const Address = mongoose.model('Address', AddressSchema);
export default Address;
