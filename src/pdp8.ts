import { BasePair, BasePairToBinary, Codon, CodonToBasePair } from './dna.js'

type BaseOps = 'AND' | 'TAD' | 'ISZ' | 'DCA' | 'JMS' | 'JMP' | 'OPR'
type IZ = {
  I: boolean
  Z: boolean
}

type Group1Ops = 'CLA' | 'CLL' | 'CMA' | 'CML' | 'IAC' | 'RAR' | 'RAL' | 'RTR' | 'RTL';
type Group2OrOps = 'CLA' | 'SMA' | 'SZA' | 'SNL' | 'SKP' | 'OSR' | 'HLT';
type Group2AndOps = 'CLA' | 'SKP' | 'SPA' | 'SNA' | 'SZL';
type AllOPR = Group1Ops | Group2OrOps | Group2AndOps;
type OPR = {
  group1: Group1Ops[]
  group2Or: Group2OrOps[]
  group2And: Group2AndOps[]
}

type OPREntry = {
  name: AllOPR
  code: number
  dnaOneHot: number
}

// one
const OPRTable: {
  [key in AllOPR]: OPREntry
} = {
  'CLA': { name: 'CLA', code: 0o7000 },
  'CLL': { name: 'CLL', code: 0o7100 },
  'CMA': { name: 'CMA', code: 0o7200 },
  'CML': { name: 'CML', code: 0o7300 },
  'IAC': { name: 'IAC', code: 0o7400 },
  'RAR': { name: 'RAR', code: 0o7500 },
  'RAL': { name: 'RAL', code: 0o7600 },
  'RTR': { name: 'RTR', code: 0o7700 },
  'RTL': { name: 'RTL', code: 0o7600 },
  'SKP': { name: 'SKP', code: 0o7500 },
  'SMA': { name: 'SMA', code: 0o7400 },
  'SZA': { name: 'SZA', code: 0o7300 },
  'SNL': { name: 'SNL', code: 0o7200 },
  'OSR': { name: 'OSR', code: 0o7100 },
  'HLT': { name: 'HLT', code: 0o7000 },
  'SPA': { name: 'SPA', code: 0o7400 },
  'SNA': { name: 'SNA', code: 0o7300 },
  'SZL': { name: 'SZL', code: 0o7200 },

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

export const codonTripletToOPR = (codons: Codon[]): OPR => {
  const [codon1, codon2, codon3] = codons
  // use last base of codon1 to determine group

  // 

  const group1 = [];
  const group2Or = [];
  const group2And = [];


  return {
    group1: [],
    group2Or: [],
    group2And: [],
  }
}
export const codonToIZ = (codon: Codon): IZ => {
  const lastBase = codon[2] as BasePair

  const I = lastBase === 'C' || lastBase === 'G'
  const Z = lastBase === 'C' || lastBase === 'T'

  return {
    I,
    Z,
  }
}

export const codonPairTo7Bit = (codon1: Codon, codon2: Codon): number => {
  const basePairs = [...CodonToBasePair(codon1), ...CodonToBasePair(codon2)]
  // each base pair is 2 bits
  // so let's drop 2 bases from the end
  basePairs.pop()
  basePairs.pop()

  // now we have 8 bits
  // convert to number
  const binaryString = basePairs.map(BasePairToBinary).join('')

  const num8 = parseInt(binaryString, 2)
  // let's just right shift 1 bit to drop LSB and make it 7 bits
  return num8 >> 1
}

export const codonToBaseOp = (codon: Codon): BaseOps => {
  // these are probably gonna change a lot as we figure out the mapping
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

export const codonsToPdp8Text = (codons: Codon[]): string => {
  const lines = [];
  let i = 0
  while (i < codons.length) {
    const codon = codons[i]
    const op = codonToBaseOp(codon)
    const iz = codonToIZ(codon)
    const sevenBit = codonPairTo7Bit(codons[i + 1], codons[i + 2]);
    lines.push(`${op} ${iz.I ? 'I' : ' '} ${iz.Z ? 'Z' : ' '} ${sevenBit.toString(10)}`)
    i += OpToCodonLength(op)
  }

  return lines.join('\n')
}
