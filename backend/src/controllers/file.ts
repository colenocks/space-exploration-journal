import fs from 'fs';
import path from 'path';

export const saveJournal = async (journalEntries: any) => {
  const filePath = path.join(__dirname, 'space_journal.json');

  // const journalJSON = await retrieveJournal()
  // console.log(journalJSON);
  // if(journalJSON){
  //   journalJSON.push(journalEntries)
  // }

  // Convert journal entries to JSON
  const data = JSON.stringify(journalEntries, null, 2);
  // Write to file
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error('Error saving journal:', err);
    } else {
      console.log('Journal saved successfully!');
    }
  });
};

export const retrieveJournal = async () => {
  const filePath = path.join(__dirname, 'space_journal.json');

  const journalBuffer = fs.readFileSync(filePath);
  const jounalJSON = JSON.parse(journalBuffer.toString());

  return jounalJSON
};
