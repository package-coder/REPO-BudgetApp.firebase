import React from 'react';
import BudgetCard from './BudgetCard';

import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

import { doc } from "firebase/firestore"; 
import { useDocument } from "react-firebase-hooks/firestore"



export default function TotalBudget() {
    const { uid } = getAuth().currentUser;
    const [value] = useDocument(
        doc(db, "users", uid),
        {
            napshotListenOptions: { includeMetadataChanges: true },
        });
        
        

  return <BudgetCard
            passive
            passiveControls
            passiveCaption={"Current"}
            budgetName={"Total Budget"}
            current={200}
            max={value && value.data().totalBudgets}
            docId={123}
          />;

}
