
--drop database if exists fnestDb;

--create database fnestDb;

CREATE TABLE users(
	user_id serial UNIQUE NOT NULL PRIMARY KEY,
	name VARCHAR (355) UNIQUE NOT NULL,
	created_at TIMESTAMP DEFAULT now()
);

-- Criteria_id use the router acl theory. Free between numbers to add more criterias
CREATE TABLE criteria(
	criteria_id INTEGER UNIQUE NOT NULL PRIMARY KEY,
	name VARCHAR (355) UNIQUE NOT NULL,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE companies(
	company_id serial UNIQUE NOT NULL PRIMARY KEY,
	name VARCHAR (355) UNIQUE NOT NULL,
	webpage VARCHAR(355) UNIQUE NOT NULL,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE user_criteria(
	user_id INTEGER NOT NULL,
	criteria_id INTEGER NOT NULL,
	interest INTEGER NOT NULL,
	created_at TIMESTAMP DEFAULT now(),
	CONSTRAINT user_criteria_user_id_fkey FOREIGN KEY(user_id)
		REFERENCES users (user_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT user_criteria_criteria_id_fkey FOREIGN KEY (criteria_id)
		REFERENCES criteria (criteria_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION

);


CREATE TABLE reasons (
    reason_id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    name VARCHAR(355) NOT NULL UNIQUE
);

CREATE TABLE user_companies(
	user_id INTEGER NOT NULL,
	company_id INTEGER NOT NULL,
	user_action BOOLEAN NULL,
    reason_id INTEGER NULL,
	created_at TIMESTAMP DEFAULT now(),
	CONSTRAINT user_companies_user_id_fkey FOREIGN KEY(user_id)
		REFERENCES users (user_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT user_companies_company_id_fkey FOREIGN KEY (company_id)
		REFERENCES companies (company_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT user_companies_reason_id_fkey FOREIGN KEY (reason_id)
		REFERENCES reasons (reason_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE company_criteria(
	company_id INTEGER NOT NULL,
	criteria_id INTEGER NOT NULL,
	satisfy BOOLEAN NULL,
	created_at TIMESTAMP DEFAULT now(),
	CONSTRAINT company_criteria_criteria_id_fkey FOREIGN KEY(criteria_id)
		REFERENCES criteria(criteria_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT company_criteria_company_id_fkey FOREIGN KEY (company_id)
		REFERENCES companies (company_id) MATCH SIMPLE
		ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- VIEWS
CREATE VIEW user_criteria_view AS
	SELECT u.user_id,u.name as username,cr.criteria_id,cr.name as criteria_name,
		CASE
			WHEN uc.interest = 1 THEN 'Must have'
			WHEN uc.interest = 2 THEN 'Super nice to have'
			WHEN uc.interest = 3 THEN 'Nice to have'
		END as interest
	FROM user_criteria uc
		INNER JOIN users u USING (user_id)
		INNER JOIN criteria cr USING (criteria_id);


CREATE VIEW user_companies_view AS
	SELECT u.user_id,u.name as username,cp.company_id,cp.name as company_name,r.name as reason,
		CASE
			WHEN uc.user_action = true THEN 'meet'
			WHEN uc.user_action is null THEN '?'
			WHEN uc.user_action = false THEN 'pass'
		END as action
	FROM user_companies uc
		LEFT JOIN users u USING (user_id)
		LEFT JOIN companies cp USING (company_id)
		LEFT JOIN reasons r USING (reason_id);

CREATE VIEW company_criteria_view AS
	SELECT cc.company_id,cp.name as company_name,cr.criteria_id,cr.name as criteria_name,
		CASE
			WHEN cc.satisfy = true THEN 'Y'
			WHEN cc.satisfy is null THEN '?'
			WHEN cc.satisfy = false THEN 'N'
		END as satisfy
	FROM company_criteria cc
		LEFT JOIN companies cp USING (company_id)
		LEFT JOIN criteria cr USING (criteria_id);

CREATE VIEW user_company_criteria_view AS
	SELECT user_companies.user_id, user_companies.username as username,cp.name as company_name,cr.criteria_id,cr.name as criteria_name,
		CASE
			WHEN cc.satisfy = true THEN 'Y'
			WHEN cc.satisfy is null THEN '?'
			WHEN cc.satisfy = false THEN 'N'
		END as satisfy
	FROM company_criteria cc
		LEFT JOIN ( SELECT
				   		uc.user_id,
				   		uc.username,
				   		uc.company_id as cid,
				   		uc.action,
				   		uc.reason
				   		FROM user_companies_view uc
				   		GROUP BY uc.company_id, uc.user_id,uc.username,
				   		uc.company_id,
				   		uc.action,
				   		uc.reason
		) user_companies
		on user_companies.cid = cc.company_id
		LEFT JOIN companies cp USING (company_id)
		LEFT JOIN criteria cr USING (criteria_id);


INSERT INTO criteria (criteria_id, name)
VALUES
	(1000, 'CEO full-time'),
	(1500, 'CTO full-time'),
	(2000, '$1M <= Round < $10M'),
	(2100, '$10M <= Round < $100M');

INSERT INTO companies (name, webpage)
VALUES
	('Zangoose', 'Zangoose.com'),
	('Kabutops', 'Kabutops.com'),
	('Maractus', 'Maractus.com'),
	('Aggron', 'Aggron.com');

INSERT INTO users (name)
VALUES
	('Rambo'),
	('Tony Stark'),
	('Mr. Fantastic'),
	('Bruce Wayne');

INSERT INTO reasons (name)
VALUES
	('I see them as a potential investment'),
	('I want to build a relationship with them'),
	('I want to learn about the industry'),
	('It just came through a trusted referral'),
	('Receive updates'),
	('Refer to another investor'),
	('Fully disregard');


-- Interest are 1 = must haves; 2 = Super Nice; 3 = Nice
INSERT INTO user_criteria (user_id,criteria_id,interest)
VALUES
	(1,1000,1),
	(1,2000,2),
	(2,1500,3),
	(2,2100,2),
	(3,1000,2),
	(3,2000,3),
	(4,1500,1),
	(4,2100,3);

-- User_action are true = meet; false= pass; null=??

INSERT INTO user_companies (user_id,company_id,user_action, reason_id)
VALUES
	(1,1,true,1),
	(1,2,false,5),
	(1,3,null, null),
	(1,4,true,2),
	(2,1,false,6),
	(2,2,null, null),
	(2,3,true,3),
	(2,4,true,4),
	(3,1,false,7),
	(3,2,false,6),
	(3,3,null, null),
	(3,4,null, null),
	(4,1,false,5),
	(4,2,true,3),
	(4,3,true,4),
	(4,4,false,6);

INSERT INTO company_criteria (criteria_id,company_id,satisfy)
VALUES
	(1000,1,true),
	(1500,1,false),
	(2000,1,null),
	(1500,2,false),
	(2100,2,true),
	(1000,3,true),
	(2100,3,false),
	(1500,4,null),
	(2000,4,false);