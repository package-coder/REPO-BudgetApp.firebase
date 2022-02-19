import React from 'react';
import BudgetCard from './BudgetCard';
import { auth } from '../firebase';
import useBudgetsDocument from '../hooks/useBudgetsDocument';


export default function UncategorizedBudget() {

  const docId = "UNCATEGORIZED_BUDGET";    
  const [value] = useBudgetsDocument(auth.currentUser.uid, docId);

  const data = value && value.data();
  if(!data) return null;

  const { name, current, max } = data;

  return <BudgetCard
            passive
            passiveControls
            passiveCaption={"Total"}
            budgetName={name}
            current={current}
            max={max}
            docId={docId}
          />;
}
