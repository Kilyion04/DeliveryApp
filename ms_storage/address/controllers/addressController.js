// ms_storage/address/controllers/addressController.js
import fetch from 'node-fetch';
import Address from '../model/addressModel.js';

const API_URL = 'https://adresse.data.gouv.fr/api-doc/adresse'; // Replace with actual API endpoint

export const fetchAndSaveAddresses = async (req, res) => {
    try {
        const query = req.body.query || 'Paris'; // Replace 'Paris' with your default query or handle appropriately
        const response = await fetch(`${API_URL}${query}`);
        const data = await response.json();

        // Transform data to match Address schema
        const addresses = data.features.map(feature => ({
            street: feature.properties.name,
            city: feature.properties.city,
            postalCode: feature.properties.postcode,
            country: 'France',
            coordinates: {
                lat: feature.geometry.coordinates[1],
                lon: feature.geometry.coordinates[0]
            }
        }));

        // Save addresses to MongoDB
        await Address.insertMany(addresses);
        res.status(201).json({ message: 'Addresses fetched and saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch addresses from the external API
export const fetchAddressesFromAPI = async (req, res) => {
    try {
        const response = await fetch(API_URL);
        const addresses = await response.json();

        // Save addresses to MongoDB
        await Address.insertMany(addresses.features.map(feature => ({
            street: feature.properties.name,
            city: feature.properties.city,
            postalCode: feature.properties.postcode,
            country: 'France', // Assuming all addresses are in France
            coordinates: {
                lat: feature.geometry.coordinates[1],
                lon: feature.geometry.coordinates[0]
            }
        })));

        res.status(201).json({ message: 'Addresses fetched and saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch and update addresses from the external API
export const updateAddressesFromAPI = async (req, res) => {
    try {
        const response = await fetch(API_URL);
        const addresses = await response.json();

        // Clear existing addresses and save new ones
        await Address.deleteMany({});
        await Address.insertMany(addresses.features.map(feature => ({
            street: feature.properties.name,
            city: feature.properties.city,
            postalCode: feature.properties.postcode,
            country: 'France',
            coordinates: {
                lat: feature.geometry.coordinates[1],
                lon: feature.geometry.coordinates[0]
            }
        })));

        res.status(200).json({ message: 'Addresses updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new address manually
export const addAddressManually = async (req, res) => {
    const { street, city, postalCode, country, coordinates } = req.body;

    const newAddress = new Address({
        street,
        city,
        postalCode,
        country,
        coordinates
    });

    try {
        const savedAddress = await newAddress.save();
        res.status(201).json(savedAddress);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Read all addresses
export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find();
        res.status(200).json(addresses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Read a single address by ID
export const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (address) {
            res.status(200).json(address);
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an address by ID
export const updateAddress = async (req, res) => {
    const { street, city, postalCode, country, coordinates } = req.body;

    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            { street, city, postalCode, country, coordinates },
            { new: true, runValidators: true }
        );
        if (updatedAddress) {
            res.status(200).json(updatedAddress);
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete an address by ID
export const deleteAddress = async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.id);
        if (deletedAddress) {
            res.status(200).json({ message: 'Address deleted successfully' });
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
