import { db } from '../firebase'
import { collection } from 'firebase/firestore';
import { useCollection } from "react-firebase-hooks/firestore"


export default function useBudgets(uid){

    const [value, loading, error] = useCollection(
        collection(db, "users", uid, "budgets"),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );

      


    return {value, loading, error}
}

