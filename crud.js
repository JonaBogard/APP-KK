import {
    getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
 } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

const db=getFirestore();
const coleccion=collection(db,"productos");

let editStatus = false;
let id = "";

const onGetProductos = (callback) => onSnapshot(coleccion, callback);


window.addEventListener("DOMContentLoaded", async (e) => {
    
    onGetProductos((querySnapshot)=>{
        const divProductos=document.querySelector("#lista");
        divProductos.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const producto = doc.data();
            divProductos.innerHTML += `
                    
                <tr>
                    <td>${producto.name}</td>
                    <td>${producto.price}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.description}</td>
                    <td><button class="btn btn-outline-danger btnDelete"  data-id="${doc.id}"><i class="bi bi-trash"></i></button></td>
                    <td><button class="btn btn-outline-primary btnEdit" data-bs-toggle="modal" data-bs-target="#editModal"   data-id="${doc.id}"><i class="bi bi-pencil"></i></button></td>
                    <td><button class="btn btn-outline-info btnQR" data-bs-toggle="modal" data-bs-target="#qrModal"  data-id="${doc.id}"><i class="bi bi-qr-code"></i></button></td>
                </tr>
                `;
        });

        const btnQR=document.querySelectorAll(".btnQR");
btnQR.forEach((btn)=>{
    btn.addEventListener("click", async (e)=>{
      try{
      id=btn.dataset.id;
      console.log(id);
      const data=await getDoc(doc(db, "productos", id));
      const producto=data.data();
      const contQR=document.getElementById('contQR');
      contQR.innerHTML=""
      const QR=new QRCode(contQR);
      QR.makeCode(id);
      } catch (error){  
        console.log(error);
      }
    });
  });
 

        const btnDelete = document.querySelectorAll(".btnDelete");
        //console.log(btnsDelete);
        btnDelete.forEach((btn,idx) =>
            btn.addEventListener("click", () => {
                id=btn.dataset.id;
                console.log(btn.dataset.id);
                Swal.fire({
                    title: 'Delete this register?',
                    showDenyButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: `No`,
                }).then(async(result) => {
                    try {
                        if (result.isConfirmed) {
                            await deleteDoc(doc(db, "productos", id));
                            Swal.fire("Register Delete");
                        }                         
                    } catch (error) {
                        Swal.fire("ERROR DELETE FILED");
                    }
                })       
            })
        );

        const btnEdit = document.querySelectorAll(".btnEdit");
        btnEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    id=btn.dataset.id;
                    console.log(id);
                    const data= await getDoc(doc(db, "productos", id));
                    const producto = data.data();
                    document.querySelector("#ename").value=producto.name;
                    document.querySelector("#eprice").value=producto.price;
                    document.querySelector("#estock").value=producto.stock;
                    document.querySelector("#edescription").value=producto.description;
                    editStatus = true;
                    id = data.id;
                } catch (error) {
                    console.log(error);
                }
            });
        });

    });
    
});

const btnAdd=document.querySelector("#btnAdd");
btnAdd.addEventListener("click",()=>{
    const name=document.querySelector("#name").value;
    const price=document.querySelector("#price").value;
    const stock=document.querySelector("#stock").value;
    const description=document.querySelector("#description").value;

    if(name=="" || price=="" || stock=="" || description==""){
        Swal.fire("falta llenar Campos");
        return;
    }

    const producto={ name, price, stock, description};

    if (!editStatus) {
        addDoc(coleccion, producto);        
        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
    } 

    Swal.fire({
        icon: 'success',
        title: 'EXITO',
        text: 'Se guardo correctamente!'
    })
    document.querySelector("#formAddMod").reset();
});


const btnSave=document.querySelector("#btnSave");
btnSave.addEventListener("click",()=>{
    const name=document.querySelector("#ename").value;
    const price=document.querySelector("#eprice").value;
    const stock=document.querySelector("#estock").value;
    const description=document.querySelector("#edescription").value;

    if(name=="" || price=="" || stock=="" || description==""){
        Swal.fire("Fil all camps");
        return;
    }

    const producto={ name, price, stock, description};

    if (editStatus) {
        updateDoc(doc(db, "productos", id), producto);
        editStatus = false;
        id = "";
        bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    }

    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'You´r register is save'
    })
    document.querySelector("#formEdit").reset();
});


