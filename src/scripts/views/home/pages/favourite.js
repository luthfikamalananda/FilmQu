import { async } from "regenerator-runtime"
import tmdbConfig from "../../../globals/tmdbConfig";
import firebaseConfig from "../../../globals/firebaseConfig";
import { getDoc, doc, getFirestore, setDoc, deleteDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const favourite = {
    async render() {
        return `<div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="page-content">

                    <!-- ***** Most Popular Start ***** -->
                    <div class="most-popular" style="margin-top:0;">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="heading-section">
                                    <h4>Film Favorit Anda</h4>
                                </div>
                                <div class="row" id='favorit-film'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ***** Most Popular End ***** -->

                </div>
            </div>
        </div>
    </div>`
    },

    async afterRender() {
        console.log('afterrender jalan');

        const favoriteContainer = document.getElementById('favorit-film');

        const memberData = JSON.parse(localStorage.getItem('user'));

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const docRef = doc(db, 'member', memberData.id)
        const docSnap = await getDoc(docRef);
        const memberFavorite = docSnap.data().film_favorit

        const querySnapshot = await getDocs(collection(db, "film"));
        querySnapshot.forEach((filmDB) => {
            memberFavorite.forEach((idMovie) => {
                if (filmDB.id == idMovie) {
                    favoriteContainer.innerHTML += `
                    <div class="col-lg-3 col-sm-6">
                        <div class="item" style="max-width:auto;">
                            <a href='#/detail/${filmDB.id}'><img src="${filmDB.data().backdrop_path ? tmdbConfig.BASE_IMAGE_URL + filmDB.data().backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}" alt=""></a>
                            <a href='#/detail/${filmDB.id}'><h4 class='titleName' style="max-width:auto;">${filmDB.data().title}<br><span>${filmDB.data().release_date}</span></h4></a>
                            <ul>
                                <li><i class="fa fa-star"></i> ${filmDB.data().vote_average}</li>
                                <li><i class="fa fa-star"></i></li>
                            </ul>
                        </div>
                    </div>`
                }
            })
        });
    }
}

export default favourite;