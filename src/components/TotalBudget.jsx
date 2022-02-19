import React from 'react';
import BudgetCard from './BudgetCard';
import { auth } from '../firebase';
import { useBudgetsCollection, filterBudgets } from '../hooks/useBudgets';
import useBudgetsDocument from '../hooks/useBudgetsDocument';

function calculateTotal(budgets){

  if(!budgets) return 0;

  let totalMax = 0;
  let totalCurrent = 0;
  budgets.forEach(doc => {
    const { current, max } = doc.data();

    totalMax += max;
    totalCurrent += current;
  })

  return { totalMax, totalCurrent };
}

export default function TotalBudget() {
 
  const { uid } = auth.currentUser;

  const [budgets] = useBudgetsCollection(uid);
  const { totalMax, totalCurrent } = calculateTotal(filterBudgets(budgets));

  return <BudgetCard
            passive
            passiveControls
            passiveCaption={"Total Expenses"}
            budgetName={"Total Budget"}
            current={totalCurrent}
            max={totalMax}
          />;

}
