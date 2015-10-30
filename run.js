var gitlog = require('./index');
var commits = gitlog.read({
  fields: ['abbrevHash', 'subject', 'body']
});
console.log(commits);
