import { Codon } from './dna.js'
import { OpToCodonLength, codonPairTo7Bit, codonToIZ} from './pdp8.js'

describe('PDP8', function () {
  describe(codonToIZ, function () {
    it('A => I: false, Z: false', function () {
      const codon = 'AAA'
      const iz = codonToIZ(codon)
      expect(iz).toEqual({ I: false, Z: false })
    })
    it('C => I: true, Z: true', function () {
      const codon = 'AAC'
      const iz = codonToIZ(codon)
      expect(iz).toEqual({ I: true, Z: true })
    })
    it('G => I: true, Z: false', function () {
      const codon = 'AAG'
      const iz = codonToIZ(codon)
      expect(iz).toEqual({ I: true, Z: false })
    })
    it('T => I: false, Z: true', function () {
      const codon = 'AAT'
      const iz = codonToIZ(codon)
      expect(iz).toEqual({ I: false, Z: true })
    })
  })

  describe(OpToCodonLength, function () {
    it('AND => 3', function () {
      const op = 'AND'
      const length = OpToCodonLength(op)
      expect(length).toEqual(3)
    })
    it('TAD => 3', function () {
      const op = 'TAD'
      const length = OpToCodonLength(op)
      expect(length).toEqual(3)
    })
    it('ISZ => 3', function () {
      const op = 'ISZ'
      const length = OpToCodonLength(op)
      expect(length).toEqual(3)
    })
    it('DCA => 3', function () {
      const op = 'DCA'
      const length = OpToCodonLength(op)
      expect(length).toEqual(3)
    })
    it('JMS => 3', function () {
      const op = 'JMS'
      const length = OpToCodonLength(op)
      expect(length).toEqual(3)
    })
    it('JMP => 3', function () {
      const op = 'JMP'
      const length = OpToCodonLength(op)
      expect(length).toEqual(3)
    })
    it('OPR => 3', function () {
      const op = 'OPR'
      const length = OpToCodonLength(op)
      expect(length).toEqual(3)
    })
  })

  describe(codonPairTo7Bit, function () {
    it('should convert codonPair to 7 bit number', function () {
      const codon1 = 'AAA'
      const codon2 = 'AAA'
      const num = codonPairTo7Bit(codon1, codon2)
      expect(num).toEqual(0)
    });

    it('should drop the last 2 bases', function () {
      const codon1 = 'AAA'
      const codon2 = 'ATT'
      const num = codonPairTo7Bit(codon1, codon2)
      expect(num).toEqual(0)
    })

    test.each([
      ['AAA', 'ATT', 0],
      ['AAT', 'TGG', 7],
      ['ACT', 'TGG', 15],
      ['TTT', 'TGC', 0b1111111],

    ])('should convert codonPair to 7 bit number', (codon1, codon2, expected) => {
      const num = codonPairTo7Bit(codon1 as Codon, codon2 as Codon)
      expect(num).toEqual(expected)
    })

  })
})
