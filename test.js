const service = require('./serialService');

service.deviceScanPort(); // scan port of device UM200 moduel

service.devicePortBind(); // port  bind baudrate,start,end bits, port location " one time declartion this frame"
service.cmdDeviceRegistryContinuesTagID(); // device request registry "one time declartion this frame"
service.devicePortOpenReadSerialData(); // tag data read and set interface variable "request response function"