import { chromium } from "playwright"

async function start() {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  const base_url = "https://iftm.edu.br/editais/"

  try {

    await page.goto(base_url)
    const links = await page.$$("a.if-br-card.br-card")

    const categories = []
    for (let i = 0, t = links.length; i < t; i++) {
      const link = links[i]

      const href = await link.getAttribute("href")
      const title = await link
        .$(".card-header.mb-2 span.h5.text-primary-default")
        .then(el => el.innerText())
      const description = await link
        .$(".card-footer span.text-medium.text-secondary-07")
        .then(el => el.innerText())

      const category = {
        title,
        description,
        link: href,
      }

      categories.push(category)
    }

    for (let i = 0, t = categories.length; i < t; i++) {
      const category = categories[i]

      const path = category.link.replace("./", "")

      if (path === "") {
        continue
      }

      // .replace(/\/$/, '')
      await page.goto(`${base_url}/${path}`)

      // await page.waitForSelector("#_resultado_consulta")

      const rows = await page.$$(".row.bg-gray-2.my-6.p-4")

      const editais = []
      for (let j = 0, t2 = rows.length; j < t2; j++) {
        const row = rows[j]

        const titleEl = await row.$(
          "h2.text-up-03.text-semi-bold.text-blue-warm-vivid-80.m-0.mb-3.p-0",
        )
        const title = await titleEl.innerText()
        // const link = await row.$("a").then((el) => el.getAttribute("href"));
        // const description = await row
        //   .$("p.text-up-01")
        //   .then((el) => el?.innerText());
        // const status = await row
        //   .$(".br-tag.text-nowrap.text-down-01.small")
        //   .then((el) => el?.innerText());
        // const local = await row
        //   .$("div.col-sm-12.col-md-4.col-lg-3.d-md-flex.text-left > div > div")
        //   .then((el) => el?.innerText());
        // const type = await row
        //   .$("div.col-sm-12.col-md-8.col-lg-9.text-left > div")
        //   .then((el) => el?.innerText());

        const edital = {
          title,
          // status,
          // description,
          // local,
          // type,
          // link,
        }

        editais.push(edital)
      }

      categories[i].editais = editais
    }

    console.log(categories)
  } catch (err) {
    console.error("Error while scraping:", err)
  } finally {
    await browser.close()
  }
}

start()
