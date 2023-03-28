let menulinks = ['summary', 'board', 'add_task', 'contacts', 'imprint', 'privacy',];
let activeUser;
let activeUserIndex;
let activeURL; 
let userIndexForgotPassword;
let currentAddTaskData;
let mobileNavToggle = false;
// import {initDummyContent} from './js/fillDummyContact'

// every 24 hours the function is called to overwrite the content with default values
// setInterval(() => {
//     setDummyContent();
//      console.log('test')
// }, 5000);

async function init() {
    await includeHTML('w3-include-html');
    checkActiveUser();
}

async function loadDataFromServer() {
    setURL('https://vanessa-wuerdinger.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await putLoadedDataToArray()
}

async function initPrivacy() {
    await loadDataFromServer()
    await init();
    await includeHTML('include-addtask-html');
    renderProfileImage();
    changeClassListMenuLinks('privacy');
}

async function initImprint() {
    await loadDataFromServer()
    await init();
    await includeHTML('include-addtask-html');
    renderProfileImage();
    changeClassListMenuLinks('imprint');
}

async function putLoadedDataToArray() {
    userInformation = await JSON.parse(backend.getItem('userInformation')) || [];
    contactColors = await JSON.parse(backend.getItem('contactColors')) || [];
    userIndexForgotPassword = await JSON.parse(backend.getItem('userIndexForgotPassword'));
    allTasks = await JSON.parse(backend.getItem('allTasks')) || [];
    allCategories = await JSON.parse(backend.getItem('allCategories')) || [];
    currentAddTaskData = await JSON.parse(backend.getItem('currentAddTaskData')) || {};
}


/**
 * @param {string} id 
 * @param {string} classList 
 */
function toggleClassList(id, classList) {
    document.getElementById(id).classList.toggle(classList);
}


/**
 * @param {string} id 
 * @param {string} classList 
 */
function addClassList(id, classList) {
    document.getElementById(id).classList.add(classList);
}

function addValue(id, text) {
    document.getElementById(id).value = text;
}

function changeInnerHTML(id, string) {
    document.getElementById(id).innerHTML = string;
}

/**
 * @param {string} id 
 * @param {string} classList 
 */
function removeClassList(id, classList) {
    document.getElementById(id).classList.remove(classList);
}

function mobileNavMenuOpenAndClose() {
    if (mobileNavToggle) {
        closeMobileMenu();
        return;
    }
    if (!mobileNavToggle) openMobileMenu();
}


function openMobileMenu() {
    removeClassList('logout-btn', 'd-none');
    mobileNavToggle = true;
    setAnimationClassLists('empty-container', 'logout-btn');
}


function closeMobileMenu() {
    closeOverlayContact('empty-container', 'logout-btn');
    mobileNavToggle = false;
}


/**
 * fonts and img of active menu link changes color to white
 * @param {string} id 
 */
function changeClassListMenuLinks(activeLink) {
    activeURL = activeLink; 
    for (let i = 0; i < menulinks.length; i++) {
        let menulink = menulinks[i];
        removeClassList(menulink, 'menulink-active');
        removeClassList(`${menulink}-icon`, 'filter-white');
        removeClassList(`${menulink}-text`, 'color-white');
    }
    addClassList(activeLink, 'menulink-active');
    addClassList(`${activeLink}-icon`, 'filter-white');
    addClassList(`${activeLink}-text`, 'color-white');
}


/**
 * gets active user from localstorage
 * and sets it in global variable activeUser
 */
function checkActiveUser() {
    checkIncognitoMode();
    if (activeUser == 'Guest Account') {
        activeUserIndex = 0;
        // activeUserIndex = 2;
    } else {
        checkActiveUserIndex();
    }
}

function checkIncognitoMode() {
    try {
        activeUser = getActiveUserFromLocalStorage('activeUser');
        if (!activeUser) {
            activeUser = 'Guest Account'
        }
    }
    catch (e) {
        console.log(e);
    }
}


/**
 * gets index of active user of json array userInformation
 * and sets it in global variable activeUserIndex
 */
function checkActiveUserIndex() {
    for (let i = 0; i < userInformation.length; i++) {
        let user = userInformation[i];
        let name = user.fullname;
        if (name == activeUser) {
            activeUserIndex = i;
        }
    }
}


/**
 * renders profile img in the header, depending on active user
 */
function renderProfileImage() {
    document.getElementById('profile-pic').src = userInformation[activeUserIndex].img;
}


function checkMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? false : true;
}


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
