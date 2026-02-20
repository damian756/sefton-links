// Edit this file to update course conditions manually.
// Wind speed and direction are fetched automatically from Open-Meteo.
// Update 'condition' and 'notes' each morning — takes ~2 minutes.

export type Condition = 'firm' | 'standard' | 'wet' | 'closed';

export interface CourseConditionData {
  slug: string;
  name: string;
  condition: Condition;
  notes: string;
}

export const CONDITIONS_DATA: CourseConditionData[] = [
  {
    slug: 'royal-birkdale',
    name: 'Royal Birkdale',
    condition: 'firm',
    notes: 'Course in excellent condition. Winter rules not in play. Greens running 10.5 on the stimpmeter.',
  },
  {
    slug: 'hillside',
    name: 'Hillside',
    condition: 'firm',
    notes: 'Comparable to Birkdale — firm and fast. Back nine playing into the wind this morning.',
  },
  {
    slug: 'formby',
    name: 'Formby GC',
    condition: 'standard',
    notes: 'More sheltered through the pines. Slightly softer than Birkdale. Fairways good.',
  },
  {
    slug: 'west-lancashire',
    name: 'West Lancashire',
    condition: 'wet',
    notes: "More exposed to Irish Sea — soft underfoot after yesterday's rain. Winter rules in play on some fairways.",
  },
  {
    slug: 'southport-ainsdale',
    name: 'Southport & Ainsdale',
    condition: 'standard',
    notes: 'Good playing conditions. Course drains well. 2nd hole still marked as GUR from last week.',
  },
  {
    slug: 'southport-old-links',
    name: 'Southport Old Links',
    condition: 'standard',
    notes: 'Fine for all abilities. More sheltered than the coast courses.',
  },
];
