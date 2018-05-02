CREATE TABLE Instructor
	(instructorID	int auto_increment,
	 email			varchar(100),
	 password		varchar(100),
	 PRIMARY KEY (instructorID),
	 UNIQUE (email));

alter table instructor auto_increment = 100000;