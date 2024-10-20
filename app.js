// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuErsQUGTfUTP-aKaRCm_nTQTaGgilGN0",
    authDomain: "phumitchport.firebaseapp.com",
    projectId: "phumitchport",
    storageBucket: "phumitchport.appspot.com",
    messagingSenderId: "355659518376",
    appId: "1:355659518376:web:e1a3fb8c802435b96e4d9d",
    measurementId: "G-YEQGMV2VR4"  
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Fetch and display works
async function fetchWorks() {
    const worksRef = db.collection('works');
    const snapshot = await worksRef.get();
    const worksDiv = document.getElementById('works');
    
    snapshot.forEach(doc => {
        const data = doc.data();
        worksDiv.innerHTML += `
            <div>
                <h2>${data.title}</h2>
                <img src="${data.imageUrl}" alt="${data.title}" width="200">
                <p>${data.description}</p>
            </div>
        `;
    });
}

// Upload work
document.getElementById('uploadForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('image').files[0];

    const storageRef = storage.ref();
    const imageRef = storageRef.child(imageFile.name);
    
    await imageRef.put(imageFile);
    const imageUrl = await imageRef.getDownloadURL();

    await db.collection('works').add({
        title,
        description,
        imageUrl
    });

    alert('Work uploaded successfully!');
    window.location.href = 'index.html';
});

// Call fetch works on index page
if (window.location.pathname === '/index.html') {
    fetchWorks();
}
