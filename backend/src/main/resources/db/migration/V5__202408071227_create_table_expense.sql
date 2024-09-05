create table expense_tracker.expense
(
    id      bigint primary key,
    title   varchar,
    price   decimal(10, 2),
    date    timestamp,
    user_id bigint not null,
    foreign key (user_id) references admin.user (id)
);