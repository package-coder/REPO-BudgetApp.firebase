import React from 'react'

import BudgetCard from './BudgetCard'
import LoadingPage from '../pages/LoadingPage';
import useBudgets from '../hooks/useBudgets'
import TotalBudget from './TotalBudget';

import '../styles/Budgets.css';

import { auth } from '../firebase'
import { Alert } from 'react-bootstrap';





export default function Budgets(props) {

  const {value, loading, error} = useBudgets(auth.currentUser.uid);

  if(error) return <Alert variant='danger'>{error}</Alert>
    
  return (
    <section className="d-flex flex-column flex-md-row gap-4 flex-wrap justify-content-start" {...props}>
      <TotalBudget />
      {
        value && value.docs.length !== 0 ?
          value.docs.map((doc) => {
            
            const { 
              budgetName, 
              currentExpenses, 
              maxExpenses, 
              lastExpendDate } = doc.data();

            return (
              <BudgetCard 
                key={doc.id} 
                budgetName={budgetName} 
                current={currentExpenses} 
                max={maxExpenses}
                lastExpendDate={lastExpendDate}
                docId={doc.id}
              />
            )
          })
          : loading && <LoadingPage />
      }
    </section>
  )
}
