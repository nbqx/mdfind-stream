var test = require('tape'),
    colorize = require('tap-colorize'),
    isStream = require('isstream');

var mdfind = require(__dirname+'/../');

test.createStream().pipe(colorize()).pipe(process.stdout);

test('is stream',function(t){
  var s = mdfind('test',{});
  t.ok(isStream(s),'this is stream');
  t.end();
});

test('case 1',function(t){
  t.plan(1);
  mdfind('aaa',{onlyin: __dirname+'/fixtures', count: true}).on('data',function(data){
    t.equal(data.trim(),"2");
    t.end();
  });
});

test('case 2',function(t){
  t.plan(1);
  mdfind('',{onlyin: __dirname+'/fixtures', name: 'aaa', count: true}).on('data',function(data){
    t.equal(data.trim(),"1");
    t.end();
  });
});

