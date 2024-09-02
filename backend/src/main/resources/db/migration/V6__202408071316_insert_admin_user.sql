insert into admin.user(id,
                       username,
                       email,
                       password,
                       role)
VALUES (nextval('public.base_seq'),
        'admin',
        'admin@example.com',
        '$2a$10$Ls466FeAttUAOgMc63tI4ectqbmhdvjD/Hzzzv03k5I1CH.yeWH6q',
        'ADMIN');