//priority btns

/**
 * changes classlist of priority-btns
 * @param {String} id 
 * @param {String} classList 
 */
function changePriority(id, classList) {
    let imgName = `${id}-img`;
    let imgPath = document.getElementById(imgName);
    toggleClassList(id, classList);
    for (let i = 0; i < priority.length; i++) {
        let prio = priority[i].level;
        if (prio == id) {
            currentPrio = prio;
            changePriorityIcons(imgPath, i);
        }
    }
    checkIfBtnIsClicked();
}


/**
 * changes icons of clicked priority btn
 * @param {object} imgPath 
 * @param {number} i 
 */
function changePriorityIcons(imgPath, i) {
    switch (true) {
        case priority[i].toggle: {
            priority[i].toggle = false;
            imgPath.src = priority[i]["img-normal"];
            break;
        }
        default: {
            priority[i].toggle = true;
            imgPath.src = priority[i]["img-choosed"];
            break;
        }
    }
}


/**
 * checks, if a priority-btn is clicked
 * if yes, it calls function for disabling the other btns
 */
function checkIfBtnIsClicked() {
    let counter = 0;
    for (let i = 0; i < priority.length; i++) {
        let btnIsClicked = priority[i].toggle;
        if (btnIsClicked) {
            fillHiddenInputField('priority-input');
        } else counter++;
    }
    if (counter == 3) clearHiddenInputField('priority-input');
    resetOtherPrioBtns();
}


/**
 * checks value of index of clicked btn and calls function for disabling the other btns
 * @param {number} i 
 */
function resetOtherPrioBtns() {
    switch (currentPrio) {
        case 'urgent': {
            resetPrioBtns('medium', 'low');
            break;
        }
        case 'medium': {
            resetPrioBtns('urgent', 'low');
            break;
        }
        case 'low': {
            resetPrioBtns('medium', 'urgent');
            break;
        }
    }
}


/**
 * reset settings like classlist for bg, img-icons and toggle-status
 * @param {String} id1 
 * @param {String} id2 
 */
function resetPrioBtns(id1, id2) {
    let prioIds = [];
    prioIds.push(id1);
    prioIds.push(id2);
    for (let i = 0; i < prioIds.length; i++) {
        let prioId = prioIds[i];
        removeClassList(prioId, 'btn-' + prioId);
        for (let j = 0; j < priority.length; j++) {
            let prio = priority[j];
            if (prio.level == prioId) resetOtherPrioImg(j, prioId);
        }
    }
}


function resetOtherPrioImg(j, prioId){
    priority[j].toggle = false;
    let imgName = `${prioId}-img`;
    let imgPath = document.getElementById(imgName);
    imgPath.src = priority[j]["img-normal"];
}



// Colorpicker

/**
 * Function to check if a Colorbutton is already checked or not
 * 
 */
function checkIfColorBtnIsClicked() {
    if (colorBtnIsClicked) {
        colorBtnIsClicked = false;
    } else {
        colorBtnIsClicked = true;
    }
}

/**
 * Function to disable all other color Buttons when one Color is clicked
 * 
 */
function disableOtherColorBtns() {
    for (let i = 0; i < 6; i++) {
        if (i !== colorNewCategory && colorBtnIsClicked) {
            document.getElementById('colorpicker-' + i).style.pointerEvents = 'none';
        }
        if (i == colorNewCategory && !colorBtnIsClicked) {
            activateAllColorBtns();
        }
    }
}

/**
 * Function to activate all Colorbuttons
 * 
 */
function activateAllColorBtns() {
    for (let i = 0; i < 6; i++) {
        document.getElementById('colorpicker-' + i).style.pointerEvents = 'auto';
    }
}


/**
 * Function to set the global variable colorNewCategory to the given index number
 * Clicked color change the class and gets checked if already clicked
 * 
 * @param {string} id 
 * @param {number} index 
 */
function addNewColorToCategory(id, index) {
    colorNewCategory = index;
    document.getElementById('color-input').value = 1;
    toggleClassList(id, 'color-outer-circle-clicked');
    checkIfColorBtnIsClicked();
    disableOtherColorBtns();
}

// Date Inputfield

/**
 * Function to set date of due date to today
 * 
 */
function renderDate() {
    let date = document.getElementById('date');
    if (date) date.valueAsDate = new Date();
}


// help function


/**
 * Function to fill a hidden Inputfield with content
 * 
 * @param {string} id 
 */
function fillHiddenInputField(id) {
    document.getElementById(id).value = 't';
}


/**
 * function to show a user response
 * @param {string} id 
 */
function showUserResponseOverlay(id) {
    removeClassList(id, 'd-none');
    setTimeout(addClassList, 3000, id, 'd-none');
}


/**
 * shows a user response and request to pick a color
 */
function colorPickerError() {
    let text = 'Please pick a color';
    userResonse(text, 'addtask-user-response-overlay', 'addtask-user-response-overlay-text');
}


/**
 * shows a user response and request to enter a name for new category
 */
function newCategoryError() {
    let text = 'Please enter the name of new category';
    userResonse(text, 'addtask-user-response-overlay', 'addtask-user-response-overlay-text');
}


function showUserResponseInviteContact() {
    let text = 'An inivitation has been sent via email';
    userResonse(text, 'addtask-user-response-overlay', 'addtask-user-response-overlay-text');
}


/**
 * Function checks if the current Account is a Guest or a real Account
 * 
 * @param {string} user 
 * @returns true if the current Account is not a Guest, otherwise it is returned false
 */
function notGuestAccount(user) {
    if (user.fullname !== 'Guest Account') return true;
    return false;
}


/**
 * This function gets the Date of the Task and transforms it into a string, European Standard Time
 * 
 * @param {string} originFormatDate 
 * @returns the date as a string in European Standard Time
 */
function changeDateFormat(originFormatDate) {
    let day = originFormatDate.slice(8, 10);
    let month = originFormatDate.slice(5, 7);
    let year = originFormatDate.slice(0, 4);
    return `${day}.${month}.${year}`
}


/**
 * Functions to get the Member of the Array currentMember at position i and get the Charakter at position 0.
 * 
 * @param {number} i 
 * @returns the first Letter of the Name
 */
function getFirstletterOfName(i) {
    let letter = currentMembers[i].charAt(0);
    return letter;
}


/**
 * Function to split the full name of Member from Array currentMember at the position of whitespace and create the array result with First name, '', Last Name.
 * 
 * @param {number} i 
 * @returns the first Charakter from the string result at position 2
 */
function getSecondletterOfName(i) {
    const result = currentMembers[i].split(/(\s+)/);
    return typeof result[2] !== 'undefined' ? result[2].charAt(0) : '';
}

/**
 * Function to clear the MemberAvatar area and fill it with all assigned Members from the Array currentMembers
 * 
 */
 function renderAssignedToMemberAvatare() {
    let assignedToOutput = document.getElementById('assignedTo-avatare-container');
    assignedToOutput.innerHTML = '';
    for (let i = 0; i < currentMembers.length; i++) {
        let member = currentMembers[i];
        let firstletter = getFirstletterOfName(i);
        let secondLetter = getSecondletterOfName(i);
        let color = getColorOfCurrentMember(member);
        assignedToOutput.innerHTML += renderAssignedToMemberAvatareTemplate(firstletter, secondLetter, color);
    }
}


/**
 *Function to get the definied Color of a specific member from array userInformation
 *  
 * @param {string} member 
 * @returns the color from the array allContacts
 */
function getColorOfCurrentMember(member) {
    for (let i = 0; i < allContacts.length; i++) {
        let user = allContacts[i];
        if (member == user.fullname) return user.color;
    }
}


/**
 * Function to check if the assigned Member is already assigned and part of Array currentMembers
 * 
 * @param {string} user 
 * @returns true if the full name of a assigned member is already in Array currentMembers
 */
function checkIfUserIsAlreadyAssigned(user) {
    if (currentMembers.includes(user.fullname)) return true;
    return false;
}


/**
 * Function to show the Colorpicker-Bar when clicking on "New Category"
 * 
 */
function changeIconsInCategory() {
    document.getElementById('category').innerHTML = renderNewCategoryInput();
    removeClassList('colorpicker', 'd-none');
    addClassList('colorpicker', 'd-flex');
    toggleClassList('categories', 'd-none');
}


function changeIconsInAssignedTo() {
    document.getElementById('outputbox').innerHTML = renderInviteContact();
}


/**
 * checks if data already exist in checkCurrentAddTaskData
 */
function checkCurrentAddTaskData() {
    if (currentAddTaskData.invite) {
        fillAddTaskFields();
    }
}

/**
 * After invitation of new user value of title, description, assignedTo-input, category and choosen members will be filled
 * 
 */
async function fillAddTaskFields() {
    document.getElementById('title').value = currentAddTaskData.title;
    document.getElementById('description').value = currentAddTaskData.description;
    document.getElementById('assignedTo-input').value = 't';
    fillAddTaskCategoryFields();
    addMembersEmailToArray();
    await deleteCurrentAddTaskData();
    showUserResponseInviteContact();
}


async function deleteCurrentAddTaskData() {
    currentAddTaskData = {};
    await backend.setItem('currentAddTaskData', JSON.stringify(currentAddTaskData));
}

/**
 * gets Email of saved members in currentAddTaskData 
 * 
 */
function addMembersEmailToArray(mail) {
    let memberEmails = [];
    if(mail){
        currentMembers = [];
        memberEmails.push(mail);
    } else {

        for (let i = 0; i < currentAddTaskData.members.length; i++) {
            let member = currentAddTaskData.members[i];
            for (let j = 0; j < allContacts.length; j++) {
                let contact = allContacts[j];
                if (member == contact.fullname) memberEmails.push(contact.mail);
            }
        }
    }
    addMembersToAddTask(memberEmails);
}

/**
 * checkboxes of members part of memberEmails are checked and avatars are created
 * Invited contact is rendered
 * 
 * @param {array} memberEmails 
 */
function addMembersToAddTask(memberEmails) {
    for (let i = 0; i < memberEmails.length; i++) {
        let email = memberEmails[i];
        let id = 'checkbox-' + email;
        if (id) {
            document.getElementById(id).checked = true;
            addAssignedToMembers(email);
        }
    }
    // document.getElementById('invited-member').innerHTML = renderInvitedMail(currentAddTaskData.invite);
    // invitedContact = currentAddTaskData.invite;
}


/**
 * checks if inputfield of invite contact includes an @ to be sure it's
 * an email adress, calls function to set values in inputfields and calls
 * function to save previous data in add task on server
 */
async function setInputForInviteContact() {
    let mailInput = document.getElementById('invite-contact').value;
    if (mailInput.includes('@')) {
        setInputValues(mailInput);
        await savePreviousAddTaskData(mailInput);
        document.getElementById('invite-btn').click();
    }
}


/**
 * sets value of hidden inputfield for sending invitation mail to new contact
 * @param {String} mailInput inputfield-value for invite contact 
 */
function setInputValues(mailInput) {
    document.getElementById('invite-input').value = mailInput;
}


/**
 * saves already existing data in addtask, because page will be reload after
 * sending invitation email
 */
async function savePreviousAddTaskData(mailInput) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category-input').value;
    currentAddTaskData = { title: title, description: description, category: category, members: currentMembers, invite: mailInput };
    await backend.setItem('currentAddTaskData', JSON.stringify(currentAddTaskData));
}

