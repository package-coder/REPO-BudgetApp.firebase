import { db } from '../firebase'
import { doc } from "firebase/firestore"; 
import { useDocument } from "react-firebase-hooks/firestore"


function useBudgetsDocument(uid, docId) {
  return useDocument(
        doc(db, "users", uid, "cards", docId),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );
}

export default useBudgetsDocument;

