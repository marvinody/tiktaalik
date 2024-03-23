export type BasePair = 'A' | 'T' | 'C' | 'G'

export type DNA = BasePair[]

export type Codon = `${BasePair}${BasePair}${BasePair}`

export const DNAToCodon = (dna: DNA): Codon[] => {
  const codons: Codon[] = []
  for (let i = 0; i < dna.length; i += 3) {
    const triplet = dna.slice(i, i + 3)
    if (triplet.length < 3) {
      const last = triplet[triplet.length - 1]

      triplet.push(last.toString().repeat(3 - triplet.length) as BasePair)
    }

    codons.push(triplet.join('') as Codon)
  }
  return codons
}

export type IntepreterKey = 'PDP8' | 'BRAINFUCK'

export interface IInterpretableLife<E> {
  aminoAcids: E[]
  interpreter: IntepreterKey

  codonToAminoAcids(codons: Codon[]): E[]
  run(timeout: number): number
}
