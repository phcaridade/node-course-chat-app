var expect = require('expect');

var {generateMessage} = require('./message');

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