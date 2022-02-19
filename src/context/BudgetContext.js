import { createContext } from 'react'
import { doc, deleteDoc, updateDoc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import useBudgetsDocument from '../hooks/useBudgetsDocument';


export const BudgetContext = createContext(null);

export function BudgetProvider({ children }) {
    const [user] = useAuthState(auth);
    const uid = user && user.uid;

    function deleteBudget(docId){
        const docRef = doc(db, "users", uid, "cards", docId)
        return deleteDoc(docRef);
    }
    
    function updateExpenses(docId, predicate, date){
        const docRef = doc(db, "users", uid, "cards", docId);

        getDoc(docRef)?.then(res => {
            return updateDoc(docRef, {
                "current": predicate(res.data().current),
                "lastExpendDate": date
            });

        })
    }

    function addBudget(data){
        return addDoc(collection(db, "users", uid, "cards"), data);
    }

  return (
    <BudgetContext.Provider
        value={
            {
                user,
                addBudget,
                deleteBudget,
                updateExpenses
            }
        }
    >
        {children}
    </BudgetContext.Provider>
  )
}
