var spawn = require('child_process').spawn,
    resolve = require('path').resolve,
    Readable = require('stream').Readable;
var ehd = require('expand-home-dir');

/*

$ mdfind

Usage: mdfind [-live] [-count] [-onlyin directory] [-name fileName | -s smartFolderName | query]
list the files matching the query
query can be an expression or a sequence of words

-attr <attr>      Fetches the value of the specified attribute
-count            Query only reports matching items count
-onlyin <dir>     Search only within given directory
-live             Query should stay active
-name <name>      Search on file name only
-reprint          Reprint results on live update
-s <name>         Show contents of smart folder <name>
-0                Use NUL (``\0'') as a path separator, for use with xargs -0.

example:  mdfind image
example:  mdfind -onlyin ~ image
example:  mdfind -name stdlib.h
example:  mdfind "kMDItemAuthor == '*MyFavoriteAuthor*'"
example:  mdfind -live MyFavoriteAuthor

*/

var cmd = "mdfind";

function pathResolver(p){
  return resolve(ehd(p));
};

function parseOpts(o){
  var ret = [];
  for(var k in o){
    var v = o[k];
    if(k==='onlyin') v = pathResolver(v);
    if(k==='count' || k==='live' || k==='reprint'){
      if(v) ret.push(['-'+k,'']);
    }else{
      ret.push(['-'+k,v]);
    }
  }
  return Array.prototype.concat.apply([],ret);
};

module.exports = function(q,opts){
  var args = parseOpts(opts).concat(['"'+q+'"']);
  var mdfind = spawn(cmd,args);
  var stream = new Readable({objectMode:true});
  stream._read = function(){};
  
  mdfind.stdout.on('data',function(data){
    stream.push(data+'');
  });

  mdfind.stderr.on('data',function(data){
    var err = new Error(data+'');
    stream.emit('error',err);
  });

  mdfind.on('close',function(code){
    stream.push(null);
  });

  return stream
};

