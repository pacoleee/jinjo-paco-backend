CREATE TABLE Instructor
	(instructorID	int auto_increment,
	 email			varchar(100),
	 password		varchar(100),
	 PRIMARY KEY (instructorID),
	 UNIQUE (email));

alter table Instructor auto_increment = 100000;

CREATE TABLE Room
	(roomID			int auto_increment,
	 instructorID	    int,
	 roomName		varchar(100),
	 PRIMARY KEY (roomID),
	 FOREIGN KEY(instructorID) REFERENCES Instructor(instructorID)
	 ON UPDATE CASCADE);

alter table Room auto_increment = 1000;

CREATE TABLE Question
	(questionID		int auto_increment,
	 question 		varchar(65535),
	 upvotes		int,
	 roomID			int,
	 isAnswered		boolean,
	 PRIMARY KEY (questionID), 
	 FOREIGN KEY (roomID) REFERENCES Room(roomID)
	 ON UPDATE CASCADE
	 ON DELETE CASCADE);

alter table Question auto_increment = 1000;