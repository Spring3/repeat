import parser from "papaparse"
import uniqBy from "lodash.uniqby"

const DelimiterRegexp = {
  SEMICOLON: /^(\w+(\s)?)+;/,
  COMMA: /^(\w+(\s)?)+,/,
  VERTICAL_LINE: /^(\w+(\s)?)+\|/,
}

const parseFiles = async acceptedFiles => {
  const fileContents = await Promise.all(
    acceptedFiles.map(
      file =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()

          reader.onabort = () => reject(new Error("Reading a file was aborted"))
          reader.onerror = () =>
            reject(new Error("Reading a file has failed with an error"))
          reader.onload = () => {
            parser.parse(reader.result, {
              header: true,
              complete: result => {
                resolve(result.data)
              },
              error: error => reject(error),
              delimiter: value => {
                if (DelimiterRegexp.SEMICOLON.test(value)) {
                  return ";"
                } else if (DelimiterRegexp.COMMA.test(value)) {
                  return ","
                } else if (DelimiterRegexp.VERTICAL_LINE.test(value)) {
                  return "|"
                }

                throw new Error(
                  'Unsupported delimiter. Please use either one of ";" "," "|"'
                )
              },
            })
          }

          reader.readAsText(file, "utf8")
        })
    )
  )

  const nonEmptyEntries = fileContents.reduce(
    (acc, contents) =>
      acc.concat(
        contents.reduce((acc, { word, meaning }) => {
          if (!word || !meaning) {
            return acc
          }
          return [...acc, { word: word.trim().toLowerCase(), meaning }]
        }, [])
      ),
    []
  )
  return uniqBy(nonEmptyEntries, entry => entry.word)
}

export { parseFiles }
