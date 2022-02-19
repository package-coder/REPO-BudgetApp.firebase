
import { db } from '../firebase';
import { doc } from "firebase/firestore"; 
import { useDocument } from "react-firebase-hooks/firestore"


function useUserDocument(uid) {
    const [value, loading, error] = useDocument(
        doc(db, "users", uid),
        {
            napshotListenOptions: { includeMetadataChanges: true },
        });

  return [value, loading, error]
}

export default useUserDocument;
