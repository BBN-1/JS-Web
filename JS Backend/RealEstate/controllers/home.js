const { getAllHousings } = require("../services/housing");

const router = require("express").Router();

router.get('/', async (req, res) =>{

    const allHousingOffers = await getAllHousings();
    

    const lastThreeHousing = [];

    for (let i = allHousingOffers.length - 1; i > allHousingOffers.length - 4; i--) {
       
        if(allHousingOffers[i]){
            lastThreeHousing.push(allHousingOffers[i])
        }
        
        
    }

    

    res.render('home', {title: 'Home Page', lastThreeHousing})
})


router.get('/catalog', async (req, res) => {

    const allHousingOffers = await getAllHousings();

    res.render('catalog', {title: 'Catalog page', allHousingOffers})

});


router.get('/search', async (req, res) => {

    

    res.render('search', {title: 'Search page'})

});



module.exports = router;