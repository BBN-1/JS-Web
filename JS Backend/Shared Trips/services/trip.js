//TO D0 - change nMW TO APPR SERVICE

const Trip = require('../models/trip');


async function getAllTrips() {
    return Trip.find({}).lean();
    
}


async function getTripById(id){
    return Trip.findById(id).lean();
}

async function getTripsByCreator(userId){
    return Trip.find({creator: userId})
}


async function getTripAndBuddies(id){
    return Trip.findById(id).populate('creator').populate('buddies').lean();
}

async function createTrip(offer){
    const result = new Trip(offer);

    await result.save();
}


async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);

    if(trip.buddies.includes(userId)){
        throw new Error ('User already joined the trip');
    } 

    trip.buddies.push(userId);
    await trip.save();



}

async function deleteById(id) {
    await Trip.findByIdAndDelete(id);
}

async function updateTrip(id, collection ) {
    const existing = await Trip.findById(id);

    existing.startPoint = collection.startPoint;
    existing.endPoint = collection.endPoint;
    existing.date = collection.date;
    existing.time = collection.time;
    existing.carImage = collection.carImage;
    existing.carBrand = collection.carBrand;
    existing.price = collection.price;
    existing.description = collection.description;
    existing.seats = collection.seats;
 

    await existing.save();
}


module.exports = {
    getTripById,
    getTripAndBuddies,
    createTrip,
    getAllTrips,
    deleteById,
    updateTrip,
    joinTrip,
    getTripsByCreator
    

};