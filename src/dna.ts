export type BasePair = 'A' | 'T' | 'C' | 'G'

export type DNA = BasePair[]

export type Codon = `${BasePair}${BasePair}${BasePair}`

const BasePairToBinaryMapping: { [key in BasePair]: number } = {
  'A': 0b00,
  'C': 0b01,
  'G': 0b10,
  'T': 0b11,
}

// autogenerate the reverse mapping in case we want to swap later
const ReverseBasePairToBinaryMapping: { [key: number]: BasePair } = Object.entries(BasePairToBinaryMapping).reduce((acc, [key, value]) => {
  acc[value] = key as BasePair
  return acc
}, {} as { [key: number]: BasePair })

export const BinaryToBasePair = (binary: number, basePairLength: number): BasePair[] => {
  const basePairs: BasePair[] = []
  for (let i = 0; i < basePairLength; i++) {
    const base = (binary >> (i * 2)) & 0b11
    basePairs.push(ReverseBasePairToBinaryMapping[base])
  }
  return basePairs.reverse()
}

export const BasePairToBinary = (base: BasePair): string => {
  return BasePairToBinaryMapping[base].toString(2).padStart(2, '0')
}

export const CodonsToBinary = (codons: Codon[]): string => {
  return codons.map((codon) => {
    return codon.split('').map((base: string) => BasePairToBinary(base as BasePair)).join('')
  }).join('')
}

export const CodonToBasePair = (codon: Codon): BasePair[] => {
  return codon.split('') as BasePair[]
}

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
