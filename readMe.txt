
====================Plesase install given node packge managers=================
1. npm i serialport  
2. npm i @serialport/parser-readline
3. npm i @serialport/parser-delimiter


// Require the serialport node module
/*const serials = require('serialport');
const SerialPort = serials.SerialPort;
const Readline = require('@serialport/parser-readline');
const ReadlineParser = Readline.ReadlineParser;
// Open the port
const port = new SerialPort(
    {
      path: 'COM4',
      baudRate: 9600
    }
);
const parser = port.pipe(new ReadlineParser({delimiter: '\r\n'}));
port.on('open',function(err){
console.log('open!');
  parser.on('data',function(data){
    console.log(data);
  })
});*/
