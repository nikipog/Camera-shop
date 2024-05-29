import { ChangeEvent } from 'react';

const PLUS_SEVEN = '+7';
const SEVEN = '7';
const EIGHT = '8';
const NINE = '9';

const phoneFirstDigits = [SEVEN, EIGHT, NINE];

const PhoneInputReferenceLength = {
  OneSymbol: 1,
  FiveSymbols: 5,
  EightSymbols: 8,
  TenSymbols: 10,

} as const;

const SubstringIndex = {
  Zero: 0,
  One: 1,
  Four: 4,
  Seven: 7,
  Nine: 9,
  Eleven: 11,
  Sixteen: 16
} as const;


const PHONE_INPUT_FIRST_ELEMENT = 0;

const NOT_DIGIT_REGEXP = /\D/g;
const DIGITS_AND_PLUS_REGEXP = /[^\d+]/g;


const getInputNumbersValue = function (input: HTMLInputElement): string {
  return input.value.replace(NOT_DIGIT_REGEXP, '');

};

const createHandlePhoneInput = (setPhone: (value: string) => void) => (event: ChangeEvent<HTMLInputElement>) => {
  const input = event.target as HTMLInputElement;
  let inputNumbersValue = getInputNumbersValue(input);
  let formattedInputValue = '';
  const selectionStart = input.selectionStart;

  if (!inputNumbersValue) {
    input.value = '';
    setPhone('');
    return;
  }

  const nativeEvent = event.nativeEvent as InputEvent;

  if (input.value.length !== selectionStart) {
    if (nativeEvent.data && NOT_DIGIT_REGEXP.test(nativeEvent.data)) {
      input.value = inputNumbersValue;
    }
    return;
  }

  if (phoneFirstDigits.indexOf(inputNumbersValue[PHONE_INPUT_FIRST_ELEMENT]) > -1) {
    // Russian phone number
    if (inputNumbersValue[PHONE_INPUT_FIRST_ELEMENT] === NINE) {
      inputNumbersValue = `${SEVEN}${inputNumbersValue}`;
    }
    const firstSymbols = (inputNumbersValue[PHONE_INPUT_FIRST_ELEMENT] === EIGHT) ? EIGHT : `+${SEVEN}`;
    formattedInputValue = `${firstSymbols}`;
    if (inputNumbersValue.length > PhoneInputReferenceLength.OneSymbol) {
      formattedInputValue += `(${inputNumbersValue.substring(SubstringIndex.One, SubstringIndex.Four)}`;
    }
    if (inputNumbersValue.length >= PhoneInputReferenceLength.FiveSymbols) {
      formattedInputValue += `)${inputNumbersValue.substring(SubstringIndex.Four, SubstringIndex.Seven)}`;
    }
    if (inputNumbersValue.length >= PhoneInputReferenceLength.EightSymbols) {
      formattedInputValue += `-${inputNumbersValue.substring(SubstringIndex.Seven, SubstringIndex.Nine)}`;
    }
    if (inputNumbersValue.length >= PhoneInputReferenceLength.TenSymbols) {
      formattedInputValue += `-${inputNumbersValue.substring(SubstringIndex.Nine, SubstringIndex.Eleven)}`;
    }
  } else {
    // not Russian phone number
    formattedInputValue = `+${inputNumbersValue.substring(SubstringIndex.Zero, SubstringIndex.Sixteen)}`;
  }
  input.value = formattedInputValue;
  setPhone(formattedInputValue);
};

const handlePhoneKeyDown = function (event: React.KeyboardEvent<HTMLInputElement>) {
  const input = event.target as HTMLInputElement;
  if (event.key === 'Backspace' && getInputNumbersValue(input).length === PhoneInputReferenceLength.OneSymbol) {
    input.value = '';
  }
};

const handlePhonePaste = function (event: React.ClipboardEvent<HTMLInputElement>) {


  const clipboardData = event.clipboardData || window.Clipboard;
  const pasted = clipboardData.getData('text');
  const input = event.target as HTMLInputElement;
  const inputNumbersValue = getInputNumbersValue(input);

  if (NOT_DIGIT_REGEXP.test(pasted)) {
    {
      input.value = inputNumbersValue;
    }
  }
};

const formatPhoneNumber = (phoneToFormat: string): string => {
  // Удаляем все нецифровые символы, кроме '+'
  let formattedPhone = phoneToFormat.replace(DIGITS_AND_PLUS_REGEXP, '');

  if (formattedPhone.startsWith(PLUS_SEVEN)) {
    // Ничего не делаем, если номер уже в формате +7XXXXXXXXXX
    return formattedPhone;
  } else if (formattedPhone.startsWith(EIGHT)) {
    // Заменяем 8 на +7
    formattedPhone = `${PLUS_SEVEN}${formattedPhone.slice(1)}`;
  } else if (!formattedPhone.startsWith(PLUS_SEVEN) && formattedPhone.startsWith(SEVEN)) {
    // Добавляем + перед 7, если номер начинается с 7, но без +
    formattedPhone = `${PLUS_SEVEN}${formattedPhone}`;
  }

  return formattedPhone;
};

export { createHandlePhoneInput, handlePhoneKeyDown, handlePhonePaste, formatPhoneNumber };
