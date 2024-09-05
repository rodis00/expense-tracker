create table admin.user
(
    id       bigint primary key,
    username varchar unique,
    email    varchar unique,
    password varchar,
    role     varchar
);