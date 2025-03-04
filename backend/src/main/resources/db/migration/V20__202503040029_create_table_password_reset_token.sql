create table expense_tracker.password_reset_token
(
    id bigint primary key,
    token       varchar,
    expiry_date timestamp,
    created_at timestamp,
    updated_at timestamp,
    user_id     bigint not null,
    foreign key (user_id) references admin.user (id)
);