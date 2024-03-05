const puppeteer = require('puppeteer')
const fs = require('fs/promises')

const hockeyTeams = async () =>{
    //initiating the browser
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    //navigating to the website page
    await page.goto('https://www.scrapethissite.com/')

    //navigating to the hockey teams page
    await Promise.all([page.click('a[href="/pages/"]'),page.waitForNavigation()])

    //hockey teams page
    await Promise.all([page.click('a[href="/pages/forms/"]'),page.waitForNavigation()])

    //filling the form and selecting the search button
    await page.type("#q","Calgary Flames")

    //clicking the search button to select search results
    await Promise.all([page.click(".btn-primary"),page.waitForNavigation()])

    //fetching the search results for dallas stars from the table 
    const results = await page.$$eval("table.table .team",(items) => {
        //iterating over the results to select the search data
        return items.map((item)=>{
            data = {}
            const team = item.querySelector(".name").textContent.trim()
            const year = item.querySelector(".year").textContent.trim()
            const wins = item.querySelector(".wins").textContent.trim()
            const losses = item.querySelector(".losses").textContent.trim()
            const ot_losses = item.querySelector(".ot-losses").textContent.trim()
            const pct_text_success = item.querySelector(".pct").textContent.trim()
            const gf = item.querySelector(".gf").textContent.trim()
            const ga = item.querySelector(".ga").textContent.trim()
            const diff = item.querySelector(".diff").textContent.trim()


            //inserting the data into the object
            data['Team'] = team
            data['Year'] = Number(year)
            data['wins'] = Number(wins)
            data['losses'] = Number(losses)
            data['ot_losses'] = Number(ot_losses)
            data['pct_text_success'] =Number(pct_text_success)
            data['gf'] = Number(gf)
            data['ga'] = Number(ga)
            data['diff'] = Number(diff)

            return data
        })
    })
    
    //writing the parsed results into a json file
    try {
        await fs.writeFile("results.json",JSON.stringify(results,null,2))
        console.log('success writing into file')
    } catch (error) {
        console.log(error)
        
    }
    await page.screenshot({path:'page.png'})

    await browser.close()
}

hockeyTeams()