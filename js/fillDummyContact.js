let userInfo = {};
const dummyUser = [
    {
        fullname: 'Guest Account',
        password: '1234',
        mail: 'guest@web.de',
        img: './assets/img/contacts/newUser.png',
        color: '#808080',
        phone: '',
    },
    {
        fullname: 'Vanessa Würdinger',
        password: '100495',
        mail: 'vanessa.wuerdinger@gmx.de',
        img: './assets/img/profiles/vanessa.png',
        color: '#ffa78c',
        phone: '012345/678910',
    },
    {
        fullname: 'Anton Mayer',
        password: '100495',
        mail: 'anton@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#d2ae66',
        phone: '012345/678910',
    },
    {
        fullname: 'Anja Schulz',
        password: '100495',
        mail: 'schulz@hotmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#ed7179',
        phone: '012345/678910',
    },
    {
        fullname: 'Benedikt Ziegler',
        password: '100495',
        mail: 'benedikt@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#cbaacb',
        phone: '012345/678910',
    },
    {
        fullname: 'David Eisenberg',
        password: '100495',
        mail: 'davidberg@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#abdee6',
        phone: '012345/678910',
    },
    {
        fullname: 'Eva Fischer',
        password: '100495',
        mail: 'eva@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#d5a07e',
        phone: '012345/678910',
    },
    {
        fullname: 'Emmanuel Mauer',
        password: '100495',
        mail: 'emmanuelMa@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#648181',
        phone: '012345/678910',
    },
    {
        fullname: 'Marcel Bauer',
        password: '100495',
        mail: 'bauer@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#96a7ba',
        phone: '012345/678910',
    },
    {
        fullname: 'Tatjana Wolf',
        password: '100495',
        mail: 'wolf@gmail.com',
        img: './assets/img/contacts/newUser.png',
        color: '#97c1a9',
        phone: '012345/678910',
    },
    {
        fullname: 'Hans Peter',
        password: '100495',
        mail: 'h.peter@gmx.com',
        img: './assets/img/contacts/newUser.png',
        color: '#329a7b',
        phone: '012345/678910',
    },
    {
        fullname: 'Benjamin Schmidt-Müller',
        password: '100495',
        mail: 'b.smueller@yahoo.com',
        img: './assets/img/contacts/newUser.png',
        color: '#6e6686',
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
        , 'duedate': '05.05.2023'
        , 'duedateOrgin': '2023-05-05'
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
        , 'duedate': '06.07.2023'
        , 'duedateOrgin': '2023-07-06'
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
        , 'duedate': '05.03.2024'
        , 'duedateOrgin': '2024-03-05'
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
        , 'duedate': '08.04.2023'
        , 'duedateOrgin': '2023-04-08'
        , 'prio': 'low'
        , 'status': 'done'
        , 'subtasks':['write campaign', 'document campaing', 'ask for customer feedback']
        , 'finishedsubtasks': ['write campaign', 'document campaing', 'ask for customer feedback']
        , 'complete': false
    },
    {
        'title': 'Market conditions'
        , 'description': 'Analysis of market conditions for better understandig of the opponents'
        , 'category': 'Marketing'
        , 'member': ['Anton Mayer', 'David Eisenberg', 'Eva Fischer']
        , 'invite': 'none'
        , 'duedate': '25.04.2023'
        , 'duedateOrgin': '2023-04-25'
        , 'prio': 'medium'
        , 'status': 'progress'
        , 'subtasks':['examining market trends']
        , 'finishedsubtasks': ['examining market trends']
        , 'complete': false
    },
    {
        'title': 'Brand Identity'
        , 'description': 'Development of a new brand identity'
        , 'category': 'Media'
        , 'member': ['Vanessa Würdinger', 'Marcel Bauer']
        , 'invite': 'none'
        , 'duedate': '08.10.2023'
        , 'duedateOrgin': '2023-10-08'
        , 'prio': 'urgent'
        , 'status': 'progress'
        , 'subtasks':['creating brand name', 'new logo', 'visual identity', 'slogan']
        , 'finishedsubtasks': []
        , 'complete': false
    },
]

const setDummyContent = async function initDummyContent() {
    await backend.deleteItem('allTasks')
    await backend.deleteItem('allCategories'),
    await backend.deleteItem('userInformation'),
    userInformation = [];
    allTasks = [];
    allCategories = [];
    fillDummyUser(),
    addStaticCategories(),
    addDummyTasks()
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