import React from 'react'

import BudgetCard from './BudgetCard'
import LoadingPage from '../pages/LoadingPage';
import { useBudgetsCollection, filterBudgets } from '../hooks/useBudgets'
import TotalBudget from './TotalBudget';

import '../styles/Budgets.css';

import { auth } from '../firebase'
import { Alert } from 'react-bootstrap';
import UncategorizedBudget from './UncategorizedBudget';





export default function Budgets(props) {

  const [budgets, loading, error] = useBudgetsCollection(auth.currentUser.uid);

  if(error) return <Alert variant='danger'>{error}</Alert>
  if(loading) return <LoadingPage />
  return (
    <section className="d-flex flex-column flex-md-row gap-4 flex-wrap justify-content-start" {...props}>
      <TotalBudget />
      {
        budgets?.docs?.map((doc) => {
            const { 
              name, 
              current, 
              max, 
              lastExpendDate,
              description } = doc.data();

            return (
              <BudgetCard 
                key={doc.id} 
                budgetName={name} 
                current={current}
                max={max}
                lastExpendDate={lastExpendDate}
                description={description}
                docId={doc.id}
              />
            )
          })
      }
    </section>
  )
}
