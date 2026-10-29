import { FormArray, FormControl } from '@angular/forms';
import { validatorNoDuplicated } from './duplicated-form-array.validator';

describe('validatorNoDuplicated', () => {
  const validator = validatorNoDuplicated();

  it('should return null if FormArray is empty', () => {
    const formArray = new FormArray([]);

    const result = validator(formArray);

    expect(result).toBeNull();
  });

  it('should return null if FormArray has only one element', () => {
    const formArray = new FormArray([new FormControl('angular')]);

    const result = validator(formArray);

    expect(result).toBeNull();
  });

  it('should return null if there are no duplicated values', () => {
    const formArray = new FormArray([
      new FormControl(' angular '),
      new FormControl('react'),
      new FormControl('vue'),
    ]);

    const result = validator(formArray);

    expect(result).toBeNull();
  });

  it('should return an object with { duplicated: true } if exact duplicates are found', () => {
    const formArray = new FormArray([
      new FormControl('angular'),
      new FormControl('react'),
      new FormControl('angular'),
    ]);

    const result = validator(formArray);

    expect(result).toEqual({ duplicated: true });
  });

  it('should return an object with { duplicated: true } if duplicates with case or whitespace differences are found', () => {
    const formArray = new FormArray([new FormControl('  Angular  '), new FormControl('angular')]);

    const result = validator(formArray);

    expect(result).toEqual({ duplicated: true });
  });
});
