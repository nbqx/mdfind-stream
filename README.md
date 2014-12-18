## mdfind-stream

osx `mdfind` stream interface

## Usage

```js
var mdfind = require('mdfind-stream');

var opt = {
  onlyin: '~/Desktop',
  live: false
};

mdfind('image',opt).on('data',function(data){
  console.log(data);
});

// or
mdfind('image',opt).pipe(process.stdout);

// if `name` option set, first argument is ignored.
mdfind('aaa',{onlyin: __dirname+'/test/fixtures', name: 'aaa', count: true}).pipe(process.stdout); // => "1/n"

```
