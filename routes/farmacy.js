const router = require('express').Router();
const cheerio = require('cheerio');
const fetch = require('node-fetch');

router.get('/', async (req, res, next) => {
    try {
        var results = [];
        const pageParse = (url) =>
            fetch(url)
                .then(response => response.text())
                .then(html => {
                    const $ = cheerio.load(html);
                    var farmacies = $('div[class=doc-info-cont]').each((_, e) => {
                        raw = $(e).html();
                        x = cheerio.load(e);
                        maps = x('h2 a').attr().href
                        farmacy_name = x('h2 a').html();
                        phone = x('.clini-infos p a').html().replace(`<i class="fas fa-phone-volume fa-lg top-icon"></i>`, "")
                        address = x('.doc-location').html().replace(`<i class="fas fa-map-marker-alt mr-1"></i>`, "")
                        results.push(
                            {
                                farmacy_name: farmacy_name,
                                maps: maps,
                                phone: phone,
                                address: address
                            }
                        )
                    })
                });
    
        var url = "https://www.hastanemyanimda.com/nobetci-eczane/istanbul/basaksehir";
        await pageParse(url);
        var url = "https://www.hastanemyanimda.com/nobetci-eczane/istanbul/avcilar";
        await pageParse(url);
        res.send(results);
    } catch (error) {
        next(error);
    }
});

module.exports = router;