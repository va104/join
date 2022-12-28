let currentCategory;
let currentPrio;
let currentMembers = [];
let currentSubTasks = [];
let colorNewCategory = -1;
let colorBtnIsClicked = false;
let boardStatus = 'toDo';
let invitedContact = 'none';
let completeNewTask = false;

/**
 * Initialisation function to load page AddTask HTML
 * 
 */
async function initAddTask() {
    await loadDataFromServer()
    await init();
    await includeHTML('include-addtask-html');
    await renderAssignableMembersInHTML();
    renderProfileImage();
    renderCategoriesInHTML();
    renderDate();
    checkCurrentAddTaskData();
    completeNewTask = !completeNewTask;
    changeClassListMenuLinks('add_task');
}


/**
 * changes value of category dropdownlist
 * @param {String} value 
 * @param {String} input 
 */
function changeValue(value) {
    clearCategoryInput();
    const content = document.getElementById(value);
    const category = content.firstChild.nextSibling.innerHTML;
    document.getElementById('category-input').value = category;
    document.getElementById('category-output').innerHTML = content.innerHTML;
    currentCategory = value;
}


/**
 * checks if the Task is a new Task or a Task to edit
 * 
 */
function createNewTask() {
    currentId == 'empty' ? getDataForNewTask() : getDataForEditTask();
}

/**
 * get the data input of the form in for the task
 * 
 */
async function getDataForNewTask() {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const category = getCurrentCategory();
    const originFormatDate = document.getElementById('date').value;
    const date = changeDateFormat(originFormatDate);
    await addNewTaskToArray(title, description, category, originFormatDate, date);
}


/**
 * united all information of inputfields in a json,
 * adds it to allTasks and send it to server
 * @param {object} title 
 * @param {object} description 
 * @param {string} category 
 * @param {array} assignedTo //assigned members
 * @param {date} date 
 * @param {string} prio 
 * @param {string} status 
 */
async function addNewTaskToArray(title, description, category, originFormatDate, date) {
    const newTask = returnValuesForTask(title, description, category, originFormatDate, date)
    allTasks.push(newTask);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    clearAddTaskForm(title, description);
    if (activeURL == 'board') {
        setTimeout(closeAddTaskForm, 2000, 'add-task-overlay-board', 'add-task-overlay');
        setTimeout(initTasks, 3200);
    }
    if (activeURL == 'contacts') {
        setTimeout(closeAddTaskForm, 2000, 'add-task-overlay-board', 'add-task-overlay');
    }
    showUserResponse('edittask-added-board-overlay', 'edittask-added-board');
    document.getElementById('edittask-added-board').innerHTML = 'Task successfully created';
}


function returnValuesForTask(title, description, category, originFormatDate, date) {
    return {
        'title': title.value
        , 'description': description.value
        , 'category': category
        , 'member': currentMembers
        , 'invite': invitedContact
        , 'duedate': date
        , 'duedateOrgin': originFormatDate
        , 'prio': currentPrio
        , 'status': boardStatus
        , 'subtasks': currentSubTasks
        , 'finishedsubtasks': []
        , 'complete': false
    };
}


/**
 * Function to get the value of inputfield Subtasks and add this as a variable to the render function
 * 
 */
function changeIconsInSubtasks() {
    document.getElementById('subtasks-container').innerHTML = renderNewSubTaskInput();
}


/**
 * Function to get value of inputfield, push it to an array and render all Subtasks in this Array
 * 
 */
function addNewSubtask() {
    let inputSubtask = document.getElementById('subtask-input').value;
    if (inputSubtask.length >= 3) {
        document.getElementById('subtasks-output').innerHTML = '';
        let outputbox = document.getElementById('subtasks-output');
        addSubtask(inputSubtask);
        showSubtask(outputbox);
        clearSubtaskInput();
    }
}


/**
 * Function to check if a subtask is in array currentSubtasks.
 * If yes, subtask will be removed if checkbox is unchecked. 
 * If no, subtask will be added if checkbox is checked.  
 * 
 * @param {string} subtask 
 */
function checkSubtask(subtask) {
    if (currentSubTasks.includes(subtask)) {
        removeSubtask(subtask)
    } else {
        addSubtask(subtask)
    }
}


/**
 * Function to remove a subtask from position of its index
 * 
 * @param {string} subtask 
 */
function removeSubtask(subtask) {
    let index = currentSubTasks.indexOf(subtask);
    currentSubTasks.splice(index, 1);
}


/**
 * Function to add the subtask to array currentSubtask
 * 
 * @param {string} subtask 
 */
function addSubtask(subtask) {
    currentSubTasks.push(subtask);
}


/**
 * Function to render all Subtasks which are in the Array currentSubTasks
 * 
 * @param {object} outputbox 
 */
function showSubtask(outputbox) {
    for (let i = 0; i < currentSubTasks.length; i++) {
        let subtask = currentSubTasks[i];
        outputbox.innerHTML += renderSubtask(i, subtask);
    }
}


/**
 * transforms first letter of the category to uppercase
 * 
 * @returns the current category, but with first letter uppercase
 * 
 */
function getCurrentCategory() {
    let actualCategory = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    return actualCategory;
}


/**
 * Function to add a new Category when a Color is picked and input field has content
 * 
 */
async function addNewCategory() {
    let input = document.getElementById('category-input');
    checkIfColorIsPicked(input);
}


/**
 * Function to get name of the new category, push it with color to array allCategories and send it to server
 * 
 * @returns the name of the new category
 * 
 */
async function checkIfColorIsPicked(input) {
    if (colorNewCategory < 0) {
        colorPickerError();
    } else if (checkIfCategoryIsEntered(input)) {
        await addNewCategoryToArray(input);
    } else {
        newCategoryError();
    }
    clearNewCategoryInputValue(input);
}


function checkIfCategoryIsEntered(input) {
    const trimmedInput = input.value.trim();
    return trimmedInput.length > 0;
}

/**
 * adds id, input-value & color to allCategories array and sends it to server
 * 
 * @param {object} input 
 * @returns 
 */
async function addNewCategoryToArray(input) {
    const id = input.value.toLowerCase();
    const category = {
        'id': id
        , 'name': input.value
        , 'color': 'bg-category-New-' + colorNewCategory
    }
    allCategories.push(category);
    await backend.setItem('allCategories', JSON.stringify(allCategories));
    clearCategorySection(id);
}


/**
 * clears the categorySection
 * 
 */
async function clearCategorySection(value) {
    clearCategoryInput();
    await renderCategoriesInHTML();
    changeValue(value);
    colorNewCategory = -1;
}



/**
 * Function to add the new Category to the list of categories and render the Template with all categories
 * 
 */
function renderCategoriesInHTML() {
    const categoryList = document.getElementById('categories');
    categoryList.innerHTML = '';
    categoryList.innerHTML += renderStaticCategorieContent();
    for (let i = 0; i < allCategories.length; i++) {
        const id = allCategories[i].id;
        const name = allCategories[i].name;
        const color = allCategories[i].color;
        categoryList.innerHTML += renderCategoriesInHTMLTemplate(id, name, color);
    }
}

/**
 * find out id of saved category in currentAddTaskData 
 * and adds value in outputbox
 */
function fillAddTaskCategoryFields() {
    let id;
    for (let i = 0; i < allCategories.length; i++) {
        let oneCategory = allCategories[i];
        if (oneCategory.name == currentAddTaskData.category) {
            id = oneCategory.id;
        }
    }
    if (id) changeValue(id);
}

/**
 * By clicking outside the overlay display, it will be closed
 * 
 * @param {string} box 
 * @param {string} id 
 */
function dropdown(box, id) {
    const myEle = document.getElementById('category-output');
    if (myEle) {
        toggleClassList(id, 'd-none');
        document.addEventListener('click', function handleClickOutsideBox(event) {
            const area = document.getElementById(box);
            if (!area.contains(event.target))
                addClassList(id, 'd-none')
        })
    }
};



/**
 * When the assignedToSelect area is activated by dropdown menu, 
 * the assignable Member area is created and the InviteContact is added
 * 
 */
function renderAssignableMembersInHTML() {
    findOutContacts();
    let memberList = document.getElementById('assignedToSelect');
    let assignableMembers = Object.assign([], allContacts);
    if (memberList) {
        createAssignableMembers(memberList, assignableMembers);
        // memberList.innerHTML += renderInviteNewContactTemplate();
    }
}

/**
 * Function to check if Account is not a Guest and render the user as "You" in the Assignable Member List,
 * then render all other Users to the AssignedMember List
 * 
 * @param {string} memberList 
 * @param {array} assignableMembers 
 */
function createAssignableMembers(memberList, assignableMembers) {
    let you = userInformation[activeUserIndex];
    if (notGuestAccount(you)) {
        memberList.innerHTML = renderYouInAssignedTo(you.mail);
        let index = assignableMembers.indexOf(you);
        assignableMembers.splice(index, 1);
    }
    for (let i = 0; i < assignableMembers.length; i++) {
        let user = assignableMembers[i];
        memberList.innerHTML += renderAssignedToMembersTemplate(user.mail, user.fullname);
    }
}


/**
 * fills the hidden Inputfield when the lenght of currentMembers array is >= 1
 * otherwise the hidden Inputfield will be cleared
 * 
 */
function fillInputFieldForFormValidation() {
    if (currentMembers.length >= 1)
        fillHiddenInputField('assignedTo-input');
    if (currentMembers.length == 0)
        clearHiddenInputField('assignedTo-input');
}


/**
 * Function to check if the clicked Member is already in Array currentMember.
 * case no: member is added to the Array currentMember and the checkbos is checked. 
 * case yes: member is deleted and the checkbox is unchecked.
 * Afterwards avatar will be rendered and Form Validation is executed.
 * 
 * @param {string} id equals the email adress of the assigned Member
 */
function addAssignedToMembers(id) {
    for (let i = 0; i < allContacts.length; i++) {
        let checkBox = document.getElementById(`checkbox-${id}`);
        let user = allContacts[i];
        if (user.mail == id) {
            if (!checkIfUserIsAlreadyAssigned(user) && checkBox.checked)
                addMemberToArray(user);
            if (checkIfUserIsAlreadyAssigned(user) && !checkBox.checked)
                deleteMemberFromArray(user);
        }
    }
    renderAssignedToMemberAvatare();
    fillInputFieldForFormValidation();
}


/**
 * Function to push fullname of assigned Member to array currentMembers
 * 
 * @param {string} user 
 */
function addMemberToArray(user) {
    currentMembers.push(user.fullname);
}


