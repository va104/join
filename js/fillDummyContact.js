let userInfo = {};
const dummyUser = [
    {
        fullname: 'Vanessa Würdinger',
        password: '100495',
        mail: 'vanessa.wuerdinger@gmx.de',
        img: './assets/img/profiles/vanessa.png',
        color: '#ffa78c',
        // color: getRandomColor(),
        phone: '012345/678910',
    },
    {
        fullname: 'Anton Mayer',
        password: '100495',
        mail: 'anton@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#d2ae66',
        // color: getRandomColor(),
        phone: '012345/678910',
    },
    {
        fullname: 'Anja Schulz',
        password: '100495',
        mail: 'schulz@hotmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#ed7179',
        // color: getRandomColor(),
        phone: '012345/678910',
    },
    {
        fullname: 'Benedikt Ziegler',
        password: '100495',
        mail: 'benedikt@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#cbaacb',
        // color: getRandomColor(),
        phone: '012345/678910',
    },
    {
        fullname: 'David Eisenberg',
        password: '100495',
        mail: 'davidberg@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#abdee6',
        // color: getRandomColor(),
        phone: '012345/678910',
    },
    {
        fullname: 'Eva Fischer',
        password: '100495',
        mail: 'eva@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#d5a07e',
        // color: getRandomColor(),
        phone: '012345/678910',
    },
    {
        fullname: 'Emmanuel Mauer',
        password: '100495',
        mail: 'emmanuelMa@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#648181',
        // color: getRandomColor(),
        phone: '012345/678910',
    },
    {
        fullname: 'Marcel Bauer',
        password: '100495',
        mail: 'bauer@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#96a7ba',
        // color: getRandomColor(),
        phone: '012345/678910',
    },
    {
        fullname: 'Tatjana Wolf',
        password: '100495',
        mail: 'wolf@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#97c1a9',
        // color: getRandomColor(),
        phone: '012345/678910',
    },
];

const staticCategories = [
    {
        'id': 'sales'
        ,'name': 'Sales'
        ,'color': 'bg-category-Sales'
    },
    {
        'id': 'backoffice'
        ,'name': 'Backoffice'
        ,'color': 'bg-category-Backoffice'
    },
    {
        'id': 'design'
        ,'name': 'Design'
        ,'color': 'bg-category-Design'
    },
    {
        'id': 'marketing'
        ,'name': 'Marketing'
        ,'color': 'bg-category-Marketing'
    },
    {
        'id': 'media'
        ,'name': 'Media'
        ,'color': 'bg-category-Media'
    },
];

const dummyTasks = [
    {
        'title': 'Website redesign'
        , 'description': 'Modify the contents of the main website...'
        , 'category': 'Design'
        , 'member': ['Tatjana Wolf', 'Anton Mayer', 'Anja Schulz']
        , 'invite': 'none'
        , 'duedate': '12.11.2022'
        , 'duedateOrgin': '2022-11-12'
        , 'prio': 'low'
        , 'status': 'toDo'
        , 'subtasks': ['Redesign', 'Mockup Design']
        , 'finishedsubtasks': ['Redesign']
        , 'complete': false
    },
    {
        'title': 'Call potential clients'
        , 'description': 'Make the product presentation to prospective buyers'
        , 'category': 'Sales'
        , 'member': ['Emmanuel Mauer', 'Vanessa Würdinger' , 'Anja Schulz', 'Benedikt Ziegler']
        , 'invite': 'none'
        , 'duedate': '24.11.2022'
        , 'duedateOrgin': '2022-11-24'
        , 'prio': 'urgent'
        , 'status': 'progress'
        , 'subtasks': []
        , 'finishedsubtasks': []
        , 'complete': false
    },
    {
        'title': 'Accounting invoices'
        , 'description': 'Write open invoices for customer'
        , 'category': 'Backoffice'
        , 'member': ['Anton Mayer', 'Tatjana Wolf', 'David Eisenberg', 'Vanessa Würdinger', 'Marcel Bauer']
        , 'invite': 'none'
        , 'duedate': '05.01.2023'
        , 'duedateOrgin': '2023-01-05'
        , 'prio': 'medium'
        , 'status': 'feedback'
        , 'subtasks': []
        , 'finishedsubtasks': []
        , 'complete': false
    },
    {
        'title': 'Video cut'
        , 'description': 'Edit the new company video'
        , 'category': 'Media'
        , 'member': ['David Eisenberg']
        , 'invite': 'none'
        , 'duedate': '06.03.2023'
        , 'duedateOrgin': '2023-03-06'
        , 'prio': 'medium'
        , 'status': 'feedback'
        , 'subtasks': []
        , 'finishedsubtasks': []
        , 'complete': false
    },
    {
        'title': 'Social media strategy'
        , 'description': 'Develop an ad campaign for brand positioning'
        , 'category': 'Marketing'
        , 'member': ['Tatjana Wolf', 'Anja Schulz']
        , 'invite': 'none'
        , 'duedate': '15.12.2022'
        , 'duedateOrgin': '2022-12-15'
        , 'prio': 'low'
        , 'status': 'done'
        , 'subtasks':['write campaign', 'document campaing', 'ask for customer feedback']
        , 'finishedsubtasks': ['write campaign', 'document campaing', 'ask for customer feedback']
        , 'complete': false
    },
]

function initDummyContent() {
     fillDummyUser()
    ,addStaticCategories()
    ,addDummyTasks()
}
async function fillDummyUser() {
    for (let i = 0; i < dummyUser.length; i++) {
        userInfo = {
            'fullname': dummyUser[i].fullname
            , 'password': dummyUser[i].password
            , 'mail': dummyUser[i].mail
            , 'img': dummyUser[i].img
            , 'color': dummyUser[i].color
            , 'phone': dummyUser[i].phone
        };
        userInformation.push(userInfo);
        await backend.setItem('userInformation', JSON.stringify(userInformation));
    }
}


async function addStaticCategories() {
    for (let i = 0; i < staticCategories.length; i++) {
        const category = {
            'id': staticCategories[i].id
            ,'name': staticCategories[i].name
            ,'color': staticCategories[i].color
        }
        allCategories.push(category);
        await backend.setItem('allCategories', JSON.stringify(allCategories));      
    }
}

async function addDummyTasks() {
    for (let i = 0; i < dummyTasks.length; i++) {
        const newTask = {
            'title': dummyTasks[i].title
            , 'description': dummyTasks[i].description
            , 'category': dummyTasks[i].category
            , 'member': dummyTasks[i].member
            , 'invite': dummyTasks[i].invite
            , 'duedate': dummyTasks[i].duedate
            , 'duedateOrgin': dummyTasks[i].duedateOrgin
            , 'prio': dummyTasks[i].prio
            , 'status': dummyTasks[i].status
            , 'subtasks': dummyTasks[i].subtasks
            , 'finishedsubtasks': dummyTasks[i].finishedsubtasks
            , 'complete': false
        };
        allTasks.push(newTask);
        await backend.setItem('allTasks', JSON.stringify(allTasks));
    }
}