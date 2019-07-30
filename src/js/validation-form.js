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

  static showError(dataType) {
    const errorSection = document.querySelector('.errors');
    errorSection.textContent = `Invalid. Please enter a ${dataType} data.`;
    errorSection.classList.add('errors--active');

    setTimeout(() => {
      errorSection.classList.remove('errors--active');
    }, 1500);
  }

  static formValidation(...inputs) {
    let posiitive = false;
    const validationArray = [];
    let dataType = '';
    inputs.forEach((input) => {
      console.log(input.type);
      if (input.type === 'radio') {
        posiitive = Validation.inputRadioValidation(input);
      } else if (input.type === 'text' || input.type === 'select-one') {
        posiitive = Validation.inputTextValidation(input);
        dataType = 'text';
      } else if (input.type === 'number') {
        posiitive = this.inputNumberValidation(input);
        console.log(input.value);
      }

      if (posiitive === false) {
        validationArray.push(0);
        Validation.showError(dataType);
      }
    });
    return Validation.formVerify(validationArray);
  }
}
