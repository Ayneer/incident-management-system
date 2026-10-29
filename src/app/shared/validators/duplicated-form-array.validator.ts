import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validatorNoDuplicated(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as FormArray;
    if (!formArray || formArray.length <= 1) return null;

    const oldValues: string[] = formArray.controls.map((olv) =>
      olv.value?.toString().trim().toLocaleLowerCase()
    );
    console.log(oldValues)
    const hasDuplicated = oldValues.some((oldV, index) => oldValues.indexOf(oldV) !== index);

    return hasDuplicated ? { duplicated: true } : null;
  };
}
