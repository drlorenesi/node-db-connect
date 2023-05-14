/* 
Add comments here:
- add '?multipleStatements=true&connectionLimit=10' to .env connection string
- Check open connections on server
- SHOW VARIABLES LIKE 'max_connections';
- SHOW STATUS WHERE `variable_name` = 'Threads_connected';
*/

DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	apellido VARCHAR(255),
	email VARCHAR(255) NOT NULL UNIQUE,
	pass VARCHAR(255),
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
	users (nombre, apellido, email, pass)
VALUES
	('John', 'Test', 'john@gmail.com', '$2a$10$92JRaWY1hGS61lrvBBCB6uKTlm8Ian98QBSbJIEPR0J6clLrCTX2i'),
	('Jane', 'Test', 'jane@gmail.com', 'abc123'),
	('Joe', 'Test', 'joe@gmail.com', 'password');

CREATE TABLE IF NOT EXISTS posts (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255),
	body TEXT,
	user_id INT,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO 
	posts (title, body, user_id)
VALUES
	('JavaScript 😀', 'My favorite programming language.', 1),
	('Python', 'Meh, I guess its alright.', 2),
	('Java', 'Dude...', 2),
	('JavaScript Performance Tips','We will look at 10 simple tips and tricks to increase the speed of your code when writing JS', 3),
	('Tailwind vs. Bootstrap','Both Tailwind and Bootstrap are very popular CSS frameworks. In this article, we will compare them', 1),
	('Writing Great Unit Tests','We will look at 10 simple tips and tricks on writing unit tests in JavaScript', 3),
	('What Is New In PHP 8?','In this article we will look at some of the new features offered in version 8 of PHP`', 2);