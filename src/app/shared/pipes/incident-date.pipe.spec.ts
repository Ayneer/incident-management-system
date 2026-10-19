import { IncidentDatePipe } from './incident-date.pipe';

describe('IncidentDatePipe', () => {
  let pipe: IncidentDatePipe;

  beforeEach(() => {
    pipe = new IncidentDatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('null values tests', () => {
    it('should return "Not date found" when value is undefined', () => {
      expect(pipe.transform(undefined)).toBe('Not date found');
    });

    it('should return "Not date found" when value is an empty string', () => {
      expect(pipe.transform('')).toBe('Not date found');
    });
  });

  describe('invalid dates tests', () => {
    it('should return "Invalid date" when string is not a valid date format', () => {
      expect(pipe.transform('esto-no-es-una-fecha')).toBe('Invalid date');
    });

    it('should return "Invalid date" when date object is invalid', () => {
      expect(pipe.transform(new Date('invalid'))).toBe('Invalid date');
    });
  });

  describe('successfull tests (DD/MM/YYYY)', () => {
    it('should format a valid ISO string date correctly', () => {
      const isoDate = '2026-10-19T14:32:00Z';
      expect(pipe.transform(isoDate)).toMatch(/^\d{2}\/\d{2}\/\d{4}$/); 
    });

    it('should pad single digit days and months with a leading zero', () => {
      const specDate = new Date(2026, 0, 5);
      expect(pipe.transform(specDate)).toBe('05/01/2026');
    });

    it('should correctly format standard double digit days and months', () => {
      const specDate = new Date(2026, 11, 12);
      expect(pipe.transform(specDate)).toBe('12/12/2026');
    });
  });
});
