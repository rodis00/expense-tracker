insert into admin.user_role(user_id, role_id)
VALUES ((select id from admin.user where username = 'admin'),
        (select id from admin.role where name = 'ADMIN'));
