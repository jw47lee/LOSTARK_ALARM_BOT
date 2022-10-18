const puppeteer = require('puppeteer');
const url = 'https://lostmerchants.com';

function delay(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

const crawler = async() => {
    try {
        console.log('Hi crawler here');
        const browser = await puppeteer.launch({ headless: true });    // Launch browser automation
        const page = await browser.newPage();
        
        await page.goto(url);

        await delay(5000);                                              // Add delay

        await page.select('select#severRegion', 'NAE');                 // Select Region
        await page.select('select#server', 'Azena');                    // Select Server

        await delay(500);

        const result = await page.evaluate(() => {                      // Retrieve region, area, and item into the result list
            const dataMap = {};
            // Change it to Legendary
            const legList = document.querySelectorAll('div.card-frame.rarity--Legendary.merchant__card');

            if (legList.length) {
                legList.forEach((item) => {
                    let cont = item.querySelector('div.card-frame__inner > div.card-frame__title').innerHTML;
                    let area = item.querySelector('div.card-frame__inner > div.card-frame__title.title__clickable').innerHTML.replace(/[^a-zA-Z0-9 ]/g, '');
                    let img = item.querySelector('div.card-frame__inner > div.m-card__location').style['background-image'];
                    let imgURL = 'https://lostmerchants.com' + img.substring(5, img.length - 2);
                    let card = item.querySelector('div.card-frame__inner > div.stock > div:nth-child(1) > span').innerHTML;
                    let cardRarity = item.querySelector('div.card-frame__inner > div.stock > div:nth-child(1) > span').className.replace('item rarity--', '');
                    let rap = item.querySelector('div.card-frame__inner > div.stock > div:nth-child(2) > span').innerHTML;
                    let rapRarity = item.querySelector('div.card-frame__inner > div.stock > div:nth-child(2) > span').className.replace('item rarity--', '');
                    if (rapRarity != 'Legendary')
                        rap = rap.substring(0, rap.indexOf('<span'));

                    dataMap[cont] = { 'Area': area, 'Image': imgURL,
                        'Card': card, 'Card_Rarity': cardRarity,
                        'Rapport': rap, 'Rapport_Rarity': rapRarity };
                });
            }
            return dataMap;
        });
        // console.log(result);
        browser.close();
        return result;

    } catch (e) {
        console.error(e);
    }
};

module.exports = { crawler };