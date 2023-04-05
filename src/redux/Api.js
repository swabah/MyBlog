import { collection, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../Firebase/firbase-config'
import { setData, setLoading } from './store'

function getDataInfo() {
    return function (dispatch) {
        dispatch(setLoading(true))
        // async function getPosts() {
    
        //     try {
        //         const postsCollectionRef = collection(db, 'posts')
        //         const post = await getDocs(postsCollectionRef)
        //         const posts = post.docs.map((doc) => (
        //             { ...doc.data(), id: doc.id }
        //         ))
        //         dispatch(setData([posts]))
        //         dispatch(setLoading(false))
        //     } catch (error) {
        //         console.error('An error occured', error)
        //         dispatch(setLoading(false))
        //     }
    
        // }
        async function getPost(){
            try {
             const postsCollectionRef = collection(db, 'posts')
              const post = await getDocs(postsCollectionRef);
              const posts = post.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
              dispatch(setData(posts));
              dispatch(setLoading(false));
            } catch (error) {
              console.error('An error occurred', error);
              dispatch(setLoading(false));
            }
          };
        getPost()
}
}

export default getDataInfo