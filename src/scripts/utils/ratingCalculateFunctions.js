import { initializeApp } from "firebase/app";
import { getFirestore, where } from "firebase/firestore";
import { collection, doc, setDoc, getDoc, getDocs, query } from "firebase/firestore"; 
import firebaseConfig from "../globals/firebaseConfig";
import { customAlphabet  } from "nanoid";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const calculateRating = {
    async calculateRating(movieId, reviewList){
        let ratingTemp = 0;
        let counter = 0;
        reviewList.forEach(review => {
            if (review.data().movie_id == movieId) {
                ratingTemp += parseInt(review.data().rating);
                counter++
            }
        });

        ratingTemp = ratingTemp / counter
        await this.addToDB(movieId, ratingTemp);

        return ratingTemp
    },
    async addToDB(movieId, rating){
        const docRef = doc(db, 'rating', `rating_${movieId}`);
        await setDoc(docRef, {
            movie_id: movieId,
            rating: rating
        });
    }
}

export default calculateRating;