let currentDraggedElement;
let search = [];
let projectstatus = ['toDo', 'progress', 'feedback', 'done'];


/**
 * Initialization of HTML-Page Board
 * 
 */
async function initTasks() {
    await loadDataFromServer();
    await init();
    await includeHTML('include-addtask-html');
    renderProfileImage();
    renderCards();
    renderCategoriesInHTML();
    renderAssignableMembersInHTML();
    renderDate();
    changeClassListMenuLinks('board');
}


/**
 * Function to render the Task Area
 * First, Area is cleared. Second all Tasks are loaded from allTask-Array
 * Third, DragContainer for Drag and Drop is created.
 * 
 */
function renderCards() {
    clearCards();
    createCards();
    createDragContainer();
}


/**
 * Function to clear the Task Area
 */
function clearCards() {
    for (let i = 0; i < projectstatus.length; i++) {
        let status = projectstatus[i];
        document.getElementById(`${status}-card`).innerHTML = '';
    }
}


/**
 * Function to get iterate through allTasks-Array
 */
function createCards() {
    for (let i = 0; i < allTasks.length; i++) {
        let singleTask = allTasks[i];
        getTaskDetails(i, singleTask);
    }
}


/**
 * Function to create a Drag Container in every Status Area
 */
function createDragContainer() {
    for (let i = 0; i < projectstatus.length; i++) {
        let status = projectstatus[i];
        document.getElementById(`${status}-card`).innerHTML += renderDragContainer(status);
    }
}


/**
 * Function to get all Task information from JSON Array 
 * Generating differnt parts of a task.
 * 
 * @param {number} i 
 * @param {string} singleTask 
 */
function getTaskDetails(i, singleTask) {
    let title = singleTask.title;
    let description = singleTask.description;
    let category = singleTask.category;
    let date = singleTask.duedate;
    let prio = singleTask.prio;
    let members = getMembers(singleTask);
    let status = singleTask.status;
    let subtasks = singleTask.subtasks;
    let completedsubtasks = singleTask.finishedsubtasks;
    let color = getCategoryColor(category);
    createOverlay(i, title, description, category, date, prio, members, status, subtasks, completedsubtasks, singleTask, color);
}


/**
 * gets the category color for rendering the categories
 */
function getCategoryColor(category) {
    for (let i = 0; i < allCategories.length; i++) {
        const currentCategory = allCategories[i].id;
        if (currentCategory == category.toLowerCase())
            return allCategories[i].color;
    }
}


/**
 * Function to create the Overlay of a single Task
 * 
 * @param {number} i 
 * @param {string} title 
 * @param {string} description 
 * @param {string} category 
 * @param {date} date 
 * @param {string} prio 
 * @param {array} members 
 * @param {string} status 
 * @param {array} subtasks 
 * @param {array} completedsubtasks 
 * @param {object} singleTask 
 */
function createOverlay(i, title, description, category, date, prio, members, status, subtasks, completedsubtasks, singleTask, color) {
    createTask(i, title, description, category, date, status, subtasks, completedsubtasks, color);
    createAssignedMemberArea(members, singleTask, i);
    createPriority(prio, i);
}

/**
 * Function to render the Card with Task information
 * 
 * @param {number} id 
 * @param {string} title 
 * @param {string} description 
 * @param {string} category 
 * @param {date} date 
 * @param {string} status 
 * @param {array} subtasks 
 * @param {array} completedsubtasks 
 */
function createTask(id, title, description, category, date, status, subtasks, completedsubtasks, color) {
    document.getElementById(`${status}-card`).innerHTML += renderSingleCard(id, title, description, category, color, subtasks);
    document.getElementById(`assigned-area-${id}`).innerHTML = renderMembersOfTaskArea(id);
    createSubtaskArea(id, subtasks, completedsubtasks);
}

function createProgressBar(subtask, id){
 return subtask.length > 1 ? 
 `<div id="progressbar-${id}" class="progressbar-outer board-text d-flex align-items-center text-align-center"></div>` 
 : `<div id="progressbar-${id}"></div>`;
}

/**
 * Function to check if there are any subtasks and if yes, render the progressbar
 * 
 * @param {number} id 
 * @param {array} subtasks 
 * @param {array} completedsubtasks 
 */
function createSubtaskArea(id, subtasks, completedsubtasks) {
    if (subtasks == '') {
        return;
    } else {
        let numberOfSubtasks = subtasks.length;
        let numberOfFinishedSubtasks = completedsubtasks.length;
        document.getElementById(`progressbar-${id}`).innerHTML = renderProgressbarArea(id, numberOfSubtasks, numberOfFinishedSubtasks);
        renderBarProgress(id, numberOfSubtasks, numberOfFinishedSubtasks);
        addSeveralClassesForProgressBar(id);
    }
}

function addSeveralClassesForProgressBar(id) {
    document.getElementById(`progressbar-${id}`).classList.add('progressbar-outer', 'board-text', 'd-flex', 'align-items-center', 'text-align-center')
}

/**
 * Function to render the width of a specific bar
 * 
 * @param {number} id 
 * @param {number} numberOfSubtasks 
 * @param {number} numberOfFinishedSubtasks 
 */
function renderBarProgress(id, numberOfSubtasks, numberOfFinishedSubtasks) {
    document.getElementById(`bar-${id}`).style.width = ((numberOfFinishedSubtasks / numberOfSubtasks) * 100) + "%";
}


//TODO
/**
 * Function to check if there are more than one assigned member
 * 
 * @param {array} members 
 * @param {array} singleTask 
 * @param {number} id 
 */
function createAssignedMemberArea(members, singleTask, id) {
    getFirstMember(members, singleTask, id);
    getOtherMembers(members, singleTask, id);
}

/**
 * Function to set the right priority image for the task
 * 
 * @param {string} prio 
 * @param {number} id 
 */
function createPriority(prio, id) {
    switch (prio) {
        case 'urgent':
            document.getElementById(`prio-${id}`).src = "./assets/img/add_task/arrow_urgent.svg";
            break;
        case 'medium':
            document.getElementById(`prio-${id}`).src = "./assets/img/add_task/medium.svg";
            break;
        case 'low':
            document.getElementById(`prio-${id}`).src = "./assets/img/add_task/arrow_low.svg";
            break;
    }
};

/**
 * Function to get every taskmember and generate their initials
 * 
 * @param {array} singleTask 
 * @returns an array with the first Letters of every assigned Teammember
 */
function getMembers(singleTask) {
    let taskmembers = [];
    for (let i = 0; i < singleTask.member.length; i++) {
        let member = singleTask.member[i];
        let firstLetters = getFirstLetters(member);
        taskmembers.push(firstLetters);
    }
    return taskmembers;
}

/**
 * Function to get the initials of all task members
 * 
 * @param {string} member 
 * @returns the initials of a task member
 */
function getFirstLetters(member) {
    const fullname = member.split(' ');
    if (fullname.length == 1) {
        return fullname[0].charAt(0)
    } else {
        let firstLetter = fullname[0].charAt(0);
        let lastLetter = fullname[1].charAt(0);
        let initials = firstLetter + lastLetter;
        return initials;
    }
}

/**
 * Function to get the first Member of a Task, get the color of the member and render it in the card.
 * 
 * @param {array} members 
 * @param {array} singleTask 
 * @param {number} id 
 */
function getFirstMember(members, singleTask, id) {
    let firstMember = members[0];
    let color = checkForFirstMemberColor(singleTask)
    document.getElementById(`first-member-${id}`).innerHTML = firstMember;
    document.getElementById(`first-member-${id}`).style.background = color;
}

/**
 * Function to check if there are more assigned members, check their color and render
 * 
 * @param {array} members 
 * @param {array} singleTask 
 * @param {number} id 
 */
function getOtherMembers(members, singleTask, id) {
    for (let i = 1; i < singleTask.member.length; i++) {
        const memberOfInitialArray = members[i];
        const color = checkForColor(singleTask.member[i]);
        const leftPosition = i * 3;
        const parentEl = document.getElementById(`assigned-area-${id}`);
        if (i < 3) {
            renderMembers(memberOfInitialArray, id, i, color, leftPosition, parentEl);
        } else {
            const lastEl = document.getElementById(`assigned-area-${id}`)
            lastEl.removeChild(lastEl.lastElementChild);
            const countLeftMembers = singleTask.member.length - 2 + '+';
            renderMembers(countLeftMembers, id, i, '#2A3647', leftPosition, parentEl);
            break
        }
    }
}


function renderMembers(memberOfInitialArray, id, i, color, leftPosition, parentEl) {
    parentEl.innerHTML += renderAdditionalMembers(memberOfInitialArray, id, i);
    document.getElementById(`other-member-${id}-${i}`).style.background = color;
    document.getElementById(`other-member-${id}-${i}`).style.left = `-${leftPosition}px`;
}

/**
 * Function to check the color of the first member
 * 
 * @param {array} singleTask 
 * @returns the color of the first assigned member
 */
function checkForFirstMemberColor(singleTask) {
    findOutContacts();
    for (let i = 0; i < allContacts.length; i++) {
        let name = allContacts[i].fullname;
        let color = allContacts[i].color;
        let firstmember = singleTask.member[0];
        if (name == firstmember) {
            let userColor = color;
            return userColor;
        }
    }
}

/**
 * Function to check the color of the additional members
 * 
 * @param {string} memberOfTask 
 * @returns the color of additional members
 */
function checkForColor(memberOfTask) {
    findOutContacts();
    for (let i = 0; i < allContacts.length; i++) {
        let name = allContacts[i].fullname;
        let color = allContacts[i].color;
        if (name == memberOfTask) {
            let userColor = color;
            return userColor;
        }
    }
}

/**
 * Function no enable drop function
 * 
 * @param {string} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Function to move an Task to another status area and send it to server
 * 
 * @param {string} status 
 */
async function moveTo(status) {
    allTasks[currentDraggedElement]['status'] = status;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    renderCards();
}

/**
 * 
 * Function to reset style of dragged card
 */
function endDrop() {
    for (let i = 0; i < projectstatus.length; i++) {
        let status = projectstatus[i];
        document.getElementById(`${status}-dragcard`).classList.add('d-none');
        document.getElementById(`card-${currentDraggedElement}`).style.transform = '';
    }
}

/**
 *Function to identify the dragged Element
 *  
 * @param {number} id 
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * Function to render a empty Area to show where a Card can be dragged
 * 
 */
function showDragCard() {
    let cardWidth = document.getElementById(`card-${currentDraggedElement}`).getBoundingClientRect();
    let cardHeight = document.getElementById(`card-${currentDraggedElement}`).getBoundingClientRect();

    for (let i = 0; i < projectstatus.length; i++) {
        let status = projectstatus[i];
        document.getElementById(`${status}-dragcard`).style.width = cardWidth.width + 'px';
        document.getElementById(`${status}-dragcard`).style.height = cardHeight.height + 'px';
        document.getElementById(`${status}-dragcard`).classList.remove('d-none');
        document.getElementById(`card-${currentDraggedElement}`).style.transform = 'rotate(3deg)';
    }
}


/**
 * Function to search all Task for different criterias
 */
function searchTasks() {
    let searchInput = document.getElementById('search').value.toLowerCase();
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        searchForCriteria(task, searchInput, i);
    }
    renderSearchedTasks();
    search = [];
}


/**
 * Function to check if the criteria matches with the title, a prio or a member and push the result to the Array search
 * 
 * @param {string} task 
 * @param {string} searchInput 
 * @param {number} i 
 */
function searchForCriteria(task, searchInput, i) {
    if (checkIfInputMatchesTask(task, searchInput)) {
        if (getIndexFromArray(search, i) == -1)
            search.push(i);
    } else {
        let index = getIndexFromArray(search, i);
        if (index >= 0)
            search.splice(index, 1);
    }
}

function checkIfInputMatchesTask(task, searchInput) {
    return task.title.toLowerCase().includes(searchInput)
        || task.prio.toLowerCase().includes(searchInput)
        || task.description.toLowerCase().includes(searchInput)
        || task.category.toLowerCase().includes(searchInput)
        || checkSearchForMembers(task, searchInput)
}

/**
 * Function to check every task if the assigned members match with the search criteria
 * 
 * @param {string} task 
 * @param {string} searchInput 
 * @returns true if task.member includes the search criteria
 */
function checkSearchForMembers(task, searchInput) {
    for (let i = 0; i < task.member.length; i++) {
        let member = task.member[i].toLowerCase();
        if (member.includes(searchInput)) {
            return true
        }
    }
}

/**
 * Function to check if the search criteria is already in the array search
 * 
 * @param {array} array 
 * @param {number} value 
 * @returns the number of the position in the search array
 */
function getIndexFromArray(array, value) {
    let index = array.indexOf(value);
    return index;
}

/**
 * Function to clear all cards and then render all tasks which matches the search criteria
 */
function renderSearchedTasks() {
    clearCards();
    for (let i = 0; i < search.length; i++) {
        let singleTask = allTasks[search[i]];
        getTaskDetails(search[i], singleTask);
    }
}

/**
 * Function to create a Task from Board with specific projectstatus
 * The email is used for automatic connecting the user in contacts to a new task
 * 
 * @param {string} status 
 * @param {string} mail 
 */
function openAddTaskForm(status, mail) {
    if(mail){
        addMembersEmailToArray(mail);
    }
    boardStatus = status;
    setAnimationClassLists('add-task-overlay-board', 'add-task-overlay');
    removeClassList('add-task-overlay-board', 'd-none');
    addClassList('sections', 'sections-mobile');
    addClassList('add-task-btns', 'add-button-mobile');
    addClassList('createTask', 'unset-position');
    addClassList('add-task-btns', 'display-add-task-btns');
}


function closeAddTaskForm(idToHide, idToAnimate, boardLink) {
    closeOverlayContact(idToHide, idToAnimate);
    //overflowY must be set after closing the dialogue 
    if (boardLink == 'board') removeClassList('main-board', 'overflow');
}


function openBoardMobileAsideMenu(id, event) {
    event.stopPropagation();
    dropdown(`board-mobile-menu-${id}`, `board-mobile-aside-menu-${id}`);
}


function deleteTaskFromMobileMenu(id, event) {
    event.stopPropagation();
    deleteMessage(id);
}


function editTaskFromMobileMenu(id, event) {
    event.stopPropagation();
    editTask(id);
}

async function moveTaskTo(id, status, event) {
    event.stopPropagation();
    allTasks[id]['status'] = status;
    renderCards();
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    addClassList(`board-mobile-menu-superior-${id}`, 'd-none');
    addClassList(`board-mobile-aside-menu-${id}`, 'd-none');
}

