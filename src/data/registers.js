export const regs = [
  {
    value: 'General Purpose Registers',
    label: 'General Purpose Registers',
    children: [
      {value: 'RAX', label: 'RAX'},
      {value: 'RBX', label: 'RBX'},
      {value: 'RCX', label: 'RCX'},
      {value: 'RDX', label: 'RDX'},
      {value: 'RSI', label: 'RSI'},
      {value: 'RDI', label: 'RDI'},
      {value: 'RBP', label: 'RBP'},
      {value: 'RSP', label: 'RSP'},
      {value: 'R8', label: 'R8'},
      {value: 'R9', label: 'R9'},
      {value: 'R10', label: 'R10'},
      {value: 'R11', label: 'R11'},
      {value: 'R12', label: 'R12'},
      {value: 'R13', label: 'R13'},
      {value: 'R14', label: 'R14'},
      {value: 'R15', label: 'R15'},
      {value: 'EAX', label: 'EAX'},
      {value: 'EBX', label: 'EBX'},
      {value: 'ECX', label: 'ECX'},
      {value: 'EDX', label: 'EDX'},
      {value: 'AX', label: 'AX'},
      {value: 'BX', label: 'BX'},
      {value: 'CX', label: 'CX'},
      {value: 'DX', label: 'DX'},
      {value: 'AL', label: 'AL'},
      {value: 'BL', label: 'BL'},
      {value: 'CL', label: 'CL'},
      {value: 'DL', label: 'DL'},
      {value: 'AH', label: 'AH'},
      {value: 'BH', label: 'BH'},
      {value: 'CH', label: 'CH'},
      {value: 'DH', label: 'DH'},
    ]
  },
  {
    value: 'MMX',
    label: 'MMX',
    children: Array.from({length: 8}, (_, i) => ({value: `MM${i}`, label: `MM${i}`}))
  },
  {
    value: 'XMM',
    label: 'XMM',
    children: Array.from({length: 32}, (_, i) => ({value: `XMM${i}`, label: `XMM${i}`}))
  },
  {
    value: 'YMM',
    label: 'YMM',
    children: Array.from({length: 32}, (_, i) => ({value: `YMM${i}`, label: `YMM${i}`}))
  },
  {
    value: 'ZMM',
    label: 'ZMM',
    children: Array.from({length: 32}, (_, i) => ({value: `ZMM${i}`, label: `ZMM${i}`}))
  },
  {
    value: 'K',
    label: 'K',
    children: Array.from({length: 8}, (_, i) => ({value: `K${i}`, label: `K${i}`}))
  },
  {
    value: '*Segment Registers',
    label: '*Segment Registers',
    children: [
      {value: 'CS', label: 'CS'},
      {value: 'DS', label: 'DS'},
      {value: 'SS', label: 'SS'},
      {value: 'ES', label: 'ES'},
      {value: 'FS', label: 'FS'},
      {value: 'GS', label: 'GS'},
    ]
  },
  {
    value: 'Control Registers',
    label: 'Control Registers',
    children: [
      {value: 'CR0', label: 'CR0'},
      {value: 'CR2', label: 'CR2'},
      {value: 'CR3', label: 'CR3'},
      {value: 'CR4', label: 'CR4'},
      {value: 'CR8', label: 'CR8'},
    ]
  },
  {
    value: 'Debug Registers',
    label: 'Debug Registers',
    children: [
      {value: 'DR0', label: 'DR0'},
      {value: 'DR1', label: 'DR1'},
      {value: 'DR2', label: 'DR2'},
      {value: 'DR3', label: 'DR3'},
      {value: 'DR6', label: 'DR6'},
      {value: 'DR7', label: 'DR7'},
    ]
  },
  {
    value: '*Test Registers',
    label: '*Test Registers',
    children: [
      {value: 'TR3', label: 'TR3'},
      {value: 'TR4', label: 'TR4'},
      {value: 'TR5', label: 'TR5'},
      {value: 'TR6', label: 'TR6'},
      {value: 'TR7', label: 'TR7'},
    ]
  },
  {
    value: 'Instruction Pointer',
    label: 'Instruction Pointer',
    children: [
      {value: 'RIP', label: 'RIP'},
    ]
  },
]