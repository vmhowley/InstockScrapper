const {chromium} = require('playwright')

const shops = [
    {
        shop: 'Nike',
        vendor: 'Nike',
        url: 'https://www.nike.com/launch/t/air-force-3-low-x-nigo-blue-void-and-tour-yellow1',
        checkStock: async ({browser, url}) => {
            const page = await browser.newPage()
            await page.goto(url)
            const content = await page.textContent('.ncss-btn-primary-dark');
            const hasStock = content.includes('Notify Me') || content.includes('Sold Out') === false
            return hasStock
        }
    },
    {
        shop: 'StockX',
        vendor: 'StockX',
        url: 'https://www.nike.com/launch/t/air-force-3-low-x-nigo-blue-void-and-tour-yellow1',
        checkStock: async ({browser, url}) => {
            const page = await browser.newPage()
            await page.goto(url)
            const content = await page.textContent('.ncss-btn-primary-dark');
            const hasStock = content.includes('Notify Me') || content.includes('Sold Out') === false
            return hasStock
        }
    },
]

;(async () => {
    const browser = await chromium.launch()
    for (const shop of shops) {
        const { checkStock, vendor, url } = shop 
        const page = await browser.newPage()
        await page.goto(url)
        const hasStock = await shop.checkStock({browser, url: shop.url})
        console.log(`${vendor}: ${hasStock? 'In Stock' : 'Out of Stock'}`)
        await page.screenshot({path: `${vendor}.png`})
        await page.close()
    }
    await browser.close()
    setInterval('autoRefresh()', 5000);
})()