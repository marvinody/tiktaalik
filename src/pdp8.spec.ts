import { Codon } from './dna.js'
// import { codonsToPdp8Text } from './pdp8.js'
import {codonsToPdp8Text} from './pdp8.js'

describe('PDP8', function () {
  describe(codonsToPdp8Text, function () {
    test.each([{
      codon: ['AAA', 'AAA'],
      expected: 'AND     0',
      op: 'AND',
    }, {
      codon: ['ATT', 'TTT'],
      expected: 'TAD I Z 127',
      op: 'TAD',
    }, {
      codon: ['CAT', 'GCT'],
      expected: 'ISZ   Z 103',
      op: 'ISZ',
    }, {
      codon: ['CTA', 'GGT'],
      expected: 'DCA I   43',
      op: 'DCA',
    }, {
      codon: ['GCA', 'GGT'],
      expected: 'JMS I   43',
      op: 'JMS',
    }, {
      codon: ['GTA', 'GGT'],
      expected: 'JMP I   43',
      op: 'JMP',
    }, {
      codon: ['TGT', 'TTT'],
      expected: 'OPR 1 11111111',
      op: 'OPR',
    }])('should convert codon ($op) to PDP8 text', ({ codon, expected }) => {
      const text = codonsToPdp8Text(codon as Codon[])
      expect(text).toEqual(expected)
    })

    describe('extended OPR tests', function () {
      
      test.each([{
        codon: ['TGT', 'TTT'],
        expected: 'OPR 1 11111111',
        op: 'OPR',
      }, {
        codon: ['TTT', 'TTT'],
        expected: 'OPR 2 11111111',
        op: 'OPR',
      }])('should convert codon ($op) to PDP8 text', ({ codon, expected }) => {
        const text = codonsToPdp8Text(codon as Codon[])
        expect(text).toEqual(expected)
      });
    });
  });
})
