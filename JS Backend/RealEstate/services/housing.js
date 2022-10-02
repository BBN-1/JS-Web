

const Housing = require('../models/housing');


async function getAllHousings() {
    return Housing.find({}).lean();
    
}


async function getHousingById(id){
    return Housing.findById(id).lean();
}

// async function getTripsByCreator(userId){
//     return Trip.find({creator: userId})
// }



async function getHousingAndRenters(id){
    return Housing.findById(id).populate('owner').populate('rentedAHome').lean();
}

async function createHousing(housing){
    const result = new Housing(housing);

    await result.save();
}


async function rentProperty(housingID, userId) {
    const housing = await Housing.findById(housingID);

    if(housing.rentedAHome.includes(userId)){
        throw new Error ('User already rented the property');
    } 

    housing.rentedAHome.push(userId);
    await housing.save();




}

async function deleteById(id) {
    await Housing.findByIdAndDelete(id);
}

async function updateOffer(id, offer ) {
    const existing = await Housing.findById(id);

    existing.name = offer.name;
    existing.type = offer.type;
    existing.year = offer.year;
    existing.city = offer.city;
    existing.homeImage = offer.homeImage;
    existing.propertyDescription = offer.propertyDescription;
    existing.availablePieces = offer.availablePieces;
 

    await existing.save();
}


module.exports = {

    createHousing,
    getAllHousings,
    getHousingById,
    getHousingAndRenters,
    rentProperty,
    deleteById,
    updateOffer,

};