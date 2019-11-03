import Meme from "../Meme";

import admin from 'firebase-admin';
import IDataStore from "../interfaces/IDataStore";
import IMeme from "../interfaces/IMeme";
//import * as firebase from 'firebase';
const serviceAccount = require('../../../firebaseKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://dank-daily.firebaseio.com'
      });
}


class FirebaseDataStore implements IDataStore {

    /**
     * Firebase firestore
     */
    readonly _firestore: FirebaseFirestore.Firestore;

    constructor(firestore: FirebaseFirestore.Firestore){
        this._firestore = firestore;
    }

    /**
     * 
     * @param memes sync memes with the datastore
     */
    public sync(memes: Array<IMeme>) : void
    {
        
        this._firestore.collection('memes').get()
        .then((snapshot: FirebaseFirestore.QuerySnapshot) => {

                
                let deleteBatch = this._firestore.batch();
                snapshot.docs.forEach((doc) => {
                    deleteBatch.delete(doc.ref);
                });
                
                deleteBatch.commit().then(() => {

                    memes.forEach((meme: IMeme) => {
                        this._firestore.collection('memes').add({
                            title: meme.title,
                            imageSrc: meme.imageSrc,
                            link: meme.link
                        });
                    })
                })

        })
    }

    /**
     * Get memes from the datastore
     */
    public async get() : Promise<Array<IMeme>> {

        let memesData = await this._firestore.collection('memes').get();
        let memes: Array<IMeme> = [];
        
        memesData.forEach((data: any) => {
            let docData = data.data();
            const meme: IMeme = new Meme(docData.imageSrc, docData.link, docData.title);
            memes.push(meme)
        });
        
        return memes;
    }
      
}
 
export default new FirebaseDataStore(admin.firestore());