alter table expense_tracker.income
    add column slug varchar unique;

alter table expense_tracker.expense
    add column slug varchar unique;
