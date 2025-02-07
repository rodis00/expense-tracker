create table admin.token
(
    id   bigint primary key,
    token varchar,
    token_type varchar,
    expired boolean,
    revoked boolean,
    user_id bigint not null,
    foreign key (user_id) references admin.user (id)
);
