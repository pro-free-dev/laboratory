function testValueOf_and_getTime(times) {
  function loop(type) {
    var date = new Date();
    for (var i = 0; i < times; i++) {
      type === 'valueOf' ? date.valueOf() : date.getTime()
    }
  }

  // valueOf
  var valueOf_start = new Date();
  loop('valueOf');
  var valueOf_cost = new Date().valueOf() - valueOf_start.valueOf();


  // getTime
  var getTime_start = new Date();
  loop('getTime');
  var getTime_cost = new Date().valueOf() - getTime_start.valueOf();

  console.group('valueOf vs getTime, times: ' + times);
  console.log('valueOf cost: ', valueOf_cost);
  console.log('getTime cost: ', getTime_cost)
  console.groupEnd();
}

testValueOf_and_getTime(5000);
testValueOf_and_getTime(500000);
testValueOf_and_getTime(15000000);


// valueOf vs getTime, times: 5000
//   valueOf cost:  1
//   getTime cost:  0

// valueOf vs getTime, times: 500000
//   valueOf cost:  4
//   getTime cost:  2

// valueOf vs getTime, times: 15000000
//   valueOf cost:  60
//   getTime cost:  3