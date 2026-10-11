export const OFFICER = {
  name: 'R. Deshmukh',
  initials: 'RD',
  role: 'Inspector',
  zone: 'Zone 4',
  officerId: 'OFF-ZN4-0172',
  email: 'r.deshmukh@legalmetrology.gov.in',
};

export const STATS = { total: 248, compliant: 176, violations: 52, review: 20 };

export const STATUS_LABEL = {
  compliant: 'Compliant',
  review: 'Needs review',
  violation: 'Violation',
};

// Declaration catalogue: key, label used on result screen, short label used in the report.
export const DECLARATIONS = [
  { key: 'manufacturer', label: 'Manufacturer / address', short: 'Manufacturer' },
  { key: 'name', label: 'Common / generic name', short: 'Common Name' },
  { key: 'quantity', label: 'Net quantity', short: 'Net Quantity' },
  { key: 'mrp', label: 'Maximum retail price', short: 'MRP' },
  { key: 'date', label: 'Date of packaging', short: 'Manufacturing Date' },
  { key: 'care', label: 'Consumer care details', short: 'Consumer Care' },
  { key: 'origin', label: 'Country of origin', short: 'Country of Origin' },
  { key: 'legibility', label: 'Legibility', short: 'Legibility' },
];

const allPass = {
  manufacturer: { status: 'pass' },
  name: { status: 'pass' },
  quantity: { status: 'pass' },
  mrp: { status: 'pass' },
  date: { status: 'pass' },
  care: { status: 'pass' },
  origin: { status: 'na' },
  legibility: { status: 'pass' },
};

export const inspections = [
  {
    id: 'LM-2026-00124',
    product: 'ABC Premium Rice',
    category: 'Food',
    manufacturer: 'ABC Foods Pvt. Ltd.',
    netQuantity: '5 kg',
    mrp: '₹299',
    date: '06/09',
    dateLong: '06 September 2026',
    status: 'review',
    declarations: {
      ...allPass,
      care: {
        status: 'fail',
        missing: true,
        evidenceId: 'EV-00124-02',
        confidence: 91,
        note: 'Declaration not detected in inspected package images.',
        box: { top: '60%', left: '20%', width: '60%', height: '14%' },
        boxLabel: 'Missing declaration',
      },
      legibility: {
        status: 'review',
        evidenceId: 'EV-00124-03',
        confidence: 74,
        note: 'Text size on the back panel is close to the threshold; manual verification required.',
        box: { top: '30%', left: '15%', width: '70%', height: '12%' },
        boxLabel: 'Low legibility',
      },
    },
  },
  {
    id: 'LM-2026-00123',
    product: 'XYZ Shampoo 500ml',
    category: 'Cosmetics',
    manufacturer: 'XYZ Personal Care Ltd.',
    netQuantity: '500 ml',
    mrp: '₹349',
    date: '05/09',
    dateLong: '05 September 2026',
    status: 'compliant',
    declarations: { ...allPass },
  },
  {
    id: 'LM-2026-00122',
    product: 'Fresh Cooking Oil',
    category: 'Food',
    manufacturer: 'Fresh Agro Industries',
    netQuantity: '1 L',
    mrp: '₹165',
    date: '04/09',
    dateLong: '04 September 2026',
    status: 'violation',
    declarations: {
      ...allPass,
      mrp: {
        status: 'fail',
        evidenceId: 'EV-00122-01',
        confidence: 88,
        note: 'MRP declaration not detected in inspected package images.',
        box: { top: '70%', left: '25%', width: '50%', height: '12%' },
        boxLabel: 'Missing declaration',
      },
      date: {
        status: 'fail',
        evidenceId: 'EV-00122-02',
        confidence: 86,
        note: 'Date of packaging not detected in inspected package images.',
        box: { top: '45%', left: '20%', width: '60%', height: '12%' },
        boxLabel: 'Missing declaration',
      },
    },
  },
  {
    id: 'LM-2026-00121',
    product: 'ABC Glucose Biscuit',
    category: 'Food',
    manufacturer: 'ABC Foods Pvt. Ltd.',
    netQuantity: '250 g',
    mrp: '₹30',
    date: '03/09',
    dateLong: '03 September 2026',
    status: 'compliant',
    declarations: { ...allPass },
  },
  {
    id: 'LM-2026-00120',
    product: 'Sunrise Toothpaste',
    category: 'Cosmetics',
    manufacturer: 'Sunrise Healthcare Pvt. Ltd.',
    netQuantity: '150 g',
    mrp: '₹95',
    date: '02/09',
    dateLong: '02 September 2026',
    status: 'compliant',
    declarations: { ...allPass },
  },
  {
    id: 'LM-2026-00119',
    product: 'Farmline Wheat Flour',
    category: 'Food',
    manufacturer: 'Farmline Mills',
    netQuantity: '10 kg',
    mrp: '₹420',
    date: '01/09',
    dateLong: '01 September 2026',
    status: 'violation',
    declarations: {
      ...allPass,
      quantity: {
        status: 'fail',
        evidenceId: 'EV-00119-01',
        confidence: 93,
        note: 'Net quantity declaration not detected in inspected package images.',
        box: { top: '55%', left: '22%', width: '56%', height: '12%' },
        boxLabel: 'Missing declaration',
      },
    },
  },
];

export const CURRENT = inspections[0];

export function getInspection(id) {
  return inspections.find((i) => i.id === id);
}

// Flattens an inspection's declarations into an ordered list.
export function declarationList(inspection) {
  return DECLARATIONS.map((d) => ({ ...d, ...inspection.declarations[d.key] }));
}

// Findings are every declaration that failed or needs review.
export function findingsOf(inspection) {
  return declarationList(inspection).filter((d) => d.status === 'fail' || d.status === 'review');
}

export const RULES = [
  {
    code: 'Rule 6',
    name: 'Mandatory Declarations',
    sub: 'Declarations every pre-packaged commodity must carry on the package.',
    items: [
      'Manufacturer / Packer',
      'Common / Generic Name',
      'Net Quantity',
      'MRP',
      'Date',
      'Consumer Care',
    ],
    lastUpdated: '01 June 2026',
    version: 'PCR-2011-AM-2026',
  },
];

export const RULE_SET = {
  version: 'PCR-2011-AM-2026',
  lastUpdated: '01 June 2026',
  activeChecks: 8,
  engine: 'Image → OCR → Information extraction → Rules engine → Compliance result',
};
