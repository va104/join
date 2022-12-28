let userInformation;
let contactColors;
let allTasks = [];
let allCategories = [];

let priority = [
    {
        "level": "urgent",
        "toggle": false,
        "img-normal": "./assets/img/add_task/arrow_urgent.svg",
        "img-choosed": "./assets/img/add_task/arrow_urgent_white.svg",
    },
    {
        "level": "medium",
        "toggle": false,
        "img-normal": "./assets/img/add_task/medium.svg",
        "img-choosed": "./assets/img/add_task/medium_white.svg",
    },
    {
        "level": "low",
        "toggle": false,
        "img-normal": "./assets/img/add_task/arrow_low.svg",
        "img-choosed": "./assets/img/add_task/arrow_low_white.svg",
    }
];

let taskAmount = {
    "toDo": 0,
    "progress": 0,
    "feedback": 0,
    "done": 0,
    "total": 0,
    "urgent": 0,
    "urgentDate": [],
}


function renderContactDetails(firstLetter, secondLetter, name, email, color, phone, animationContact) {
    return `
    <div id="contact-detail-data-container" class="${animationContact} d-flex flex-column" >
            <div class="contact-card-big d-flex ">
                        <img class="back-mobile curserPointer filter-plus-img" src="./assets/img/add_task/arrow-left-line.png" alt="" onclick="returnToContactOverview()">
                        <div
                            class="contact-avatar-outer-big bg-contact-blue d-flex align-items-center justify-content-center">
                            <div id="names-letter"
                                class="contact-avatar-big d-flex align-items-center justify-content-center" style="background: ${color}">
                                ${firstLetter}${secondLetter}
                            </div>
                        </div>
                        <div class="contact-data-big">
                            <p id="contact-name-big" class="contact-name-big">${name}</p>
                            <div class="add-task d-flex curserPointer" onclick="openAddTaskForm('toDo', ['${email}'])">
                                <img src="./assets/img/buttons/add_light_blue.svg" alt="">
                                <p class="blue-font">Add task</p>
                            </div>
                        </div>
                    </div>
                    <div id="contact-information-headline" class="d-flex align-items-center justify-content-space-between m-top-50">
                        <span class="f-21">Contact Information</span>
                        <div class="d-flex align-items-center edit-container" onclick="showOverlayContact('edit-contact', 'edit-contact-overlay', '${email}')">
                            <img class="edit-img" src="./assets/img/buttons/edit_blue.png" alt="">
                            <p class="f-18 m-left-8">Edit Contact</p>
                        </div>
                    </div>

                    <div id="contact-content-mail" class="d-flex flex-column justify-content-center f-18 m-top-50">
                        <span><b>Email</b></span>
                        <a class="mailto-big f-18 m-top-20"
                            href="mailto:${email}">${email}</a>
                    </div>

                    <div id="phone" class="d-flex flex-column justify-content-center f-18 m-top-28">
                        <span><b>Phone</b></span>
                        <a class="f-18 color-black m-top-20" href="tel:+491743451698">${phone}</a>
                    </div>
            </div>      
    </div>          
    `
}


function renderContactMobileBtnTemplate(email) {
    return `
    <button id="new-contact-btn-mobile" class="darkblue-btn m-left-24"
        onclick="showOverlayContact('new-contact', 'new-contact-overlay')">
        <span class="f-18">New Contact</span>
        <img class="btn-icons-contact" src="./assets/img/buttons/newcontact.png" alt="">
    </button>
    <button id="edit-contact-mobile" class="darkblue-btn m-left-24 d-none"
        onclick="showOverlayContact('edit-contact', 'edit-contact-overlay', '${email}')">
        <img src="./assets/img/add_task/edit_white.png" alt="">
    </button>
    `
}

function renderContactsTemplate(name, email, firstLetter, color, secondLetter) {
    return `
    <div id="${email}" class="contact-card-small d-flex scroll" onclick="showContactDetails('${email}')">
    <div
        class="contact-avatar-outer d-flex align-items-center justify-content-center">
        <div
            class="contact-avatar d-flex align-items-center justify-content-center" style="background: ${color}">
            ${firstLetter}${secondLetter}
        </div>
    </div>
    <div class="contact-data">
        <p class="contact-name">${name}</p>
        <a class="mailto"
            >${email}</a>
    </div>
</div>
    `;
}

function renderContactsMobileTemplate(name, email, firstLetter, color, secondLetter) {
    return `
    <div id="${email}" class="contact-card-small d-flex scroll" onclick="showContactDetailsMobile('${email}')">
    <div
        class="contact-avatar-outer d-flex align-items-center justify-content-center">
        <div
            class="contact-avatar d-flex align-items-center justify-content-center" style="background: ${color}">
            ${firstLetter}${secondLetter}
        </div>
    </div>
    <div class="contact-data">
        <p class="contact-name">${name}</p>
        <a class="mailto"
            >${email}</a>
    </div>
</div>
    `;
}


function renderLetterContainerTemplate(letter) {
    return `
    <div id="contact-letter-${letter}" class="contact-letter w-80 d-flex align-items-start flex-column">
    <span>${letter}</span>
    <div id="contact-card-${letter}" class="contact-card-small-container">
    </div>
     </div>
    `;
}


function renderLetterContainerMobileTemplate(letter) {
    return `
    <div id="contact-letter-mobile-${letter}" class="contact-letter w-80 d-flex align-items-start flex-column">
    <span>${letter}</span>
    <div id="contact-card-mobile-${letter}" class="contact-card-small-container">
    </div>
     </div>
    `;
}

function renderSingleCard(id, title, description, category, color, subtask) {
    return `
    <div id="card-${id}" draggable="true" ondragstart="startDragging(${id})" onclick="openDialog('${id}')" class="card board-inner-card d-flex flex-column m-top-28">
    <span class="board-text board-category ${color}">${category}</span>
    <span class="board-text board-title">${title}</span>
    <span class="board-text board-description description-scroll">${description}</span>
    <div id=progressBarContainer style="width: 100%">
     ${createProgressBar(subtask, id)}   
     
     <div id="assigned-${id}" class="board-text board-assigned d-flex justify-content-space-between align-items-center">
     <div id="assigned-area-${id}" class="assigned-area d-flex"></div>
        <div class="board-assigned-urgent"><img m-right-25 id="prio-${id}" src=""> </div>
        </div>

    <div id="board-mobile-menu-superior-${id}" class="board-mobile-menu d-none">
        <div class="mobile-nav mobile-nav-above" onclick="getSubTaskData(${id})">Open Details</div>
        <div id="board-mobile-menu-${id}" class="mobile-nav pos-relative d-flex justify-content-start board-mobile-menu-with-img" onclick="openBoardMobileAsideMenu(${id}, event)">Move to
            <div><img src="./assets/img/add_task/dropdown_arrow.svg" alt="" class="board-mobile-menu-img"></div>
            <div id="board-mobile-aside-menu-${id}" class="board-mobile-menu-aside d-none">
                <div class="mobile-nav mobile-aside-nav-above" onclick="moveTaskTo(${id}, 'toDo', event)">To do</div>
                <div class="mobile-nav" onclick="moveTaskTo(${id}, 'progress', event)">In Progress</div>
                <div class="mobile-nav" onclick="moveTaskTo(${id}, 'feedback', event)">Feedback</div>
                <div id="nav-item-logout" class="mobile-nav" onclick="moveTaskTo(${id}, 'done', event)">Done</div>
            </div>
        </div>
    <div class="mobile-nav" onclick="deleteTaskFromMobileMenu(${id}, event)">Delete</div>
    <div id="nav-item-logout" class="mobile-nav" onclick="editTaskFromMobileMenu(${id}, event)">Edit</div>
    </div>
    </div>
    </div>
`
}


function renderProgressbarArea(id, numberOfSubtasks, numberOfFinishedSubtasks) {
    return `
        <div class="progressbar-inner" role="progressbar">
        <div id="bar-${id}" class="bar"></div>
        </div>
            <div class="subtasks d-flex text-align-center">
                <span class="f-12 ">${numberOfFinishedSubtasks}/${numberOfSubtasks} Done</span>
            </div>
    `
}

function renderMembersOfTaskArea(id) {
    return `
    <div class="assigned-outer">
        <div id="first-member-${id}" class="assigned-inner p-3 d-flex justify-content-center align-items-center"></div>
    </div>
    `
}

function renderAdditionalMembers(memberOfInitialArray, id, i) {
    return `
    <div class="assigned-outer position-circle">
        <div id="other-member-${id}-${i}" class="assigned-inner p-3 d-flex justify-content-center align-items-center relative">${memberOfInitialArray}</div>
    </div>
    `
}

function renderDisplay(id) {
    return `
    <div id="display-${id}" class="task-overlay d-flex d-none scroll" onclick="event.stopPropagation()"></div>
    `
}

function renderDisplayContent(id, title, description, category, date, color) {
    return `
            <div id="display-content-${id}" class="display-card w-100 d-flex">
                <div class="display-inner-card m-left-25 m-right-25 d-flex flex-column">
                    <!-- Close button -->
                    <div class="w-100 d-flex justify-content-end">
                    <img class="m-right-24 m-top-20 cursor" onclick="closeDialog(${id})" src="./assets/img/buttons/close.png">
                    </div>
                    <!-- Headlines -->
                    <span class="display-text display-category ${color}">${category}</span>
                    <span class="display-text display-title">${title}</span>
                    <span class="display-text display-description">${description}</span>

                    <div class="d-flex flex-column display-text">
                        <span class="f-bold m-bottom-5 display-size">Subtasks:</span>
                        <div id="subtasks-display-${id}" class="d-flex flex-column display-size scroll display-subtask">
                        </div>
                    </div>

                    <div class="d-flex display-text display-size">
                        <span class="f-bold">Due date: </span>
                        <span class="m-left-8">${date}</span>
                    </div>

                    <div class="d-flex display-text align-items-center display-size">
                        <span class="f-bold">Priority: </span>
                        <span class="m-left-8">
                            <div id="prio-display-field-${id}" class="input-with-image inputfields-small border-fields d-flex justify-content-center align-items-center disabled">
                            <p id="prio-display-name-${id}" class="f-18"></p>
                            <img id="prio-img-${id}" class="p-12" src="./assets/img/add_task/arrow_urgent_white.svg" alt="">
                        </div></span>
                    </div>

                    <div id="assigned-display-area-${id}" class="d-flex flex-column board-text"></div>


                    <!-- Edit button -->
                    <div class="w-100 d-flex justify-content-space-between">
                    <button id="delete-button" onclick="openDeleteWindow()" class="darkblue-btn m-bottom-18 d-flex justify-content-center align-items-center ">
                    <span>Delete Task<span>
                    </button>
                    <button onclick="editTask(${id})" class="darkblue-btn m-bottom-18 m-right-24 d-flex justify-content-center align-items-center edit-btn-board">
                    <img class="cursor" src="./assets/img/buttons/edit.png">
                    </button>
                    </div>
                </div>
            </div>
    `
}

function renderDeleteDisplay(id) {
    return `
    <div class="deleteCard m-left-250 h-15 p-25 card d-flex flex-column align-items-center justify-content-space-between">
    <span class="display-description m-top-20 text-center">Are you sure that the task can be deleted?</span>
    <div class="d-flex justify-content-around w-100">
        <button onclick="deleteMessage(${id})"
            class="deleteButton darkblue-btn d-flex justify-content-center align-items-center ">
            <span>Yes<span>
        </button>
        <button onclick="closeDeleteWindow()"
            class="deleteButton darkblue-btn d-flex justify-content-center align-items-center ">
            <span>No<span>
        </button>
    </div>
</div>    
    `
}


function renderMembersOfTaskAreaDisplay(id) {
    return `
        <span class="f-bold display-size">Assigned To:</span>
        <ul id="assigned-list-${id}">
            <li class="d-flex align-items-center">
                <div class="assigned-outer">
                    <div id="first-member-display-${id}" class="assigned-inner d-flex justify-content-center align-items-center display-size"></div> 
                </div>
                <span id="first-member-name-display-${id}" class="m-left-8"></span>
            </li>
        </ul>
        <div id="invited-member-board" class="d-flex"></div>
    `
}

function renderAdditionalMembersDisplay(memberOfInitialArray, id) {
    return `
        <li class="d-flex align-items-center">
            <div class="assigned-outer position-circle">
                <div id="other-member-display-${id}"
                    class="assigned-inner d-flex justify-content-center align-items-center display-size">
                    ${memberOfInitialArray}
                </div>
            </div>
                <span id="other-member-name-display-${id}" class="m-left-8"></span>
        </li>
    `
}

function renderDragContainer(status) {
    return `
        <div id="${status}-dragcard" class="drag-card d-none card board-inner-card m-top-28 m-right-15"></div>
    `
}

function renderSubTasks(id, i, title, description, category, date, prio, displaysubtask) {
    return `
    <div>
    <input id="checkbox-${id}-${i}" type="checkbox" onclick="checkboxToggle('${id}', '${i}', '${title}', '${description}', '${category}', '${date}', '${prio}', '${displaysubtask}')">
    <label for="checkbox-${id}-${i}" id="subtask-${id}-${i}" class="m-bottom-5 m-left-8">${displaysubtask}</label>
    </div>
    `
}


function renderNewContactBtn() {
    return `
    <div id="contact-create-btn-mobile" class="d-flex justify-content-end new-contact-btn-container">
    <button id="new-contact-btn" class="darkblue-btn m-left-24"
        onclick="showOverlayContact('new-contact', 'new-contact-overlay')">
        <span class="f-18">New Contact</span>
        <img class="btn-icons-contact" src="./assets/img/buttons/newcontact.png" alt="">
    </button>
</div>
    `;
}


function renderNewSubTaskInput() {
    return `
    <div class="d-flex subtask-switch-container">
       <input id="subtask-input" class="inputfield-nearby-icon" autofocus type="text" placeholder="Add new Subtask">
       <img class="subtask-cancel-img filter-plus-img" src="./assets/img/add_task/cancel.png" alt="" onclick="clearSubtaskInput()">
       <img class="subtask-check-img filter-plus-img" src="./assets/img/add_task/check.png" alt="" onclick="addNewSubtask()">
    </div>
`
}


function clearSubtaskInput() {
    document.getElementById('subtasks-container').innerHTML = `
    <div class="output-container d-flex justify-content-space-between">
    <input id="subtask-input" class="inputfield-nearby-icon" type="text" placeholder="Add new Subtask" onfocus="changeIconsInSubtasks()">
    <img src="./assets/img/add_task/add.svg" alt="" onclick="changeIconsInSubtasks()">
    </div>
    `
}

function clearCategoryInputTemplate() {
    return `
    <input id="category-input" class="hidden-input" type="text" required>
    <div class="output-container d-flex justify-content-space-between">
        <div id="category-output" class="inputfield-nearby-icon d-flex align-items-center">
        Select task Category
        </div>
        <img id="category-dropdown-arrow" src="./assets/img/add_task/dropdown_arrow.svg" class="filter-plus-img" alt="">
    </div>
    `
}


function renderNewCategoryInput() {
    return `
    <div class="d-flex subtask-switch-container">
       <input id="category-input" class="inputfield-nearby-icon" autofocus type="text" placeholder="Add new Category" value="" required>
       <input id="color-input" class="hidden-input" type="number" required>
       <img class="subtask-cancel-img filter-plus-img" src="./assets/img/add_task/cancel.png" alt="" onclick="clearCategoryInput()">
       <img class="subtask-check-img filter-plus-img" src="./assets/img/add_task/check.png" alt="" onclick="addNewCategory()">
    </div>
`
}

function renderStaticCategorieContent() {
    return `
    <li id="newCategory" onclick="changeIconsInCategory()">New Category</li>
    `
}

function renderCategoriesInHTMLTemplate(id, name, color) {
    return `
    <li id="${id}" onclick="changeValue('${id}')"
         class="d-flex align-items-center">
         <div>${name}</div>
         <div class="category-color ${color}">
    </li>
    `
}


function renderSubtask(i, inputSubtask) {
    return `
    <div class="d-flex">
        <input id="${inputSubtask}-${i}" type="checkbox" onclick="checkSubtask('${inputSubtask}')" checked>
        <p class="checkbox-text">${inputSubtask}</p>
    </div>`
}


function renderYouInAssignedTo(id){
    return `
    <li id="assignedto-${id}" onclick="addAssignedToMembers('${id}')">
        <div class="d-flex justify-content-space-between align-items-center">
        <label for="checkbox-${id}">You</label>
        <input id="checkbox-${id}" class="m-right-15 assignedTo-checkboxes" type="checkbox">
        </div>
    </li>
    `;
}

function renderAssignedToMembersTemplate(id, name) {
    return `
    <li id="assignedto-${id}" onclick="addAssignedToMembers('${id}')">
        <div class="d-flex justify-content-space-between align-items-center">
            <label for="checkbox-${id}">${name}</label>
            <input id="checkbox-${id}" class="m-right-15 assignedTo-checkboxes" type="checkbox">
        </div>
    </li> `
}

function renderInviteNewContactTemplate(){
    return `
    <li>
        <div class="d-flex justify-content-space-between align-items-center" onclick="changeIconsInAssignedTo()">
             <span>Invite new contact</span>
            <img class="m-right-8" src="./assets/img/add_task/member.png" alt="">
        </div>
    </li>
    `
}

function renderInviteContact() {
    return `
    <div class="d-flex subtask-switch-container">
       <input id="invite-contact" class="inputfield-nearby-icon" autofocus type="email" placeholder="Invite new Contact">
       <input id="assignedTo-input" class="hidden-input" type="text" required>
       <img class="subtask-cancel-img filter-plus-img" src="./assets/img/add_task/cancel.png" alt="" onclick="clearAssignedToInput()">
       <img class="subtask-check-img filter-plus-img" src="./assets/img/add_task/check.png" alt="" onclick="setInputForInviteContact()">
    </div>
    `
}

function clearAssignedToInputTemplate() {
    return `
    <input id="assignedTo-input" class="hidden-input" type="text" required>
    <div class="output-container d-flex justify-content-space-between">
        <div id="user-assignedTo" class="inputfield-nearby-icon d-flex  flex-column">Select
            contacts to assign</div>
        <img src="./assets/img/add_task/dropdown_arrow.svg" class="filter-plus-img" alt="">
    </div>
    `
}


function renderAssignedToMemberAvatareTemplate(firstLetter, secondLetter, color){
    return `
    <div class="contact-avatar-outer d-flex align-items-center justify-content-center">
        <div
            class="contact-avatar d-flex align-items-center justify-content-center" style="background: ${color}">
            ${firstLetter}${secondLetter}
        </div>
    </div>`
}


function renderInvitedMail(email){
    return `
    <p>${email}</p>
    <p class="m-left-24 color-red">Pending Invitation</p>
    `
}