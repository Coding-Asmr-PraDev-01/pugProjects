// DOM Elements
const passwordInputEle = document.querySelector('.password');
const usernameInputEle = document.querySelector('.first-name');
const passwordRulesBxEle = document.querySelector('.password-rulesBx');
const confirmPasswordInputEle = document.querySelector('.confirm-password');
const emailInputEle = document.querySelector('.email');

// Get root element in css
const root = document.querySelector(':root');
const computedStyles = getComputedStyle(root);

// Create Array for different Characters
const uppercaseAlphabetsArr = Array.from({length: 26}, (_, ind) => {
     return String.fromCharCode('A'.charCodeAt(0) + ind);
});

const lowercaseAlphabetsArr = Array.from({length: 26}, (_, ind) => {
     return String.fromCharCode('a'.charCodeAt(0) + ind);
});

const numbersArr = Array.from({length: 10}, (_, ind) => {
     return ind;
});

const specialCharsArr = Array.from({length: 15}, (_, ind) => {
     return String.fromCharCode(33 + ind);
});


// Fire eventlistener on password input
passwordInputEle.addEventListener('input', (e) => {
     let userInput = e.target.value;

     setTimeout(() => {
          // check if input contains lowercase letter
          validatePassword(userInput, 'lowercase');

          // check if input contains uppercase letter
          validatePassword(userInput, 'uppercase');  

          // check if input contains special-character
          validatePassword(userInput, 'special-character'); 

          // check if password-length is atleast 8 chars
          validatePassword(userInput, 'password-length'); 

          // check if password is not part of username 
          validatePassword(userInput, 'not-username'); 
          
          // check if input contains number
          validatePassword(userInput, 'number');  
     }, 0);         

});

// Handle backspace edge case for password input
passwordInputEle.addEventListener('keydown', (e) => {
     if(e.key === 'Backspace'){
          let userInput = e.target.value;
          setTimeout(() => {
               // check if input contains lowercase letter
               validatePassword(userInput, 'lowercase');
     
               // check if input contains uppercase letter
               validatePassword(userInput, 'uppercase');
               
               // check if input contains special-character
               validatePassword(userInput, 'special-character'); 

               // check if password-length is atleast 8 chars
               validatePassword(userInput, 'password-length'); 

               // check if password is not part of username 
               validatePassword(userInput, 'not-username'); 

               // check if input contains number
               validatePassword(userInput, 'number'); 
          }, 0);
     }   
});

// Validate password rules on realtime
const validatePassword = (userInput, type) => {
     let tickIconEle;
     switch(type){
          case 'lowercase':
               tickIconEle = document.querySelector(`.rules-item > span[data-checkfor='${type}'] > i`);
               if(lowercaseAlphabetsArr.some(char => userInput.includes(char))){
                    toggleTickIcon(true, tickIconEle);
               }else{
                    toggleTickIcon(false, tickIconEle);
               }
               break;

          case 'uppercase':
               tickIconEle = document.querySelector(`.rules-item > span[data-checkfor='${type}'] > i`);
               if(uppercaseAlphabetsArr.some(char => userInput.includes(char))){
                    toggleTickIcon(true, tickIconEle);
               }else{
                    toggleTickIcon(false, tickIconEle);
               }
               break;

          case 'number':
               tickIconEle = document.querySelector(`.rules-item > span[data-checkfor='${type}'] > i`);
               if(numbersArr.some(char => userInput.includes(Number(char)))){
                    toggleTickIcon(true, tickIconEle);
               }else{
                    toggleTickIcon(false, tickIconEle);
               }
               break;

          case 'special-character':
               tickIconEle = document.querySelector(`.rules-item > span[data-checkfor='${type}'] > i`);
               if(specialCharsArr.some(char => userInput.includes(char))){
                    toggleTickIcon(true, tickIconEle);
               }else{
                    toggleTickIcon(false, tickIconEle);
               }
               break;

          case 'password-length':
               tickIconEle = document.querySelector(`.rules-item > span[data-checkfor='${type}'] > i`);
               if(userInput.length >= 8){
                    toggleTickIcon(true, tickIconEle);
               }else{
                    toggleTickIcon(false, tickIconEle);
               }
               break;

          case 'not-username':
               tickIconEle = document.querySelector(`.rules-item > span[data-checkfor='${type}'] > i`);
               if(!userInput.includes(usernameInputEle.value)){
                    toggleTickIcon(true, tickIconEle);
               }else{
                    toggleTickIcon(false, tickIconEle);
               }
               break;

          default: 
               break;
     }
}    

// Validate email address
emailInputEle.addEventListener('blur', (e) => {
     let email = emailInputEle.value.trim();
     const atInd = email.indexOf('@');
     const dotInd = email.lastIndexOf('.');

     if(!(atInd > 0 && (dotInd > atInd + 1) && (dotInd < email.length - 1))){
          emailInputEle.style.outline = '2px solid red'; 
          let errorMsgEle = document.createElement('p');
          errorMsgEle.classList.add('error-msg');
          errorMsgEle.textContent = 'Email address should be valid.';

          // if there is no error message then appends it
          if(!emailInputEle.parentElement.querySelector('.error-msg')){
               emailInputEle.parentElement.appendChild(errorMsgEle);
          }
     }else{
          emailInputEle.style.outline = `2px solid ${computedStyles.getPropertyValue('--green-light-color')}`; 
          let existingErrorMsg = emailInputEle.parentElement.querySelector('.error-msg');
          if(existingErrorMsg){
               existingErrorMsg.remove();
          }
     }
});


// Toggle tick icon based validated password
const toggleTickIcon = (isValid, icon) => {
     if(isValid){
          icon.classList.remove('invalid');
          icon.classList.add('fa-check');
          icon.classList.remove('fa-xmark');
          icon.classList.add('valid');
     }else{
          icon.classList.add('invalid');
          icon.classList.remove('fa-check');
          icon.classList.add('fa-xmark');
          icon.classList.remove('valid');
     }
}

// Show password rulesbx only when password field is focused
passwordInputEle.addEventListener('focus', () => {
     passwordRulesBxEle.style.display = 'flex';
});

passwordInputEle.addEventListener('blur', () => {
     passwordRulesBxEle.style.display = 'none';
});

// Check if whether confirm password is equals to password or not
confirmPasswordInputEle.addEventListener('blur', (e) => {
     if(e.target.value !== passwordInputEle.value){
          confirmPasswordInputEle.style.outline = '2px solid red'; 
          let errorMsgEle = document.createElement('p');
          errorMsgEle.classList.add('error-msg');
          errorMsgEle.textContent = 'Password & Confirm Password does not match.';

          // if there is no error message then appends it
          if(!confirmPasswordInputEle.parentElement.querySelector('.error-msg')){
               confirmPasswordInputEle.parentElement.appendChild(errorMsgEle);
          }
     }else{
          confirmPasswordInputEle.style.outline = `2px solid ${computedStyles.getPropertyValue('--green-light-color')}`; 
          let existingErrorMsg = confirmPasswordInputEle.parentElement.querySelector('.error-msg');
          if(existingErrorMsg){
               existingErrorMsg.remove();
          }
     }
}); 
