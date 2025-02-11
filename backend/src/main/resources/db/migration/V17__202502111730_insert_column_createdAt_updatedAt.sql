alter table expense_tracker.expense
    add column created_at timestamp,
    add column updated_at timestamp;

alter table expense_tracker.income
    add column created_at timestamp,
    add column updated_at timestamp;

alter table admin.role
    add column created_at timestamp,
    add column updated_at timestamp;

alter table admin.user
    add column created_at timestamp,
    add column updated_at timestamp;

alter table admin.token
    add column created_at timestamp,
    add column updated_at timestamp;