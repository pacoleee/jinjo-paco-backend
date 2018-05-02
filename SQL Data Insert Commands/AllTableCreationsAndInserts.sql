CREATE TABLE Room
	(roomID			int auto_increment,
	 instructorID	varchar(100),
	 roomName		varchar(100),
	 PRIMARY KEY (roomID),
	 FOREIGN KEY(instructorID) REFERENCES Instructor(instructorID),
	 ON UPDATE CASCADE);

alter table room auto_increment = 1000;

CREATE TABLE Instructor
	(instructorID	int auto_increment,
	 email			varchar(100),
	 password		varchar(100),
	 PRIMARY KEY (instructorID),
	 UNIQUE (email));

alter table instructor auto_increment = 100000;

CREATE TABLE Question
	(questionID		int auto_increment,
	 question 		varchar(65535),
	 upvotes		int,
	 roomID			varchar(100),
	 isAnswered		boolean,
	 PRIMARY KEY (questionID), 
	 FOREIGN KEY REFERENCES Room (roomID),
	 ON UPDATE CASCADE,
	 ON DELETE CASCADE);

alter table question auto_increment = 1000;