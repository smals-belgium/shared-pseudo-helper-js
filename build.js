import {copyFile} from 'fs';
import {exec} from 'child_process';

console.log('Running rollup build');
exec('rollup -c', (error, stderr, stdout) => {
  if (error) {
    console.error(`Build error executing rollup: ${error}`);
    return;
  }

  if (stderr) {
    console.error(`Build error output: ${stderr}`);
    return;
  }

  console.log(stdout);
  console.log(`Built successfully`);

  copyFile('./package.json', './dist/package.json', err => {
    if (err) {
      console.error('Error copying package.json:', err);
      return;
    }
    console.log('Copied package.json successfully!');
  });

  copyFile('./README-source.adoc', './dist/README.adoc', err => {
    if (err) {
      console.error('Error copying README-source.adoc:', err);
      return;
    }
    console.log('Copied README-source.adoc successfully!');
  });

  copyFile('./README.md', './dist/README.md', err => {
    if (err) {
      console.error('Error copying README.md:', err);
      return;
    }
    console.log('Copied README.md successfully!');
  });

  copyFile('./LICENSE', './dist/LICENSE', err => {
    if (err) {
      console.error('Error copying LICENSE:', err);
      return;
    }
    console.log('Copied LICENSE successfully!');
  });
});
