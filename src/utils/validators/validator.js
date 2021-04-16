export const requireFiled = value => {
  
    if (value) return undefined;
    return 'Field is required';
}

export const maxLengthCreator = (maxLength) => (value) => {
  
    if(value.length > maxLength) return `Max length > ${maxLength}`
    return undefined
 }

