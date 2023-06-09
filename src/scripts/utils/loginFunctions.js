import { initializeApp } from "firebase/app";
import { getFirestore, where } from "firebase/firestore";
import { collection, doc, setDoc, getDoc, getDocs, query } from "firebase/firestore"; 
import firebaseConfig from "../globals/firebaseConfig";
import { customAlphabet  } from "nanoid";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const loginFunctions = {
    async init(data){
        let user = '';
        let mod = '';
        const q = query(collection(db, "member"), where("email", "==", data.email))
        const querySnapshot = await getDocs(q)
        const qMod = query(collection(db, "moderator"), where("email", "==", data.email))
        const querySnapshotMod = await getDocs(qMod)
        if (querySnapshotMod.size > 0) {
            querySnapshotMod.forEach((doc) => {
                mod = doc.data();
                mod.id = doc.id;
            })
            if (mod.password == data.password) { // Login Moderator
                Swal.fire({
                    icon: 'success',
                    title: 'Login Berhasil',
                    text: 'Selamat login anda berhasil',
                    showCloseButton: true,
                    allowOutsideClick: false
                })
                localStorage.setItem('moderator', JSON.stringify(mod))
                setTimeout(() => {
                    window.location.href = './'
                }, 2000);
            } else{
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: 'Pastikan data yang anda masukkan benar',
                    showCloseButton: true,
                    allowOutsideClick: false
                    })
            }
        }
        if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                user = doc.data();
                user.id = doc.id;
            })

            if (user.password == data.password) { // Login Member
                const dataToDB = {
                    id: user.id,
                    status: 'active',
                    last_login: new Date().toISOString().split('T')[0],
                    email: user.email,
                    nama: user.nama,
                    password: user.password,
                    date_created: user.date_created,
                    film_favorit: user.film_favorit,
                    film_review: user.film_review,
                    foto_profil: user.foto_profil,
                    bio: user.bio
                }
                await setDoc(doc(db, "member", user.id), dataToDB);
    
                localStorage.setItem('user', JSON.stringify(dataToDB))
    
                Swal.fire({
                    icon: 'success',
                    title: 'Login Berhasil',
                    text: 'Selamat login anda berhasil',
                    showCloseButton: true,
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          window.location.href = './';
                          location.reload();
                        } 
                      })
            } else{
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: 'Pastikan data yang anda masukkan benar',
                    showCloseButton: true,
                    allowOutsideClick: false
                    })
            }
        }
        
        
    }
}

export default loginFunctions;