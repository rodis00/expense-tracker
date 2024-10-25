create table admin.user_role
(
    user_id bigint not null,
    role_id bigint not null,
    primary key (user_id, role_id),
    foreign key (user_id) references admin.user (id),
    foreign key (role_id) references admin.role (id)
);
