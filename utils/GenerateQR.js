const QRCode = require('qrcode');

const generateQR = async text => {
  try {
    return await QRCode.toDataURL(text,{ errorCorrectionLevel: 'L' });
  } catch (err) {
    return console.error(err);
  }
};

module.exports = generateQR;