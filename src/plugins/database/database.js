let 
    request = window.indexedDB.open('xuanzai'),
    db

function createTable() {
    if (!db.objectStoreNames.contains('picture')) {
        let objectStore = db.createObjectStore('picture', { keyPath: 'id' });
        objectStore.createIndex('url', 'url', { unique: true });
    }
}

function insert(data, success, error) {
    let req = db.transaction(['picture'], 'readwrite')
    .objectStore('picture')
    .add(data)
    req.addEventListener('success', (event) => {
        success()
    })
    req.addEventListener('error', (event) => {
        error()
    })
}

function find(id, success, error) {
    let req = db.transaction(['picture'])
    .objectStore('picture')
    .get(id)
    req.addEventListener('success', (event) => {
        req.result 
        ? success(req.result)
        : success(undefined)
    })
    req.addEventListener('error', (event) => {
        error()
    })
}

function update(data, success, error) {
    let req = db
    .transaction(['person'], 'readwrite')
    .objectStore('person')
    .put({ id: data.id, url: data.url});

    req.addEventListener('success', (event) => {
        success()
    })
    req.addEventListener('error', (event) => {
        error()
    })
}

request.addEventListener('success', (event) => {
    db = request.result
    console.log('浏览器数据库打开成功');
})

request.addEventListener('error', (event) => {
    console.log('浏览器数据库打开报错');
})

request.addEventListener('upgradeneeded', (event) => {
    db = event.target.result;
    createTable()
    console.log('浏览器数据库打开报错');
})

export default {
    insert,
    find,
    update
}