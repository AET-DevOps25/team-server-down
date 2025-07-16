import formatDate from '../src/util/formatDate';

describe('formatDate', () => {
  test('formats date string correctly', () => {
    const input = '2023-07-16T14:30:00';
    const expected = 'July 16 at 2:30 PM';
    expect(formatDate(input)).toBe(expected);
  });

  test('handles different times of day', () => {
    expect(formatDate('2023-07-16T09:15:00')).toBe('July 16 at 9:15 AM');
    expect(formatDate('2023-07-16T23:45:00')).toBe('July 16 at 11:45 PM');
  });

  test('handles different dates', () => {
    expect(formatDate('2023-01-01T12:00:00')).toBe('January 1 at 12:00 PM');
    expect(formatDate('2023-12-31T00:00:00')).toBe('December 31 at 12:00 AM');
  });

  test('handles invalid date strings', () => {
    expect(formatDate('invalid-date')).toBe('Invalid Date');
  });
});