import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';

import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD3VF7z6S78T2dbr60uT81t8qEy9kYx9Zc",
    authDomain: "fir-tutorial-62024.firebaseapp.com",
    projectId: "fir-tutorial-62024",
    storageBucket: "fir-tutorial-62024.appspot.com",
    messagingSenderId: "51245402325",
    appId: "1:51245402325:web:4dc48e99fce46686b97a5c"
};

// init firebase
initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore();

// Collection reference
const booksRef = collection(db, "books");

const provider = new GoogleAuthProvider();
const auth = getAuth();

//! get all documents from collection "books"
// getDocs(booksRef)
//     .then((snapshot) => {
//         let books = []
//         snapshot.forEach((doc) => {
//             books.push({ ...doc.data(), id: doc.id })
//         })
//         console.log(books);

//     }).catch((err) => {
//         console.log(err.message);
// });

//! real-time listener
onSnapshot(booksRef, (snapshot) => {
    let books = []
    snapshot.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
})

// adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(booksRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
        .then(() => {
            addBookForm.reset();
        })
})


// deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const docRef = doc(db, "books", deleteBookForm.delete.value);
    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset();
        })
}
)

// Authentication using google

const signIn = document.querySelector('.signIn');
signIn.addEventListener('click', (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result.user);
        })
        .catch((err) => {
            console.log(err.message);
        }
    )
})

const signOut = document.querySelector('.signOut');
signOut.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
        .then(() => {
            console.log('user signed out');
        })
        .catch((err) => {
            console.log(err);
        })
}
)


