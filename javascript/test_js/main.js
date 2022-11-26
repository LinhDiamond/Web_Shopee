// Tạo ra hàm reduce() của mảng
// Array.prototype.reduce2 = function(callBack, result){
//     var i = 0
//     if(arguments.length < 2) {
//         result = this[0]
//         i = 1
//     }
//     for( ; i < this.length; i++)
//     {
//         result = callBack(result, this[i], i, this)
//     }
//     return result
// }

// const numbers = [1, 2, 3, 4, 5]

// const result = numbers.reduce2((total, number) => {
//     return total + number;
// })
// console.log(result)





// function arrToObj(array){
//     var inFo = array.reduce((acc, cur) => {
//         for(var i = 0; i < cur.length ;i++)
//         {
//             acc[cur[0]] =  cur[1]
//         }
//         return acc;
//     }, {})
//     return inFo
// }

// Expected results:
// var arr = [
//     ['name', 'Sơn Đặng'],
//     ['age', 18],
// ];
// console.log(arrToObj(arr)); // { name: 'Sơn Đặng', age: 18 }



// HTML DOM 
// 1. Element: 

// var courses = ['HTML & CSS', 'Javascript', 'PHP', 'Java']

// function render(courses) {
//     var kq = courses.map(function(course, index){
//         return (`<li>${course}</li>`)
//     })
//     var ulElement = document.querySelector('.courses-list')
//     ulElement.innerHTML = kq.join('\n')
// }

// render(courses)
// console.log(render(courses))

var listCoursesBlock = document.querySelector('#list-courses')

var API = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses);
    handleCreateForm();
}
start();

//Function
function getCourses(callback) {
    fetch(API)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function renderCourses(courses) {
    var htmls = courses.map((course) => {
        return `
            <li class="course-item-${course.id}">
                <h4> ${course.name}</h4>
                <p> ${course.description}</p>
                <input onclick="handleDeleteCourse(${course.id})" type="submit" value="Xóa">
                <input onclick="handleUpdateCourse(${course.id})" type="submit" value="Sửa">
            </li>
        `
    });
    listCoursesBlock.innerHTML = htmls.join('')
}

// Tạo
function handleCreateCourse(data, callback) {
    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

// Sửa 
function handleUpdateCourse(id) {
    fetch(API + '/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(course) {
            var name = document.querySelector('input[name="name"]');
            var description = document.querySelector('input[name="description"]');
            var updateBtn = document.querySelector('#create');

            name.value = course.name;
            description.value = course.description;
            updateBtn.value = 'Cập nhật';

            updateBtn.onclick = function() {
                var formUpdateData = {
                    name: name.value,
                    description: description.value
                };

                fetch(API + '/' + id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formUpdateData)
                })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function() {
                        getCourses(renderCourses);
                    })

                name.value = ''
                description.value = ''
                updateBtn.value = 'Thêm mới'
            }
        })
}

// Xóa
function handleDeleteCourse(id) {
    fetch(API + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            var courseItem = document.querySelector('.course-item-' + id)
            if(courseItem)
            {
                courseItem.remove();
            }
        });
}

// form Tạo
function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var formData = {
            name: name,
            description: description
        };
        
        handleCreateCourse(formData, function() {
            getCourses(renderCourses);
        });
    }
}
