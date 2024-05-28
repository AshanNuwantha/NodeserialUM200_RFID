
const os = require('os');
const  readports = require('serialport');
const Readline = require('@serialport/parser-readline');
const { DelimiterParser } = require('@serialport/parser-delimiter')
let bindSerialPort = NaN;
let parser = NaN;
let readBuffer = NaN;
let uniquecmd = Buffer.from([0xA5, 0x5A, 0x00, 0x0A, 0x82, 0x00, 0x64, 0xEC, 0x0D, 0x0A]);
let closecmd = Buffer.from([0xA5, 0x5A, 0x00, 0x0A, 0x8C, 0x00, 0x64, 0xE2, 0x0D, 0x0A]);
                //[Frmae Header(2),Frame Length(2), Frame Type(1), Data(N), Check Code(1), Frame End(2) ]

const deviceinfo = require('./deviceInfo.json');
const fs = require('fs');


function writeDeviceInfo( portCom ){
    fs.readFile('./deviceInfo.json', (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        
        const parsedData = JSON.parse(data);
        // updating port number
        parsedData.Port = portCom;
        fs.writeFile('./deviceInfo.json', JSON.stringify(parsedData, null, 2), (err) => {
            if (err) console.log("Error writing file:", err);
        });
    })
}

function cmdDeviceRegistryContinuesTagID(){
    bindSerialPort.on('open',function(err){ 
        console.log('open port', err);
        bindSerialPort.write(uniquecmd, function(err){
            if (err) {
            return console.log('Error on write: ', err.message);
            }
        });
    });
}

function cmdDeviceResitry(cmd){
    bindSerialPort.write(Buffer.from(cmd), function(err){
        if (err) {
          return console.log('Error on write: ', err.message);
        }
        console.log('write resitry request..');
    });
}

function deviceScanPort(){
    readports.SerialPort.list().then(function(ports){
        ports.forEach(function(port){
            if((deviceinfo.serialNumber.toString())===(port.serialNumber.toString())){
                if (os.type() == 'Windows_NT'){
                    writeDeviceInfo(port.path.toString());
                }else{
                    //console.log('linux...') future update
                }            
            }
        })
    });
}
function devicePortBind(){
    bindSerialPort = new readports.SerialPort(
        {
          path: deviceinfo.Port,
          baudRate: deviceinfo.baudRate
        }
    );
    parser = bindSerialPort.pipe(new DelimiterParser({ delimiter: '\n' }));
}

function devicePortOpenReadSerialData(){
    bindSerialPort.on('open',function(err){ // conti check code b 0xe6
        console.log('open!');
        parser.on('data',function(data){
            if(data.length > 2 ){
                readBuffer = Buffer.from(data).toString('hex',7,19);

                console.log("Tag :",readBuffer); //add interface display area code ex:-  document.getElementById("App").innerHTML = data;

                bindSerialPort.close(function (err) {
                    console.log('port closed');
                }); 
            }     
        });
    });
}
module.exports = {deviceScanPort , devicePortBind , cmdDeviceRegistryContinuesTagID , devicePortOpenReadSerialData};
