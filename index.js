const axios = require("axios")
const collectAnswers = require("./collectAnswers")

const questions = ["Please enter a limit: ", "Please enter an offset: "]
collectAnswers(questions, (answers) => {
  const limit = answers[0]
  const offset = answers[1]

  axios
    .get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
    .then((res) => {
      let totalHeight = 0
      let totalWeight = 0
      let totalPoke = 0
      const pokeArray = res.data.results

      pokeArray.map(async (poke) => {
        await axios.get(`${poke.url}`).then((singlePoke) => {
          const name = singlePoke.data.name
          const weight = singlePoke.data.weight
          const height = singlePoke.data.height
          totalHeight += height
          totalWeight += weight
          totalPoke++
          console.log(name, weight, height)
        })

        if (totalPoke === pokeArray.length) {
          const averageHeight = totalHeight / totalPoke
          const averageWeight = totalWeight / totalPoke
          console.log(
            `totalHeight: ${totalHeight}, totalWeight: ${totalWeight}\ntotalPoke: ${totalPoke}\naverageHeight: ${averageHeight}\naverageWeight: ${averageWeight}`
          )
        }
      })
    })
})
