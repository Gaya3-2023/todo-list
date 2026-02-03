import styled from 'styled-components';

const StyledLabel = styled.label`
          padding:4px;
          `; 
const StyledInput = styled.input` margin-right: 10px;`;    


function TextInputWithLabel({
  elementId,
  label,
  onChange,
  ref,
  value,
}) {
  return (
    <>
      <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;