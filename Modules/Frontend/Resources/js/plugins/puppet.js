const puppeteer = require('puppeteer');

(async () => {
  	const browser = await puppeteer.launch();
  	const page = await browser.newPage();
  	await page.goto('https://www.instagram.com/explore/tags/weddinghair/');

  	const sharedData = await page.evaluate(() => _sharedData);
  	let edges = sharedData.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges;
  	let images = [];
  	edges.forEach((edge) => {
  		images.push(edge.node.display_url);
  	});

  	await browser.close();

  	return images;
})();
