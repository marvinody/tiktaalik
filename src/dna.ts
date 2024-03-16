export type BasePair = 'A' | 'T' | 'C' | 'G';

export type DNA = BasePair[];

// define codon as 3 length string, not array 
export type Codon = `${BasePair}${BasePair}${BasePair}`;

export const DNAToCodon = (dna: DNA): Codon[] => {
  const codons: Codon[] = [];
  for (let i = 0; i < dna.length; i += 3) {
    codons.push(dna.slice(i, i + 3).join('') as Codon);
  }
  return codons;
}

export type IntepreterKey = 'PDP8' | 'BRAINFUCK'

export interface IInterpretableLife<E> {
  aminoAcids: E[];
  interpreter: IntepreterKey
  
  codonToAminoAcids(codons: Codon[]): E[] 
  run(timeout: number): number

}