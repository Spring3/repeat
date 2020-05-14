import parser from 'papaparse';

const parseFiles = (acceptedFiles) => {
  return new Promise((resolve, reject) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onabort = () => reject(new Error('Reading a file was aborted'));
    reader.onerror = () => reject(new Error('Reading a file has failed with an error'));
    reader.onload = () => {
      parser.parse(reader.result, {
        header: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: error => reject(error)
      });
    }

    reader.readAsText(file);
  });
};

export {
  parseFiles
};
