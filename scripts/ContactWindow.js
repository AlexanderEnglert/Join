let contactDetails = {};
let IMGPfadon = ['deleteBlue','editBlue']
let IMGPfadof = ['delete',  'edit']


/**
 * Classes are removed and added and a function call takes place.
 * 
 * @param {*} initials 
 * @param {*} name 
 * @param {*} email 
 * @param {*} phone 
 * @param {*} buttonColor 
 * @param {*} index 
 */
function editNewContact(initials, name, email, phone, buttonColor, index) {
  document.getElementById("EditContactIDWIn").classList.remove("none");
  document.getElementById("EditContactIDWIn").classList.add("EditContactWindow");
  let windowSize = window.innerWidth
  if(windowSize < 900){
    document.getElementById('MenuEditDeleteOptionsID').classList.add('hidden');
    document.getElementById('MenuEditDeleteOptionsID').classList.remove('MenuEditDeleteOptionsSmall');    
  }
  editNewContactHtml2(initials, name, email, phone, buttonColor, index, true);
}


/**
 * The values for name, email and phone are read out. If this is not the case, the respective function is called. 
 * Further function calls also take place.
 * 
 * @param {*} name 
 * @param {*} email 
 * @param {*} phone 
 * @param {*} index 
 */
function editNewContactSave(name, email, phone, index) {
  let nameelement = document.getElementById("editNameInput").value
  let emailelement = document.getElementById("editEmailInput").value
  let phoneelement = document.getElementById("editPhoneInput").value
  editNewContactSave1(nameelement, emailelement, phoneelement)
  applyFocusAndValidation("editNameInput", name, validateName);
  applyFocusAndValidation("editEmailInput", email, validateEmail);
  applyFocusAndValidation("editPhoneInput", phone, validatePhone);
  editNewContactSave2(index) 
}


/**
 * Here we check if name, email and phone are filled in.
 * 
 * @param {*} nameelement 
 * @param {*} emailelement 
 * @param {*} phoneelement 
 */
function editNewContactSave1(nameelement, emailelement, phoneelement){
    if(nameelement === '')
        {validateName("editNameInput")
    }
    if(emailelement === ''){
        validateEmail("editEmailInput")
    }
    if(phoneelement === ''){
        validatePhone("editPhoneInput")
    }
}


/**
 * This is where the form validation takes place and the information is prevented from being sent.
 * In addition, the current values are retrieved from the input fields and the telephone number format is implemented.
 * The telephone number format is checked and a function call is made if the format has been adhered to. 
 * 
 * @param {*} index 
 */
function editNewContactSave2(index) {
    let WindowSize = window.innerWidth;
    
    if (WindowSize < 900) {
        document.getElementById('ChangeClosebutton').innerHTML = `<img class="ImgCloseStyle" src="/assets/icons/closeWhite.png">`;
    }
    
    const nameValue = document.getElementById("editNameInput").value;
    const emailValue = document.getElementById("editEmailInput").value;
    const phoneValue = document.getElementById("editPhoneInput").value;
    const phoneRegex = /^\+\d{2} \d{4} \d{3} \d{2} \d{1}$/;


    if (!phoneRegex.test(phoneValue)) {
        return; 
    } else {
        editNewContactChange(nameValue, emailValue, phoneValue, index);
    }
}




function editNewContactSave3(){
    let WindowSize = window.innerWidth;
    if(WindowSize < 900){
        document.getElementById('MenuEditDeleteOptionsID').classList.remove('SlideinWindowDW1');
        document.getElementById('MenuEditDeleteOptionsID').classList.add('SlideinWindowDW2');
     }
     else{
        document.getElementById('ContactfieldInfodiv').classList.remove('Slideinright');
        document.getElementById('ContactfieldInfodiv').classList.add('Slideinleft');
        
     }
}


/**
 * Depending on which boolean is passed, the values name, email, phone, buttonColor and initials are filled or empty.
 * 
 * @param {*} initialsValue 
 * @param {*} nameValue 
 * @param {*} emailValue 
 * @param {*} phoneValue 
 * @param {*} buttonColorValue 
 * @param {*} index 
 * @param {*} showValues 
 */
function editNewContactHtml2(initialsValue, nameValue, emailValue, phoneValue, buttonColorValue, index, showValues = true) {
    const name = showValues && nameValue ? nameValue : '';  
    const email = showValues && emailValue ? emailValue : '';
    const phone = showValues && phoneValue ? phoneValue : '';
    const buttonColor = showValues && buttonColorValue ? buttonColorValue : '';
    const initials = showValues && initialsValue ? initialsValue : '';
    editNewContactHtml(initials, name, email, phone, buttonColor, index);
}


/**
 * Here initials, name, email, phone, buttonColor and index are added to an object.
 * 
 * @param {*} initials 
 * @param {*} name 
 * @param {*} email 
 * @param {*} phone 
 * @param {*} buttonColor 
 * @param {*} index 
 */
function setContactDetails(initials, name, email, phone, buttonColor, index) {
    contactDetails = { initials, name, email, phone, buttonColor, index };
}


/**
 * In the Add new contact window, text and buttons are changed using functions and class.
 * 
 */
function editNewContactHtmlChange() {
    editContactShowWindow();
    editNewContactHtml2(contactDetails.initials, contactDetails.name, contactDetails.email, contactDetails.phone, contactDetails.buttonColor, contactDetails.index, false);
    document.getElementById('EditWindowAddText1Change').innerHTML='Add contact';
    document.getElementById('EditWindowAddText2Change').innerHTML='Tasks are better with a team!';
    document.getElementById('EditCircleInitialsID').innerHTML='<img src="/assets/icons/person (1).png">'
     document.getElementById('EditCircleStyleColor').style.background='#D9D9D9'
    document.getElementById('EditWindowDeleteSaveID1').classList.remove('EditWindowDeleteSave')
    document.getElementById('EditWindowDeleteSaveID1').classList.add('none')
    document.getElementById('EditWindowDeleteSaveID2').classList.add('EditWindowDeleteSave')
    editNewContactChangeHTML()
}


/**
 * 
 * First of all I get the formatted json and then the values from the input fields are assigned to the variables name, email and phone.
 * The length of the contact strip is then determined and the appropriate key identified.
 * The new object is created and the values are assigned. They are then sent to the database.
 * The main function is rendered to get the current changes and the window is closed.
 */
function createNewContact() {
    let contactAllArray = JSON.parse(localStorage.getItem('contactAllArray')) || [];
    const name = document.getElementById('editNameInput').value.trim();
    const email = document.getElementById('editEmailInput').value.trim();
    const phone = document.getElementById('editPhoneInput').value.trim();
    let newContact = {"name": name,"email": email,"phone": phone,"color": getRandomColor()};
    contactAllArray.push(newContact);
    localStorage.setItem('contactAllArray', JSON.stringify(contactAllArray));
    editContactCloseWindow();
    contactLoad();
}


/**
 * The data is transferred from the database in an object. The length of the array containing the objects is then determined.
 * The object with the corresponding index is deleted from the array and it is rendered. 
 * If the px width is less than 900 px, another function is executed.
 * 
 * @param {*} index 
 * @param {*} name 
 */
function deleteContactList(index) {
    let contactAllArray = JSON.parse(localStorage.getItem('contactAllArray')) || [];
    if (index >= 0 && index < contactAllArray.length) {
        contactAllArray.splice(index, 1);
        localStorage.setItem('contactAllArray', JSON.stringify(contactAllArray));
        document.getElementById('ContactfieldInfodiv').classList.remove('Slideinright');
        document.getElementById('ContactfieldInfodiv').classList.add('Slideinleft');
        contactLoad();
        let windowSize = window.innerWidth;
        if(windowSize < 900){
            document.getElementById('MenuEditDeleteOptionsID').classList.add('hidden');
            document.getElementById('MenuEditDeleteOptionsID').classList.remove('MenuEditDeleteOptionsSmall');
            document.getElementById('ContactSmallSize').classList.add('none');
            document.getElementById('ContactSmallSize').classList.remove('ContactsmallSizeStyle');
            document.getElementById('ContactContentID').classList.remove('none');
            document.getElementById('ContactContentID').classList.add('Contactcontent');
            document.getElementById('AddContactNewButton').classList.remove('none');
            document.getElementById('AddContactNewButton').classList.add('MenuEditDeleteButton');
            document.getElementById('MenuEditDeleteButtonID').classList.add('hidden');
            
        }
    }
}


/**
 * Slide out animation is started and the system waits until the animation is complete before hiding the element.
 * If the Px width is less than 900 and a certain text element is in the Id, the corresponding classes are executed.
 * 
 */
function editContactCloseWindow() {
    const editWindow = document.getElementById('EditContactIDWIn');
    editWindow.classList.remove('Slideinright');
    editWindow.classList.add('Slideinleft');
    setTimeout(() => {
        let windowSize = window.innerWidth
        if(windowSize < 900){
            let WindowHeadline = document.getElementById('EditWindowAddText1Change').textContent
            if(WindowHeadline !== 'Add contact'){
                document.getElementById('editDeleteChoiceButton').classList.remove('hidden');
                document.getElementById('editDeleteChoiceButton').classList.add('MenuEditDeleteButton');
            }
        }
        editWindow.classList.add("none");
        editWindow.classList.remove("EditContactWindow");
    }, 400); 
}


/**
 * The element is made visible to start the slide in animation.
 * 
 */
function editContactShowWindow() {
    const editWindow = document.getElementById('EditContactIDWIn');
    editWindow.classList.remove('none', 'Slideinleft');
    editWindow.classList.add('EditContactWindow', 'Slideinright');
}


/**
 * Function to generate a random color in hex format.
 * 
 * @returns 
 */
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


/**
 * The data is transferred from the database in an object. The system then checks whether a contact with the same values already exists. 
 * The object with the corresponding index is deleted and a new object is created. The new object is inserted where the other object was deleted.
 * Finally, the clock jump function is rendered.
 * 
 * @param {	} name 
 * @param {*} email 
 * @param {*} phone 
 * @param {*} index 
 */
function editNewContactChange(name, email, phone, index) {
    let contactAllArray = JSON.parse(localStorage.getItem('contactAllArray')) || [];
    let duplicate = contactAllArray.some(contact => 
        contact.name === name && contact.email === email && contact.phone === phone
    );
    if (index >= 0 && index < contactAllArray.length && !duplicate) {
        editNewContactChange2(name, email, phone, index, contactAllArray)
    }
}


function editNewContactChange2(name, email, phone, index, contactAllArray){
    contactAllArray.splice(index, 1);
    let newContact = {"email": email,"name": name,"phone": phone,"color": getRandomColor()};
    contactAllArray.splice(index, 0, newContact);
    localStorage.setItem('contactAllArray', JSON.stringify(contactAllArray));
    let WindowSize = window.innerWidth;
    if(WindowSize < 900){
        contactWindowSmallSize()
      
    }
    
    document.getElementById('EditContactIDWIn').classList.remove('Slideinright');
    document.getElementById('EditContactIDWIn').classList.add('Slideinleft');
    contactLoad();
}


/**
 * First a function is executed that capitalizes every first letter. Then the value in the input field is updated.
 * It is ensured that at least one first name and one surname are present. 
 * 
 * @param {	} inputFieldId 
 * @param {*} originalValue 
 * @returns 
 */
function validateName(inputFieldId, originalValue) {
    const nameInput = document.getElementById(inputFieldId);
    const parentDiv = nameInput.closest(".EditWindowInput");
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, function(letter) {
            return letter.toUpperCase();
        });
    }
    nameInput.value = capitalizeWords(nameInput.value);
    const nameRegex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/;
    validateBorderChange(nameInput, parentDiv, nameRegex)
}


/**
 * The email is transferred and the conditions whether it is correct or not are transmitted.
 * 
 * @param {*} inputFieldId 
 * @param {*} originalValue 
 */
function validateEmail(inputFieldId, originalValue) {
    const emailInput = document.getElementById(inputFieldId);
    const parentDiv = emailInput.closest(".EditWindowInput");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateBorderChange(emailInput, parentDiv, emailRegex)
}


/**
 * An event listener is added for the focus to add the + sign. The phone number is formatted before it is validated.
 * 
 * @param {*} inputFieldId 
 * @param {*} originalValue 
 * @returns 
 */
  function validatePhone(inputFieldId, originalValue) {
    const phoneInput = document.getElementById(inputFieldId);
    const parentDiv = phoneInput.closest(".EditWindowInput");
    phoneInput.addEventListener('focus', function() {
        if (!phoneInput.value.startsWith('+')) {phoneInput.value = '+';}
    });
    if (phoneInput.value.startsWith('+')) {
        phoneInput.value = formatPhoneNumber(phoneInput.value);
    }
    const phoneRegex = /^\+\d{2} \d{4} \d{3} \d{2} \d{1}$/;
    validateBorderChange(phoneInput, parentDiv, phoneRegex)
}


/**
 * * The status of the input field is viewed here, whether it is empty, an invalid entry has been made or whether it has been entered correctly.
 * 
 * @param {*} NameInput 
 * @param {*} parentDiv 
 * @param {*} NameRegex 
 * @returns 
 */
function validateBorderChange(NameInput, parentDiv, NameRegex){
    if (NameInput.value.trim() === '') {
        parentDiv.style.border = "1px solid #29ABE2";
        return false;
    } else if (!NameRegex.test(NameInput.value)) {
        parentDiv.style.border = "1px solid red";
        return false;
    } else {
        parentDiv.style.border = "1px solid #29ABE2";
        return true;
    }
}


/**
 * A function is called here depending on which value is passed. If the clicked field is empty, the old value is restored.
 * 
 * @param {*} inputFieldId 
 * @param {*} originalValue 
 * @param {*} validationFunction 
 */
function applyFocusAndValidation(inputFieldId,originalValue,validationFunction) {
  const inputField = document.getElementById(inputFieldId);
  applyFocusAndValidation2(inputField, originalValue)
  inputField.addEventListener("input", function () {
    validationFunction(inputFieldId, originalValue);
  });
  inputField.addEventListener("blur", function () {
    if (this.value === "") {
      this.value = originalValue;
    }
    validationFunction(inputFieldId, originalValue);
  });
}


/**
 * If the field also has a focus, the border and the outline are removed. If the current value corresponds to the original value, the field is empty.
 * 
 * @param {*} inputField 
 */
function applyFocusAndValidation2(inputField, originalValue){
    inputField.addEventListener("focus", function () {
        this.style.border = "none";
        this.style.outline = "none";
        if (this.value === originalValue) {
            this.value = "";
            validateName("editNameInput")
            validateEmail("editEmailInput")
            validatePhone("editPhoneInput")
        }
      });
}


/**
 * When formatting the telephone number, all digits and the plus sign are removed. In addition, the format of a cell phone number is implemented.
 * 
 * @param {*} value 
 * @returns 
 */
function formatPhoneNumber(value) {
    value = value.replace(/[^\d+]/g, "");
    if (value.startsWith("+") && value.length > 3) {
        value = value.replace(
            /^\+(\d{2})(\d{0,4})(\d{0,3})(\d{0,2})(\d{0,1}).*/,
            "+$1 $2 $3 $4 $5"
        );
    } else if (!value.startsWith("+")) {
        value = "+";
    }
    if (value.length > 17) {
        value = value.slice(0, 17);
    }
    return value.trim();
}


/**
 * A different path is used depending on which ID is transferred. This is used to exchange icons.
 * 
 * @param {*} id 
 */
function onmouse(id){
    let pfadextra;
    if((id == 'ContactEditChange') || (id == 'ContactEditChange2')){
        pfadextra = IMGPfadon[1]
    }
    else{
        pfadextra = IMGPfadon[0]
    }
    document.getElementById(id).innerHTML=`<img class="ContactDeleteEdit" src="/assets/icons/${pfadextra}.png"></img>`;
}


/**
* A different path is used depending on which ID is transferred. This is used to exchange icons.
* 
* @param {*} id 
*/
function outmouse(id){
let pfadextra;
    if((id == 'ContactEditChange') || (id == 'ContactEditChange2')){
        pfadextra = IMGPfadof[1]
    }
    else{
        pfadextra = IMGPfadof[0]
    }
    document.getElementById(id).innerHTML=`<img class="ContactDeleteEdit" src="/assets/icons/${pfadextra}.png"></img>`;
}


/**
* A different path is used depending on which ID is transferred. This is used to exchange icons.
* 
* @param {*} id 
*/
function onmouseClose(id){
if(id == 'XCloseID'){
    document.getElementById(id).innerHTML=`<img id="XCloseother" class="ImgCloseStyle2" src="/assets/icons/closeBlue.png">`;
}
}


/**
* A different path is used depending on which ID is transferred. This is used to exchange icons.
* 
* @param {*} id 
*/
function outmouseClose(id){
if(id == 'XCloseID'){
    document.getElementById(id).innerHTML=`<img id="XClose" class="ImgCloseStyle2" src="/assets/icons/close.png">`;
}
}  


/**
*An element that is equipped with this function is not considered by an eventListener. 
* 
* @param {*} event 
*/
function protect(event){
event.stopPropagation();
}
