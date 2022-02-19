import { db } from '../firebase'
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from "react-firebase-hooks/firestore"


export function useBudgetsCollection(uid){

    const [value, loading, error] = useCollection(
        collection(db, "users", uid, "cards"),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );

      


    return [value, loading, error]
}

export function filterBudgets(budgets){
  if(!budgets) return;
  return budgets.docs.filter(doc => !doc.data().passive)
}
