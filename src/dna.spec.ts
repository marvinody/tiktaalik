import { DNAToCodon, DNA, BasePairToBinary } from './dna.js'

describe('DNA', function () {
  describe('DNA', function () {
    it('should convert DNA to Codon for divisible-by-three', function () {
      const dna = ['A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C', 'G'] as DNA
      const codons = DNAToCodon(dna)
      expect(codons).toEqual(['ATC', 'GAT', 'CGA', 'TCG'])
    })

    it('should convert DNA to Codon for non-divisble-by-three with padding of last char', () => {
      const dna = 'ATCAT'.split('') as DNA;
      const codons = DNAToCodon(dna);
      expect(codons).toEqual(['ATC','ATT'])
    })

    it('should convert DNA to Codon for non-divisble-by-three with padding of last char', () => {
      const dna = 'ATCA'.split('') as DNA;
      const codons = DNAToCodon(dna);
      expect(codons).toEqual(['ATC','AAA'])
    })
  })

  describe(BasePairToBinary, function () {
    it('A => 00', function () {
      const base = 'A'
      const binary = BasePairToBinary(base)
      expect(binary).toEqual('00')
    })
    it('T => 11', function () {
      const base = 'T'
      const binary = BasePairToBinary(base)
      expect(binary).toEqual('11')
    })
    it('C => 01', function () {
      const base = 'C'
      const binary = BasePairToBinary(base)
      expect(binary).toEqual('01')
    })
    it('G => 10', function () {
      const base = 'G'
      const binary = BasePairToBinary(base)
      expect(binary).toEqual('10')
    })
  })
})
