The *git-log-reader* is a simple module for reading and parsing a git log.
Each commit is parsed into an object with git fields becoming properties.
Pattern matchers may be run against any field. Capture groups from the matcher's
regular expression can be added as additional custom fields.

### Using git-log-reader

```js
var gitlog = require('git-log-reader');

// commits is an array of commit objects
var commits = gitlog.read({
  // options
});
```

### Options

#### fields
An optional array of git fields to add to commit objects.

Default value: `['abbrevHash', 'subject']`

Valid fields:
* hash
* abbrevHash
* treeHash
* abbrevTreeHash
* parentHashes
* abbrevParentHashes
* authorName
* authorEmail
* authorDate
* committerName
* committerEmail
* committerDate
* refNames
* encoding
* subject
* sanitizedSubject
* body
* commitNotes

#### repo
The optional directory that contains the git repository.

#### matchers
An optional array of objects that define regular expressions that can be run against
any of the git fields to add additional custom fields. The new fields can also
overwrite the original git field.

Matchers are run in order until a match is found. If no matches are found the
commit gets filtered out.

> If you specify a pattern make sure you escape backslash characters.

```js
[{
  // Run this pattern on the default git field "subject".
  // Match an issue number like #123 and add field { issue: 123 }
  pattern: "#(\\d+)",
  fields: ['issue']
}, {
  // Use the Angular commit format in the subject field.
  regexp: /^(\w*)(?:\(([\w\$\.]*)\))?\: (.*)$/,
  fields: ['type', 'scope', 'subject', 'body']
}, {
  // Filter on author name.
  sourceField: 'authorName',
  regexp: /Ryan/
}]
```
