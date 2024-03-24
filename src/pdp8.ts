import { BasePair, BasePairToBinary, Codon, CodonToBasePair } from './dna.js'

type BaseOps = 'AND' | 'TAD' | 'ISZ' | 'DCA' | 'JMS' | 'JMP' | 'OPR'
type IZ = {
  I: boolean,
  Z: boolean,
}

export const OpToCodonLength = (op: BaseOps): number => {
  switch (op) {
    case 'AND':
    case 'TAD':
    case 'ISZ':
    case 'DCA':
    case 'JMS':
    case 'JMP':
    case 'OPR':
      return 3
    default:
      throw new Error('Unsupported operation')
  }
}

export const codonToIZ = (codon: Codon): IZ => {
  const lastBase = (codon[2] as BasePair);

  const I = lastBase === 'C' || lastBase === 'G';
  const Z = lastBase === 'C' || lastBase === 'T';

  return {
    I,
    Z,
  }
}

export const codonPairTo7Bit = (codon1: Codon, codon2: Codon): number => {
  const basePairs = [...CodonToBasePair(codon1), ...CodonToBasePair(codon2)];
  // each base pair is 2 bits
  // so let's drop 2 bases from the end
  basePairs.pop();
  basePairs.pop();

  // now we have 8 bits
  // convert to number
  const binaryString = basePairs.map(BasePairToBinary).join('');

  const num8 = parseInt(binaryString, 2);
  // let's just right shift 1 bit to drop LSB and make it 7 bits
  return num8 >> 1;
}

export const codonToBaseOp = (codon: Codon): BaseOps => {
  switch (codon) {
    case 'AAA':
    case 'AAC':
    case 'AAG':
    case 'AAT':
      return 'AND'
    case 'ATA':
    case 'ATC':
    case 'ATG':
    case 'ATT':
      return 'TAD'
    case 'ACA':
    case 'ACC':
    case 'ACG':
    case 'ACT':
      return 'ISZ'
    case 'AGA':
    case 'AGC':
    case 'AGG':
    case 'AGT':
      return 'DCA'
    case 'TAA':
    case 'TAC':
    case 'TAG':
    case 'TAT':
    case 'TTA':
    case 'TTC':
    case 'TTG':
    case 'TTT':
      return 'JMS'
    case 'TCA':
    case 'TCC':
    case 'TCG':
    case 'TCT':
    case 'TGA':
    case 'TGC':
    case 'TGG':
    case 'TGT':
      return 'JMP'
  
    default:
      throw new Error('Unsupported codon')
  }
}

export const codonToPdp8Text = (codons: Codon[]): string => {
  let i = 0
  while (i < codons.length) {
    i++
  }

  return '';
}
