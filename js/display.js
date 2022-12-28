let displayId;

/**
 * Function to open dialog window of a task to see details 
 * 
 * @param {number} id 
 */
async function openDialog(id) {
    let usingMobileDev = checkMobileDevice();
    if(usingMobileDev){
        await getSubTaskData(id);
    } else toggleClassList(`board-mobile-menu-superior-${id}`, 'd-none');
}


async function getSubTaskData(id){
    await checkInvitationStatus(id);
    let singledisplayTask = allTasks[id];
    let displaysubtasks = singledisplayTask.subtasks;
    let displaycompletedsubtasks = singledisplayTask.finishedsubtasks;
    let displaymembers = getMembers(singledisplayTask);
    displayId = id;
    getTaskData(singledisplayTask, displaysubtasks, displaycompletedsubtasks, displaymembers, id);
}

/**
 * to check if an Invitation is still open or if the invited user has created an account
 * 
 * @param {number} id 
 */
async function checkInvitationStatus(id) {
    for (let i = 0; i < allContacts.length; i++) {
        let contact = allContacts[i];
        if (allTasks[id].invite && allTasks[id].invite == contact.mail){
            let fullname = contact.fullname;
            await deleteInvitationStatus(id, fullname);
        }
        
    }
}


async function deleteInvitationStatus(id, fullname) {
    allTasks[id].member.push(fullname);
    allTasks[id].invite = 'none';
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    renderCards();
}


function getTaskData(singledisplayTask, displaysubtasks, displaycompletedsubtasks, displaymembers, id) {
    let title = singledisplayTask.title;
    let description = singledisplayTask.description;
    let date = singledisplayTask.duedate;
    let prio = singledisplayTask.prio;
    let category = singledisplayTask.category;
    let color = getCategoryColor(category);
    let inviteMail = singledisplayTask.invite;
    createDisplayOverlay(id, title, description, category, date, prio, color, displaymembers, singledisplayTask, displaysubtasks, displaycompletedsubtasks, inviteMail);
}


/**
 * Function to create all Details of the Task
 * 
 * @param {number} id 
 * @param {string} title 
 * @param {string} description 
 * @param {string} category 
 * @param {date} date 
 * @param {string} prio 
 * @param {Array} displaymembers 
 * @param {Array} singledisplayTask 
 * @param {Array} displaysubtasks 
 * @param {Array} displaycompletedsubtasks 
 */
function createDisplayOverlay(id, title, description, category, date, prio, color, displaymembers, singledisplayTask, displaysubtasks, displaycompletedsubtasks, inviteMail) {
    createDisplay(id, title, description, category, date, color, inviteMail)
    createAssignedMemberAreaDisplay(displaymembers, singledisplayTask, id);
    createSubtasks(id, title, description, category, date, prio, displaysubtasks);
    createDisplayPriority(prio, id);
    checkForCheckbox(id, displaysubtasks, displaycompletedsubtasks);
    showDisplay(id);
}

/**
 * Function to render the Display and the content of the Task
 * 
 * @param {number} id 
 * @param {string} title 
 * @param {string} description 
 * @param {string} category 
 * @param {date} date 
 * @param {string} prio 
 */
function createDisplay(id, title, description, category, date, color, inviteMail) {
    document.getElementById('task-display').innerHTML = renderDisplay(id);
    document.getElementById(`display-${id}`).innerHTML = renderDisplayContent(id, title, description, category, date, color);
    document.getElementById(`task-display-delete`).innerHTML = renderDeleteDisplay(id);
    document.getElementById(`assigned-display-area-${id}`).innerHTML = renderMembersOfTaskAreaDisplay(id);
    if (inviteMail && inviteMail !== 'none') document.getElementById('invited-member-board').innerHTML += renderInvitedMail(inviteMail);
}

/**
 * Function to check if only one Member is assigned or more
 * 
 * @param {array} members 
 * @param {array} singleTask 
 * @param {number} id 
 */
function createAssignedMemberAreaDisplay(members, singleTask, id) {
    getFirstMemberDisplay(members, singleTask, id);
    getOtherMembersDisplay(members, singleTask, id);
}

/**
 * Function to render all Subtasks on Display
 * 
 * @param {number} id 
 * @param {string} title 
 * @param {string} description 
 * @param {string} category 
 * @param {date} date 
 * @param {string} prio 
 * @param {array} displaysubtasks 
 */
function createSubtasks(id, title, description, category, date, prio, displaysubtasks) {
    for (let i = 0; i < displaysubtasks.length; i++) {
        let displaysubtask = displaysubtasks[i];
        document.getElementById(`subtasks-display-${id}`).innerHTML += renderSubTasks(id, i, title, description, category, date, prio, displaysubtask);
    }
}

/**
 * Function to display the priority button
 * 
 * @param {string} prio 
 * @param {number} id 
 */
function createDisplayPriority(prio, id) {
    switch (prio) {
        case 'urgent':
            priorityForDisplayUrgent(prio, id);
            break;

        case 'medium':
            priorityForDisplayMedium(prio, id);
            break;

        case 'low':
            priorityForDisplayLow(prio, id);
            break;
    }
}

/**
 * Function to check if a subtask is in completedsubtasks, if yes the checkbox is checked
 * 
 * @param {number} id 
 * @param {array} subtasks 
 * @param {array} completedsubtasks 
 */
function checkForCheckbox(id, subtasks, completedsubtasks) {
    for (let i = 0; i < subtasks.length; i++) {
        if (completedsubtasks.includes(subtasks[i]))
            document.getElementById(`checkbox-${id}-${i}`).checked = true;
    }
}

/**
 * Function to open the Display of a Task
 * 
 * @param {number} id 
 */
function showDisplay(id) {
    if(!animation) setAnimationClassLists('task-display', 'display-' + id);
    animation = true;
    removeClassList('task-display', 'd-none');
    removeClassList('display-' + id, 'd-none');
    addClassList('main-board','overflow');
    addClassList('body-board','overflow');
    addClassList('task-display','overflow');
}

/**
 * Function to check if checkbox of a subtask is checked. If yes, the subtask is saved in finishedsubtask-array
 * if unchecked, the subtask is removed from the finishedsubtask-array
 * 
 * @param {number} id 
 * @param {number} i 
 * @param {string} title 
 * @param {string} description 
 * @param {string} category 
 * @param {date} date 
 * @param {string} prio 
 * @param {array} displaysubtask 
 */
function checkboxToggle(id, i, title, description, category, date, prio, displaysubtask) {
    if (document.getElementById(`checkbox-${id}-${i}`).checked == true) {
        saveFinishedSubtask(id, title, description, category, date, prio, displaysubtask);
    } else {
        resetFinishedSubtask(id, title, description, category, date, prio, displaysubtask);
    }
}

/**
 * Function to push a subtask to the finishedsubtask-array and render all Cards, then open the Dialog again
 * 
 * @param {number} id 
 * @param {string} title 
 * @param {string} description 
 * @param {string} category 
 * @param {date} date 
 * @param {string} prio 
 * @param {array} displaysubtask
 */
async function saveFinishedSubtask(id, title, description, category, date, prio, displaysubtask) {
    allTasks[id].finishedsubtasks.push(displaysubtask);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    renderCards();
    openDialog(id, title, description, category, date, prio);
}

/**
 * Function to remove a subtask to the finishedsubtask-array and render all Cards, then open the Dialog again
 * 
 * @param {number} id 
 * @param {string} title 
 * @param {string} description 
 * @param {string} category 
 * @param {date} date 
 * @param {string} prio 
 * @param {array} displaysubtask 
 */
async function resetFinishedSubtask(id, title, description, category, date, prio, displaysubtask) {
    let x = allTasks[id].finishedsubtasks.indexOf(displaysubtask);
    allTasks[id].finishedsubtasks.splice(x, 1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    renderCards();
    openDialog(id, title, description, category, date, prio);
}

/**
 * Function to render the information for assigned first member
 * 
 * @param {array} members 
 * @param {array} singleTask 
 * @param {number} id 
 */
function getFirstMemberDisplay(members, singleTask, id) {
    let firstMember = members[0];
    let firstMemberFullName = singleTask.member[0];
    let color = checkForFirstMemberColor(singleTask)
    document.getElementById(`first-member-display-${id}`).innerHTML = firstMember;
    document.getElementById(`first-member-name-display-${id}`).innerHTML = firstMemberFullName;
    document.getElementById(`first-member-display-${id}`).style.background = color;
}

/**
 * Function to render the information for assigned members
 * 
 * @param {array} members 
 * @param {array} singleTask 
 * @param {number} id 
 */
function getOtherMembersDisplay(members, singleTask, id) {
    for (let i = 1; i < singleTask.member.length; i++) {
        let memberOfTask = singleTask.member[i];
        let memberOfInitialArray = members[i];
        let color = checkForColor(memberOfTask);
        document.getElementById(`assigned-list-${id}`).innerHTML += renderAdditionalMembersDisplay(memberOfInitialArray, i);
        document.getElementById(`other-member-name-display-${i}`).innerHTML = memberOfTask;
        document.getElementById(`other-member-display-${i}`).style.background = color;
    }
}

/**
 * Function to set the color, text and img for prio Urgent
 * 
 * @param {string} prio
 * @param {number} id
 */
function priorityForDisplayUrgent(prio, id) {
    document.getElementById(`prio-display-field-${id}`).classList.add(`bg-${prio}`, 'color-white')
    document.getElementById(`prio-display-name-${id}`).innerHTML = 'Urgent';
    document.getElementById(`prio-img-${id}`).src = "./assets/img/add_task/arrow_urgent_white.svg";
}

/**
 * Function to set the color, text and img for prio Medium
 * 
 * @param {string} prio
 * @param {number} id
 */
function priorityForDisplayMedium(prio, id) {
    document.getElementById(`prio-display-field-${id}`).classList.add(`bg-${prio}`, 'color-white')
    document.getElementById(`prio-display-name-${id}`).innerHTML = 'Medium';
    document.getElementById(`prio-img-${id}`).src = "./assets/img/add_task/medium_white.svg";
}

/**
 * Function to set the color, text and img for prio Low
 * 
 * @param {string} prio
 * @param {number} id 
 */
function priorityForDisplayLow(prio, id) {
    document.getElementById(`prio-display-field-${id}`).classList.add(`bg-${prio}`, 'color-white')
    document.getElementById(`prio-display-name-${id}`).innerHTML = 'Low';
    document.getElementById(`prio-img-${id}`).src = "./assets/img/add_task/arrow_low_white.svg";
}

/**
 * Function to delete a specified Task from allTask Array
 * 
 * @param {number} id 
 */
async function deleteMessage(id) {
    closeDeleteWindow();
    closeDialog(id);
    let index = allTasks.indexOf(allTasks[id]);
    allTasks.splice(index, 1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    renderCards();
}

/**
 * Function to close the Display of a task
 * 
 * @param {number} id 
 */
function closeDialog(id) {
    animation = false;
    if(document.getElementById('display-' + id)){
        addClassList('task-display', 'd-none');
        closeOverlayContact('task-display', 'display-' + id);
        addClassList('display-content-' + id, 'd-none');
        removeClassList('main-board','overflow');
        removeClassList('body-board','overflow');
        removeClassList('task-display','overflow');
    }
}

/**
 * Function opens the overlay window to ask the user, if the task can be deleted
 * 
 */
function openDeleteWindow() {
 document.getElementById('task-display-delete').classList.remove('d-none');
//  document.getElementById('task-display-delete').classList.add('d-flex');
}

/**
 * Function closes the overlay window and it´s used in board-section, 
 * when a user doesn´t want to delete the task.
 * 
 */
function closeDeleteWindow() {
 document.getElementById('task-display-delete').classList.add('d-none');
}


