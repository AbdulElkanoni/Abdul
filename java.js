let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let title = document.getElementById('title');
let count = document.getElementById('count');
let category = document.getElementById('category');
let creat = document.getElementById('creat');

let mood= 'create';
let tmp

function getTotal(){

    
if (price.value != '') {
        const resal = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML= resal;
        total.style.color = 'white'
  }else{
        total.innerHTML = '';
        total.style.color = 'black'
    }
}


let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
 dataPro = []; 
    
}



creat.onclick = function (){
    let newPro = {
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
}

if(mood === 'create'){ 
if(newPro.count>1){
    for(let i = 0;  i < newPro.count; i++){
        dataPro.push(newPro);
}
}
else{
    dataPro.push(newPro);
}
}else{
dataPro[tmp] = newPro;
mood = 'create';
creat.innerHTML = ' create';
count.style.display= 'block';
}



//save storage
localStorage.setItem('product', JSON.stringify(dataPro)   )

console.log(newPro)

clearData()
showData()
}

function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

function showData(){
    getTotal()
    let table = '';
    for(let i = 0;i < dataPro.length;i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick='updateData(${i})' id="update">update</button></td>
        <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
         </tr>`
    }

    document.getElementById('tbody').innerHTML = table;


}
showData()

function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product =JSON.stringify(dataPro);
    showData()
}

function updateData(i){
 title.value = dataPro[i].title;
 title.count = dataPro[i].count;
 price.value = dataPro[i].price;
 taxes.value = dataPro[i].taxes;
 taxes.ads = dataPro[i].ads;
 taxes.discount = dataPro[i].discount;
 getTotal()
 count.style.display = 'none';
category.value = dataPro[i].category;
creat.innerHTML = 'update';
mood = 'update';
tmp= i;
scroll({
    top:0
    ,behavior:"smooth",
})
}

let searchMood = 'title';

function getSearchMood(id)
{

    let search= document.getElementById('search');
    if(id == 'SearchTitle'){
        searchMood = 'title';
        search.placeholder = ' Search By Title';
    }else{
        searchMood = 'category';
        search.placeholder = ' Search By Category';
    }
    search.focus()
    search.value = ' ';
    showData()
    console.log(searchMood)
    
}
function searchData(value)
{
    let table = '';
if(searchMood == 'title'){

for(let i = 0;i <dataPro.length;i++ ){
    if(dataPro[i].title.includes(value)){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick='updateData(${i})' id="update">update</button></td>
        <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
         </tr>`;
}

}


}

else{
    for(let i = 0;i <dataPro.length;i++ ){
        if(dataPro[i].category.includes(value)){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='updateData(${i})' id="update">update</button></td>
            <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
             </tr>`;}
        }
}
document.getElementById('tbody').innerHTML = table;
}




