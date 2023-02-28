function saveToDataBase(event){
    event.preventDefault();

var table=document.getElementById('table').value;
var dish=document.getElementById('dish').value;
var quantity=document.getElementById('quantity').value;

var obj={
    table,
    dish,
    quantity
};

axios.post('https://crudcrud.com/api/05caeb6da3334c3a9ead966f430310ea/orders', obj)
.then((response)=>{
    showUsers(obj)
})
.catch((error)=>{
    console.log(error)
});
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/05caeb6da3334c3a9ead966f430310ea/orders')
    .then((response)=>{
        for(var i=0;i<response.data.length;i++){
            showUsers(response.data[i]);
        }
    })
    .catch((err)=>{
        console.log(err)
    });
});

function showUsers(obj){
    var list;
    if(obj.table=='Table 1'){
        list=document.getElementById('table1');
    }
    else if(obj.table=='Table 2'){
        list=document.getElementById('table2');
    }
    else if(obj.table=='Table 3'){
        list=document.getElementById('table3');
    }
    var li=document.createElement('li');
    li.id=`${obj._id}`;
    li.textContent=obj.dish+'-'+obj.quantity;
    var delBtn=document.createElement('button');
    delBtn.textContent='Delete';
    li.appendChild(delBtn);
    list.appendChild(li);
    li.addEventListener("click", deleteItem);
    

function deleteItem(event){
    var li=event.target.parentElement;
    list.removeChild(li);
    deleteFromDataBase(li);
}
function deleteFromDataBase(li){
    var id=li.id;
    axios.delete(`https://crudcrud.com/api/05caeb6da3334c3a9ead966f430310ea/orders/${id}`)
    .then((response)=>{
        console.log(response)
    .catch((error)=>{
        console.log(error)
    })
    });
}
}