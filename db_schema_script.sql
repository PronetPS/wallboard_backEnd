Create database	BAFL_IN_WB

USE BAFL_IN_WB

CREATE TABLE wb_user(
    user_id varchar(255) NOT NULL PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255),
    role_type int,
	user_password varchar(255),
	create_date varchar(255),
	user_email varchar(255)
);

ALTER TABLE wb_user
ADD user_email varchar(255);

select * from wb_user

INSERT INTO wb_user
VALUES ('wb_user_004', 'Maaz', 'Ahmed',2,'maaz12','01-11-2021','maaz@gmail.com');



DELETE FROM wb_user WHERE user_id = 'f6a0423d-a588-8885-a416-760e37d046c2';

DROP TABLE wb_user;

select * FROM wb_user WHERE first_name = 'Maaz' and user_password = 'maaz12';



UPDATE wb_user
SET user_id='wb_user_002', first_name='Meraj', last_name='Tariq', role_type=2, user_password='meraj123', create_date='01-11-2021'
WHERE user_id='wb_user_002';



UPDATE wb_user SET user_id='wb_user_002', first_name='Meraj', last_name='Tariq', role_type=2, user_password='meraj123', create_date='01-11-2021' WHERE user_id='wb_user_002';
