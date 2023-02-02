let activeContactIndex;
let animation = false;
let allContacts;

async function initContacts() {
    await loadDataFromServer()
    await init();
    await includeHTML('include-addtask-html');
    renderProfileImage(); // image in the header for active User
    findOutContacts();
    createLetterContainer();
    renderCategoriesInHTML();
    renderAssignableMembersInHTML();
    changeClassListMenuLinks('contacts');
}



function findOutContacts() {
    allContacts = userInformation.filter((e) => {
        return e.fullname !== "Guest Account"
    })
}

/**
 * gets the first Letter of every user, then remove all double Letters and sort them 
 */
function createLetterContainer() {
    const firstletters = [];
    for (let i = 0; i < allContacts.length; i++) {
        const firstLetter = getFirstLetterOfName(allContacts, i);
        firstletters.push(firstLetter);
    }
    let firstlettersUnique = removeDoubleLetters(firstletters);
    firstlettersUnique = sortLetters(firstlettersUnique);
    renderLetterContainer(firstlettersUnique, allContacts);
}


function sortLetters(firstlettersUnique) {
    return firstlettersUnique.sort();
}


function removeDoubleLetters(firstletters) {
    let unique = [...new Set(firstletters)];
    return unique;
}

/**
 * render a HTML area for every contact
 * 
 * @param {Array} firstlettersUnique 
 * @param {Array} contacts 
 */
function renderLetterContainer(firstlettersUnique, contacts) {
    let contactContainer = clearContactContainer();
    let contactContainerMobile = clearContactContainerMobile();
    for (let i = 0; i < firstlettersUnique.length; i++) {
        let letter = firstlettersUnique[i];
        contactContainer.innerHTML += renderLetterContainerTemplate(letter);
        contactContainerMobile.innerHTML += renderLetterContainerMobileTemplate(letter);
    }
    getInformationToRenderContacts(contacts);
}


function clearContactContainer() {
    let contactContainer = document.getElementById('contact-content');
    contactContainer.innerHTML = '';
    return contactContainer;
}


function clearContactContainerMobile() {
    let contactContainerMobile = document.getElementById('contact-content-mobile');
    contactContainerMobile.innerHTML = '';
    contactContainerMobile.innerHTML = renderNewContactBtn();
    return contactContainerMobile;
}

/**
 * getting all contact information and render the contact area
 * 
 * @param {Array} contacts 
 */
function getInformationToRenderContacts(contacts) {
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i].fullname;
        let email = contacts[i].mail;
        let color = contacts[i].color;
        let firstLetter = getFirstLetterOfName(contacts, i);
        let secondLetter = splitFullnameSecondLetter(contacts, i);
        renderContacts(name, email, firstLetter, secondLetter, color);
    }
}


function renderContacts(name, email, firstLetter, secondLetter, color) {
    let contactCard = document.getElementById(`contact-card-${firstLetter}`);
    let contactCardMobile = document.getElementById(`contact-card-mobile-${firstLetter}`);
    contactCard.innerHTML += renderContactsTemplate(name, email, firstLetter, color, secondLetter);
    contactCardMobile.innerHTML += renderContactsMobileTemplate(name, email, firstLetter, color, secondLetter);
}


//contact detail overview
function showContactDetails(id) {
    removeBgStyleForAllContacts();
    addClassList(id, 'clickedContact');
    for (let i = 0; i < allContacts.length; i++) {
        let contactMail = allContacts[i].mail;
        if (id == contactMail) {
            getContactDetails(i);
        }
    }
}

/**
 * render the contact detail overview
 * @param {number} i 
 */
function getContactDetails(i) {
    let animationContact = checkIfContactWasAlreadyClicked();
    let firstLetter = getFirstLetterOfName(allContacts, i);
    let secondLetter = splitFullnameSecondLetter(allContacts, i);
    let name = allContacts[i].fullname;
    let email = allContacts[i].mail;
    let color = allContacts[i].color;
    let phone = allContacts[i].phone;
    document.getElementById('contact-data-content').innerHTML = renderContactDetails(firstLetter, secondLetter, name, email, color, phone, animationContact);
    document.getElementById('mobile-contact-btn-container').innerHTML = renderContactMobileBtnTemplate(email);
}


function showContactDetailsMobile(id) {
    document.getElementById('contact-content-mobile').style.display = 'none';
    document.getElementById('overlayLeft').style.display = 'none';
    showContactDetails(id);
    document.getElementById('right-section').style.display = 'flex';
    addClassList('new-contact-btn-mobile', 'd-none');
}


function returnToContactOverview() {
    document.getElementById('overlayLeft').style.display = 'block';
    document.getElementById('contact-content-mobile').style.display = 'flex';
    document.getElementById('right-section').style.display = 'none';
}


function splitFullnameSecondLetter(contacts, i) {
    const result = contacts[i].fullname.split(/(\s+)/);
    return typeof result[2] !== 'undefined' ? result[2].charAt(0) : '';
}


function getFirstLetterOfName(contacts, i) {
    let letter = contacts[i].fullname.charAt(0).toUpperCase();
    return letter;
}


function checkIfContactWasAlreadyClicked() {
    if (animation) {
        return '';
    } else {
        animation = true;
        return 'animateFadeIn';
    }
}


function removeBgStyleForAllContacts() {
    for (let i = 0; i < allContacts.length; i++) {
        let contactId = allContacts[i].mail;
        removeClassList(contactId, 'clickedContact');
    }
}


//for new and edit contact overlays
function showOverlayContact(idToShow, idToAnimate, id) {
    if (idToShow == 'edit-contact') {
        getDataToEditContact(id);
    }
    setAnimationClassLists(idToShow, idToAnimate);
}


function closeOverlayContact(idToHide, idToAnimate) {
    addClassList(idToHide, 'animateOpacityOut');
    addClassList(idToAnimate, 'animateFadeOut');
    setTimeout(addClassList, 500, idToHide, 'd-none');
}

function closeUserResponse(idToHide, idToAnimate) {
    addClassList(idToHide, 'animateOpacityOut');
    addClassList(idToAnimate, 'animateFadeOutBottom');
    setTimeout(addClassList, 500, idToHide, 'd-none');
}

function showUserResponse(idToShow, idToAnimate) {
    removeClassList(idToAnimate, 'animateFadeOutBottom');
    removeClassList(idToShow, 'animateOpacityOut');
    addClassList(idToShow, 'animateOpacityIn');
    addClassList(idToAnimate, 'animateFadeInBottom');
    removeClassList(idToShow, 'd-none');
    setTimeout(removeClassList, 500, idToAnimate, 'animateFadeIn');
    setTimeout(() => {
        closeUserResponse(idToShow, idToAnimate)
    }, 2000);
}


function setAnimationClassLists(idToShow, idToAnimate) {
    removeClassList(idToAnimate, 'animateFadeOut');
    removeClassList(idToShow, 'animateOpacityOut');
    addClassList(idToShow, 'animateOpacityIn');
    addClassList(idToAnimate, 'animateFadeIn');
    removeClassList(idToShow, 'd-none');
    setTimeout(removeClassList, 500, idToAnimate, 'animateFadeIn');
}


// new contact
async function newContact() {
    let name = document.getElementById('newContact-name');
    let email = document.getElementById('newContact-email');
    let phone = document.getElementById('newContact-phone');
    let color = getRandomColor();
    addNewContactToArray(name, email, phone, color);
}

/**
 * new contact gets pushed to the backend
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {number} phone 
 * @param {string} color 
 */
async function addNewContactToArray(name, email, phone, color) {
    const contact = { 
        'fullname': name.value
        ,'mail': email.value
        ,'phone': phone.value
        ,'color': color 
    };
    userInformation.push(contact);
    await backend.setItem('userInformation', JSON.stringify(userInformation));
    await initContacts();
    clearNewContactInputfields(name, email, phone);
    closeOverlayContact('new-contact', 'new-contact-overlay');
    showUserResponse('contact-user-response-overlay', 'userResponseFromBottom');
    document.getElementById('contact-user-response-overlay-text').innerHTML = 'Contact successfully created';
}


function createNewContactResponse(text) {
    userResonse(text, 'contact-user-response-overlay', 'contact-user-response-overlay-text');
}


function clearNewContactInputfields(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}


//edit contact


/**
 * sets data of choosed contact in inputfields in edit contact overlay
 * 
 * @param {string} id 
 */
function getDataToEditContact(id) {
    for (let i = 0; i < allContacts.length; i++) {
        let contact = allContacts[i];
        if (id == contact.mail) {
            activeContactIndex = i;
            showDataInEditContact(contact);
            setUserInitials(i);
        }
    }
}


/**
 * calls function to read and to save edited contact information
 * sends changed array to server
 */
async function saveEditedContact() {
    closeOverlayContact('edit-contact', 'edit-contact-overlay');
    let email = readEditedContactData();
    await backend.setItem('userInformation', JSON.stringify(userInformation));
    await initContacts();
    showContactDetails(email);
    showUserResponse('contact-user-response-overlay', 'userResponseFromBottom');
    document.getElementById('contact-user-response-overlay-text').innerHTML = 'Contact successfully edited';
    // createNewContactResponse('contact successfully edited');
}

function setUserInitials(i) {
    const firstLetter = getFirstLetterOfName(allContacts, i);
    const secondLetter = splitFullnameSecondLetter(allContacts, i);
    document.getElementById('initialsEditContact').innerHTML = `${firstLetter}${secondLetter}`;
    document.getElementById('initialsEditContact').style.background = allContacts[i].color
}


/**
 * reads data of inputfields in edit contact overlay
 * @returns contact email (also id in html to show contact details)
 */
function readEditedContactData() {
    const name = document.getElementById('editContact-name').value;
    const email = document.getElementById('editContact-email').value;
    const phone = document.getElementById('editContact-phone').value;
    saveEditedContactDataInArray(name, email, phone);
    return email;
}


/**inviteContact
 * shows data of current contact, which should be change, in inputfields
 * in edit contact overlay
 * @param {object} contact 
 */
function showDataInEditContact(contact) {
    document.getElementById('editContact-name').value = contact.fullname;
    document.getElementById('editContact-email').value = contact.mail;
    document.getElementById('editContact-phone').value = contact.phone;
}


/**
 * saves edited contact data in array userInformation
 * @param {string} name 
 * @param {string} email 
 * @param {string} phone 
 */
function saveEditedContactDataInArray(name, email, phone) {
    userInformation[activeContactIndex + 1].fullname = name;
    userInformation[activeContactIndex + 1].mail = email;
    userInformation[activeContactIndex + 1].phone = phone;
}

function inviteContact() {
    console.log('Success');
}