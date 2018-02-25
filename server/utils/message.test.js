var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', ()=>{
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);
        expect(message).toInclude({from: from});
        expect(message).toInclude({text: text});
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', ()=>{
        var from = 'Deb';
        var latitude = 41;
        var longitude = -8;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message).toInclude({from: from});
        expect(message).toInclude({url: url});
        expect(message.createdAt).toBeA('number');
    });
});