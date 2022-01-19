import React from 'react'
import { Container, Button } from 'react-bootstrap'
import BudgetCard from './BudgetCard'

export default function Budgets() {
    return (
        <div>
            <Container className="home pt-5">
      <header className="mb-5 d-flex justify-content-between align-items-center">
        <h1 className='heading'>Budget App {' '} </h1>
        <Button className='round-btn'>Add Budget</Button>
      </header>
      <div className="d-grid gap-3">
        <BudgetCard name="Tuition" current={100} max={300} lastExpendDate={"Jan 1, 2022"} />
        <BudgetCard name="Budget Card Card Card" current={100} max={300} lastExpendDate={"Jan 1, 2022"} />
        <BudgetCard name="Budget Card" current={100} max={300} lastExpendDate={"Jan 1, 2022"} />
        <BudgetCard name="Budget Card" current={100} max={300} lastExpendDate={"Jan 1, 2022"} />
        <BudgetCard name="Budget Card" current={100} max={300} lastExpendDate={"Jan 1, 2022"} />
        <BudgetCard name="Budget Card" current={100} max={300} lastExpendDate={"Jan 1, 2022"} />
        <BudgetCard name="Budget Card" current={100} max={300} lastExpendDate={"Jan 1, 2022"} />
        <BudgetCard name="Budget Card" current={100} max={300} lastExpendDate={"Jan 1, 2022"} />
      </div>
    </Container>
        </div>
    )
}
