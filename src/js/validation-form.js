export default class Validation {
  static clearInput(forms) {
    forms.forEach((form) => {
      form.reset();
    });
  }

  static getSelectValue(selectElement) {
    return selectElement.options[selectElement.selectedIndex];
  }

  static getRatioValue(ratioElement) {
    let selectedValue = null;
    for (let i = 0; i < ratioElement.length; i += 1) {
      if (ratioElement[i].checked) {
        selectedValue = ratioElement[i];
      }
    }
    return selectedValue;
  }

  static isEmptyArea(value) {
    if (value === '') return false;
    return true;
  }

  static isLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) return true;
    return false;
  }

  static isCheckRadio(radioElements) {
    if (Validation.getRatioValue(radioElements)) return true;
    return false;
  }

  static isNumber(field) {
    if (/^[0-9]+$/.test(field.value)) return true;
    return false;
  }

  static inputNumberValidation(input) {
    if (Validation.isEmptyArea(input.value.trim()) && Validation.isNumber(input)) return true;
    return false;
  }

  static inputRadioValidation(input) {
    if (Validation.isCheckRadio(input.parentElement.querySelectorAll('input[name="readData"]'))) return true;
    return false;
  }

  static inputTextValidation(input) {
    if (Validation.isEmptyArea(input.value.trim()) && Validation.isLetters(input)) return true;
    return false;
  }

  static formVerify(arr) {
    if (arr.length > 0) return false;
    return true;
  }
  // DOPOPRAWY

  static formValidation(...inputs) {
    let posiitive = false;
    const validationArray = [];
    inputs.forEach((input) => {
      if (input.parentElement.classList[1] === 'book-features__number') {
        posiitive = Validation.inputNumberValidation(input);
      } else if (input.parentElement.classList[1] === 'book-features__radio') {
        posiitive = Validation.inputRadioValidation(input);
      } else {
        posiitive = Validation.inputTextValidation(input);
      }

      if (posiitive === false) {
        validationArray.push(0);
      }
    });
    return Validation.formVerify(validationArray);
  }
}
