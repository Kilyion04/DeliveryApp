// ms_storage/address/routes/address.js
import { Router } from 'express';
import {
    fetchAddressesFromAPI,
    updateAddressesFromAPI,
    addAddressManually,
    getAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
    fetchAndSaveAddresses
} from '../controllers/addressController.js';

const router = Router();

// Route to fetch and save addresses from API
router.post('/fetch', fetchAddressesFromAPI);

// Route to update addresses from API
router.put('/update', updateAddressesFromAPI);

// Route to add an address manually
router.post('/add', addAddressManually);

// Route to get all addresses
router.get('/', getAddresses);

// Route to get a single address by ID
router.get('/:id', getAddressById);

// Route to update an address by ID
router.put('/:id', updateAddress);

// Route to delete an address by ID
router.delete('/:id', deleteAddress);

// Route to fetch and save addresses from external API
router.post('/fetch-and-save', fetchAndSaveAddresses);

export default router;
