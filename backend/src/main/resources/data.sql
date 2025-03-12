insert into expense_tracker.income
SELECT
    nextval('public.base_seq'),
    'Income ' || generate_series AS title,
    round((random() * 10000 + 50)::numeric, 2) AS amount,
    (current_date - interval '8 years') + (random() * interval '10 years') as date,
    (SELECT id FROM admin.user WHERE username = 'admin' LIMIT 1),
    'Description ' || generate_series AS description,
    gen_random_uuid()::TEXT AS slug,
    (ARRAY['SALARY', 'SELL', 'SOCIAL_MEDIA', 'BUSINESS', 'INVESTMENT', 'GIFTS', 'PENSION', 'OTHER'])[floor(random() * 8) + 1] AS category,
    (current_date - interval '8 years') + (random() * interval '10 years') as created_at,
    (current_date - interval '8 years') + (random() * interval '10 years') as updated_at
FROM generate_series(1, 150)
where not exists
          (select 1
           from expense_tracker.income
           where user_id = (select id
                            from admin.user
                            where username = 'admin'
                            limit 1));


insert into expense_tracker.expense
SELECT
    nextval('public.base_seq'),
    'Expense ' || generate_series AS title,
    round((random() * 10000 + 50)::numeric, 2) AS amount,
    (current_date - interval '8 years') + (random() * interval '10 years') as date,
    (SELECT id FROM admin.user WHERE username = 'admin' LIMIT 1),
    'Description ' || generate_series AS description,
    gen_random_uuid()::TEXT AS slug,
    (ARRAY['FOOD', 'HOUSE', 'TRANSPORT', 'HEALTH', 'EDUCATION', 'CLOTHES', 'TRAVEL', 'GIFTS', 'SUBSCRIPTION', 'OTHER'])[floor(random() * 10) + 1] AS category,
    (current_date - interval '8 years') + (random() * interval '10 years') as created_at,
    (current_date - interval '8 years') + (random() * interval '10 years') as updated_at
FROM generate_series(1, 150)
where not exists
          (select 1
           from expense_tracker.expense
           where user_id = (select id
                            from admin.user
                            where username = 'admin'
                            limit 1));

