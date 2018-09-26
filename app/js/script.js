let form = document.querySelector('.js-form');
let input = document.querySelector('.js-input');
let marks = [
    {img: 'img/google.png', name:'google', text:'LOrem ipsum', url:'https://www.google.com'},
    {img: 'img/gidonline.png', name:'gidoonline', text:'LOrem ipsum', url:'http://gidonline.in/'},
    {img: 'img/habr.png', name:'habr', text:'LOrem ipsum', url:'https://habr.com/'},
];
marks = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : marks;
localStorage.setItem('items',JSON.stringify(marks));
let data=JSON.parse(localStorage.getItem('items'));

let container = document.querySelector('.bookmark-container');
let source = document.querySelector('#container').innerHTML.trim();
let template = Handlebars.compile(source);
let markup = template({data});
container.insertAdjacentHTML('beforeend', markup);


let getValue = (e,callback) => {
    e.preventDefault();
    let value = input.value;
    input.value = '';
    let check = checkUrl(value);
    if(value.length === 0){
        return;
    }
    if(check){
        alert('ERROR!!!We have such an url');
        return;
    }
    callback(value);
}

function checkUrl(val){
      let arr = marks.find(el => {
         return el.url == val;
      })
      return arr;
}
function makeContent(value){
    let image='https://picsum.photos/230/120/?random';
    let obj = {img:image, name:value,text:'Lorem ipsum', url:value};
    marks.unshift(obj);
    localStorage.setItem('items', JSON.stringify(marks));
    let source = document.querySelector('#mark-container').innerHTML.trim();
    let template = Handlebars.compile(source);
    let markbut = template(obj);
    container.insertAdjacentHTML('afterbegin', markbut);
}

function deleteMark(e){
    if(e.target.nodeName == 'BUTTON'){
        let targ = e.target.parentNode;
        e.target.parentNode.classList.add('delete');
        let arrMarks = document.querySelectorAll('.mark-block');
        let arr = Array.from(arrMarks);
        let index = arr.indexOf(targ);
        marks.splice(index,1);
        localStorage.setItem('items',JSON.stringify(marks));
    }
}
form.addEventListener('submit',function(){
    getValue(event,makeContent);
}, false);

container.addEventListener('click', deleteMark);