# multi-page-node-crawler
This is a multiple page node crawler which browses a database of NHL team stats since 1990. 
The webscraper browses through this data and selects data based on a query. The crawler conducts searches based on the team's name and the results are saved in JSON format.
The node crawler uses puppeteer library to make requests to the page and parse the search results.
The Fs module is also used to write the results into  a json file. The crawler also takes a screenshot of the search page using puppeteer.
