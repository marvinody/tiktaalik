import { Codon, CodonsToBinary } from './dna.js'

type OffsetOps =  'AND' | 'TAD' | 'ISZ' | 'DCA' | 'JMS' | 'JMP'
type SpecialOps = 'OPR'
type BaseOps = OffsetOps | SpecialOps

type IZ = {
  I: boolean
  Z: boolean
}

interface Instruction {
  op: BaseOps
}

interface OffsetInstruction extends Instruction {
  offset: number
  IZ: IZ
  op: OffsetOps
}

interface OPRInstruction extends Instruction {
  opr: number
  op: 'OPR'
  group: '1' | '2'
}

type FullInstruction = OffsetInstruction | OPRInstruction

export const codonsToBinaryLines = (codons: Codon[]): number[] => {
  const lines = [];

  for(let i = 0; i < codons.length; i += 2) {
  
    const codonslice = codons.slice(i, i + 2);
    // pad with AAA if needed
    if(codonslice.length < 2) {
      codonslice.push('AAA');
    }
    const binary = CodonsToBinary(codonslice)
    lines.push(parseInt(binary, 2))
  }

  return lines
}

export const binaryLinesToPdp8Text = (lines: number[]): string => {
  return lines.map((line) => {
    return line.toString(8)
  }).join('\n')

}

// binary lines to Instructions
export const binaryLinesToInstructions = (lines: number[]): FullInstruction[] => {
  const instructions: FullInstruction[] = []
  for (const line of lines) {
    const op = line >> 9
    const offset = line & (2**7-1)
    const I = (line & 0b100000000) === 0b100000000
    const Z = (line & 0b10000000) === 0b10000000
    const opr = line & (2**8-1)
    const group = (line >> 8 & 0b0001) === 0 ? '1' : '2'

    let opStr: BaseOps = 'AND';
    switch(op) {
      case 0:
        opStr = 'AND'
        break
      case 1:
        opStr = 'TAD'
        break
      case 2:
        opStr = 'ISZ'
        break
      case 3:
        opStr = 'DCA'
        break
      case 4:
        opStr = 'JMS'
        break
      case 5:
        opStr = 'JMP'
        break
      case 7:
        opStr = 'OPR'
        break
    }

    if(opStr === 'OPR') {
      instructions.push({
        op: opStr,
        opr,
        group,
      })
    } else {
      instructions.push({
        op: opStr,
        offset,
        IZ: {
          I,
          Z
        }
      })
    }
  }
  return instructions
}

const instructionsToPdp8Text = (instructions: FullInstruction[]): string => {
  return instructions.map((instruction): string => {
    switch(instruction.op) {
      case 'OPR':
        return `${instruction.op} ${instruction.group} ${instruction.opr.toString(2)}`
      default:
        return `${instruction.op} ${instruction.IZ.I ? 'I' : ' '} ${instruction.IZ.Z ? 'Z' : ' '} ${instruction.offset}`
    }
  }).join('\n')
}


export const codonsToPdp8Text = (codons: Codon[]): string => {
  const lines = codonsToBinaryLines(codons);
  const instructions = binaryLinesToInstructions(lines);
  const text = instructionsToPdp8Text(instructions);
  return text;
}
