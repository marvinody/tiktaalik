/**
 * This is a sample test suite.
 * Replace this with your implementation.
 */

import { DNAToCodon, DNA } from './dna.js'

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
})
