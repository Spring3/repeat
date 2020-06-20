const formatWordClass = wordClass => {
  switch (wordClass.trim()) {
    case "noun":
    case "n":
      return "noun"
    case "verb":
    case "v":
      return "verb"
    case "adjective":
    case "adj":
      return "adjective"
    case "adverb":
    case "adv":
      return "adverb"
    default:
      return wordClass.trim()
  }
}

const formatMeaning = meaning => {
  if (!meaning) return []

  return meaning
    .trim()
    .split(";")
    .map(meaningOption => {
      const wordClassesRegexp = /\[(noun|n|verb|v|adjective|adj|adverb|adv)\]\s{0,}(:|-)?/i

      const match = meaningOption.match(wordClassesRegexp)
      if (match) {
        return {
          [formatWordClass(match[1])]: meaningOption
            .substring(match.index + match[0].length)
            .trim(),
        }
      }
      return meaningOption.trim()
    })
}

export { formatMeaning }
